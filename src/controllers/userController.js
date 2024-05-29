import userService from '../services/userService'

let handleLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                errCode: 1,
                message: "Missing required parameter"
            })
        }
        let userData = await userService.handleUserLogin(email, password)
        if (userData && userData.token) {
            res.cookie("token", userData.token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
            return res.status(200).json({
                errCode: 0,
                errMessage: 'Ok',
                data: userData
            })
        }
        return res.status(200).json({
            data: userData
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const handleGetAllUsers = async (req, res) => {
    try {
        let id = req.query.id; // ALL, id
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters',
                users: []
            })
        }

        let users = await userService.getAllUsers(id)
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Ok',
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleCreateNewUser = async (req, res) => {
    try {
        let message = await userService.createNewUser(req.body);
        return res.status(200).json(message)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleEditUser = async (req, res) => {
    try {
        let data = req.body;
        let message = await userService.updateUserData(data);
        return res.status(200).json(message)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let handleDeleteUser = async (req, res) => {
    try {
        if (!req.body.id) {
            return res.status(200).json({
                errCode: 1,
                errMessage: 'Missing required parameters'
            })
        }
        let message = await userService.deleteUser(req.body.id);
        return res.status(200).json(message)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const handleLogout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Ok'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

const getUserAccount = (req, res) => {
    try {
        return res.status(200).json({
            errMessage: 'Ok',
            errCode: 0,
            data: {
                access_token: req.token,
                user: req.user,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

const handleRegister = async (req, res) => {
    try {
        let data = await userService.register(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const handleChangePassword = async (req, res) => {
    try {
        let data = await userService.changePassword(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

const getHistories = async (req, res) => {
    try {
        let data = await userService.getHistoriesById(req.body.patientId);
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
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode,
    getUserAccount,
    handleLogout,
    handleRegister,
    handleChangePassword,
    getHistories
}