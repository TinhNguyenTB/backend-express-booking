import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import db from "../models/index"


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBrcypt = await hashUserPassword(data.password);
            // insert into user
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBrcypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('create a new user succeed!')
        } catch (error) {
            reject(error)
        }
    })


}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser
}