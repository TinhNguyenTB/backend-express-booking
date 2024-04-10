import db from "../models/index";

const createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.imageBase64 || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionMarkdown: data.descriptionMarkdown,
                    descriptionHTML: data.descriptionHTML
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

const getAllClinic = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                data
            })

        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

const getDetailClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                let data = await db.Clinic.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML', 'name', 'address'],
                    include: [
                        { model: db.Doctor_Infor, attributes: ['doctorId'] },
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                })
            }
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

const deleteClinic = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: id }
            })
            if (!clinic) {
                resolve({
                    errCode: 2,
                    errMessage: `Clinic does not exist`
                })
            }
            await db.Clinic.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                message: `Clinic has been deleted`
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createClinic, getAllClinic, getDetailClinicById,
    deleteClinic
}