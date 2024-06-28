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

const getHistories = async (req, res) => {
    try {
        let data = await patientService.getHistoriesById(req.body.patientId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const getAppointment = async (req, res) => {
    try {
        let data = await patientService.getAppointmentById(req.query.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const getAllHistories = async (req, res) => {
    try {
        let data = await patientService.getAllHistories();
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const deleteAppointment = async (req, res) => {
    try {
        let data = await patientService.deleteAppointmentById(req.body.id);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    postBookingAppointment,
    postVerifyBookingAppointment,
    getHistories,
    getAppointment,
    deleteAppointment,
    getAllHistories
}