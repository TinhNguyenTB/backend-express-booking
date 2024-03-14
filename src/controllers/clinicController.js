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

module.exports = {
    createClinic
}