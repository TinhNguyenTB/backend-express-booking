import db from "../models/index"
import emailService from '../services/emailService';

const postBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.date || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: 'Patient',
                    time: '8:00 - 9:00 Thứ 3 27/2/2024',
                    doctorName: 'Tran Duy Hung',
                    redirectLink: 'http://localhost:3000/'

                });

                let [user, created] = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })
                // create a booking record
                if (user) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user.id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user.id,
                            date: data.date,
                            timeType: data.timeType
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

module.exports = {
    postBookingAppointment
}