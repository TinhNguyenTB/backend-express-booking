import db from "../models/index"
import emailService from '../services/emailService';
require('dotenv').config();
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}

const postBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType || !data.fullName
                || !data.selectedGender || !data.address || !data.phoneNumber
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                });

                let [patient, created] = await db.Patient.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        fullName: data.fullName,
                        address: data.address,
                        phonenumber: data.phoneNumber,
                        gender: data.selectedGender
                    }
                })
                // create a booking record
                if (patient) {
                    await db.Booking.findOrCreate({
                        where: { patientId: patient.id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: patient.id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: "Save info patient succcessfully!"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const postVerifyBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save();

                    resolve({
                        errCode: 0,
                        errMessage: "Update the appointment succcessfully!"
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist!"
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    postBookingAppointment,
    postVerifyBookingAppointment
}