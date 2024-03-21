import express from "express";
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import specialtyController from '../controllers/specialtyController';
import clinicController from '../controllers/clinicController';

let router = express.Router();

let initApiRoutes = (app) => {

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/get-all-doctors', doctorController.getAllDoctor)
    router.post('/api/save-infor-doctors', doctorController.postInforDoctor)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
    router.post('/api/send-remedy', doctorController.sendRemedy)

    router.post('/api/create-new-specialty', specialtyController.createSpecialty)

    router.post('/api/create-new-clinic', clinicController.createClinic)

    return app.use("/", router);
}

module.exports = initApiRoutes;