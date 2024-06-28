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

const getHistoriesById = (patientId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!patientId) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            else {
                let appointments = await db.History.findAll({
                    where: { patientId: patientId },
                    include: [
                        { model: db.User, as: 'appointmentData', attributes: ['firstName', 'lastName', 'email'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (appointments && appointments.length > 0) {
                    appointments.map(item => {
                        item.files = Buffer.from(item.files, 'base64').toString('binary');
                        return item;
                    })
                }
                resolve({
                    errCode: 0,
                    data: appointments
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getAllHistories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let histories = await db.History.findAll({
                include: [
                    { model: db.User, as: 'appointmentData', attributes: ['firstName', 'lastName', 'email'] },
                ],
                raw: false,
                nest: true
            })
            if (histories && histories.length > 0) {
                histories.map(item => {
                    item.files = Buffer.from(item.files, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                data: histories
            })

        } catch (error) {
            reject(error)
        }
    })
}


const getAppointmentById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                let data = await db.Booking.findOne({
                    where: { patientId: id },
                    include: [
                        { model: db.User, as: 'doctorInfo', attributes: ['firstName', 'lastName', 'email'] },
                        { model: db.Allcode, as: 'statusData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi'] }
                    ],
                    raw: false,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteAppointmentById = (patientId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!patientId) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            else {
                await db.Booking.destroy({
                    where: { patientId: patientId }
                })
                resolve({
                    errCode: 0,
                    message: 'Delete appointment successfully!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    postBookingAppointment,
    postVerifyBookingAppointment,
    getHistoriesById,
    getAppointmentById,
    deleteAppointmentById,
    getAllHistories
}