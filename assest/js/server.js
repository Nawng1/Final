const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Thiết lập transporter cho Nodemailer
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "nang20012004@gmail.com", // Thay bằng email của bạn
        pass: "0377172410Abc",  // Thay bằng mật khẩu của bạn
    },
});

app.post("/send-email", (req, res) => {
    const { user_name, user_email, user_message } = req.body;

    // Gửi email cảm ơn
    const thankYouMailOptions = {
        from: "nang20012004@gmail.com",
        to: user_email,
        subject: "Cảm ơn bạn đã liên hệ!",
        text: `Chào ${user_name},\n\nCảm ơn bạn đã gửi tin nhắn. Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể!\n\nTrân trọng,\nĐội ngũ hỗ trợ`,
    };

    transporter.sendMail(thankYouMailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: "Đã xảy ra lỗi khi gửi email cảm ơn." });
        }
        res.status(200).json({ message: "Email cảm ơn đã được gửi!" });
    });
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
