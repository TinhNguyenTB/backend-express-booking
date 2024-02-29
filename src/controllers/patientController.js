import patientService from '../services/patientService';

const postBookingAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookingAppointment(req.body);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error postBookingAppointment from server'
        })
    }
}

const postVerifyBookingAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookingAppointment(req.body);
        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error postBookingAppointment from server'
        })
    }
}

module.exports = {
    postBookingAppointment,
    postVerifyBookingAppointment
}