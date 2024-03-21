import userService from '../services/userService'

let handleLogin = async (req, res) => {
    let { email, password } = req.body;
    // check email exist
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing required parameter"
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    if (userData && userData.token) {
        res.cookie("token", userData.token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
    }

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData ? userData : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; // ALL, id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }

    let users = await userService.getAllUsers(id)
    //console.log(users)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    //console.log(message)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)
    } catch (error) {
        console.log('Get allcode error:', error)
        return res.status(200).json({
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
    getAllCode
}