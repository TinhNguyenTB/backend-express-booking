import clinicService from '../services/clinicService';

const createClinic = async (req, res) => {
    try {
        let info = await clinicService.createClinic(req.body);
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error createClinic from server'
        })
    }
}

const getAllClinic = async (req, res) => {
    try {
        let info = await clinicService.getAllClinic();
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getAllClinic from server'
        })
    }
}

const getDetailClinicById = async (req, res) => {
    try {
        let info = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error getDetailClinicById from server'
        })
    }
}

const deleteClinic = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let message = await clinicService.deleteClinic(req.body.id);
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createClinic, getAllClinic, getDetailClinicById,
    deleteClinic
}