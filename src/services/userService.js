import db from "../models/index"
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],  // just get email, roleId, password
                    raw: true
                })
                // user already exists
                if (user) {
                    //compare password with password in db
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Ok';
                        // console.log(user)
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3
                        userData.errMessage = 'Wrong password';
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }

            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your email does not exist in the system. Please try another email.`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({  // select * from user where email = userEmail
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,

}