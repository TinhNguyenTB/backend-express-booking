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
            // create a booking record
            let token = uuidv4();
            if (data) {
                let [appointment, created] = await db.Booking.findOrCreate({
                    where: { patientId: data.patientId },
                    defaults: {
                        statusId: 'S1',
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        date: data.date,
                        timeType: data.timeType,
                        token: token,
                        reason: data.reason
                    }
                })
                if (created) {
                    await emailService.sendSimpleEmail({
                        receiverEmail: data.email,
                        patientFirstName: data.firstName,
                        patientLastName: data.lastName,
                        time: data.timeString,
                        doctorName: data.doctorName,
                        reason: data.reason,
                        language: data.language,
                        redirectLink: buildUrlEmail(data.doctorId, token)
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "Create booking appointment succcessfully!"
                    })
                }
            }
            resolve({
                errCode: 2,
                errMessage: "Not found patient!"
            })

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