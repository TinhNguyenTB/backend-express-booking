require('dotenv').config();
import nodemailer from "nodemailer";



const sendSimpleEmail = async (dataSend) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false // Bỏ qua kiểm tra chứng chỉ
        }

    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: '"Booking care 👻" <tinh271103@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
}

const sendAttachments = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false // Bỏ qua kiểm tra chứng chỉ
        }

    });

    // send mail with defined transport object
    await transporter.sendMail({
        from: '"Booking care 👻" <tinh271103@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    });
}

const getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên http://localhost:3000/ thành công.</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>
        <div>
            Xin chân thành cảm ơn!
        </div>
        `
    }
    else if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on http://localhost:3000/ successfully.</p>
        <p>Prescription/invoice information is sent in the attached file.</p>
        <div>
            Thank you!
        </div>
        `
    }
    return result;
}

const getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên http://localhost:3000/</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div>
            <b>Thời gian: ${dataSend.time}</b>
        </div>
        <div>
            <b>Bác sĩ: ${dataSend.doctorName}</b>
        </div>
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới
        để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>
            Xin chân thành cảm ơn!
        </div>
        `
    }
    else if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on http://localhost:3000/</p>
        <p>Information on scheduling medical examinations:</p>
        <div>
            <b>Time: ${dataSend.time}</b>
        </div>
        <div>
            <b>Doctor: ${dataSend.doctorName}</b>
        </div>
        <p>If the above information is true, please click on the link below to confirm 
        and complete the medical appointment booking procedure.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>
            Thank you!
        </div>
        `
    }
    return result;
}

module.exports = {
    sendSimpleEmail, sendAttachments
}