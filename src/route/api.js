import express from "express";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';
import { checkUserJWT } from '../middleware/jwtActions';
import patientController from '../controllers/patientController';

let router = express.Router();

let initApiRoutes = (app) => {
    router.all("*", checkUserJWT)

    router.post('/api/login', userController.handleLogin);
    router.get('/api/account', userController.getUserAccount);
    router.post('/api/register', userController.handleRegister);
    router.post('/api/change-password', userController.handleChangePassword);
    router.post("/api/logout", userController.handleLogout);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.get("/api/get-user-by-id", userController.handleGetUserById);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/get-all-doctors', doctorController.getAllDoctor)
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
    router.post('/api/send-remedy', doctorController.sendRemedy)

    router.post('/api/create-new-specialty', specialtyController.createSpecialty)
    router.delete('/api/delete-specialty', specialtyController.deleteSpecialty);
    router.put('/api/edit-specialty', specialtyController.editSpecialty);

    router.post('/api/create-new-clinic', clinicController.createClinic)
    router.delete('/api/delete-clinic', clinicController.deleteClinic);
    router.put('/api/edit-clinic', clinicController.editClinic);

    router.post("/api/histories", patientController.getHistories);
    router.get("/api/histories-all", patientController.getAllHistories);
    router.get("/api/appointment", patientController.getAppointment);
    router.delete("/api/delete-appointment", patientController.deleteAppointment);

    return app.use("/", router);
}

module.exports = initApiRoutes;