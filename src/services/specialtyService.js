import db from "../models/index";

const createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                await db.Specialty.create({
                    name: data.name,
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
        }
    })
}

const getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
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
            reject(error)
        }

    })
}

const getDetailSpecialtyById = async (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            }
            else {
                let data = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: ['descriptionHTML'],
                })
                if (data) {
                    let doctorSpecialty = [];
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: id },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    else {
                        // find doctor by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: id, provinceId: location },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    data.doctorSpecialty = doctorSpecialty;
                }
                else {
                    data = {}
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Ok',
                    data
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteSpecialty = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Specialty.findOne({
                where: { id: id }
            })
            if (!clinic) {
                resolve({
                    errCode: 2,
                    errMessage: `Specialty does not exist`
                })
            }
            await db.Specialty.destroy({
                where: { id: id }
            })
            resolve({
                errCode: 0,
                message: `Specialty has been deleted`
            })
        } catch (error) {
            reject(error)
        }
    })
}

const editSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.name || !data.descriptionHTML || !data.descriptionMarkdown) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                })
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            })
            if (specialty) {
                specialty.name = data.name;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                if (data.image) {
                    specialty.image = data.image;
                }

                await specialty.save();
                resolve({
                    errCode: 0,
                    message: 'Update specialty succeefully!'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: 'Specialty not found!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createSpecialty, getAllSpecialty, getDetailSpecialtyById,
    deleteSpecialty, editSpecialty
}