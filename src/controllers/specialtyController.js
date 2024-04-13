import specialtyService from '../services/specialtyService';

const createSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error createSpecialty from server'
        })
    }
}

const getAllSpecialty = async (req, res) => {
    try {
        let info = await specialtyService.getAllSpecialty();
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error getAllSpecialty from server'
        })
    }
}

const getDetailSpecialtyById = async (req, res) => {
    try {
        let info = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(info)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error getDetailSpecialtyById from server'
        })
    }
}

const deleteSpecialty = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let message = await specialtyService.deleteSpecialty(req.body.id);
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let editSpecialty = async (req, res) => {
    try {
        let data = req.body;
        let message = await specialtyService.editSpecialty(data);
        return res.status(200).json(message)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createSpecialty, getAllSpecialty, getDetailSpecialtyById,
    deleteSpecialty, editSpecialty
}