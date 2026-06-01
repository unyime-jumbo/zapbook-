const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendBookingConfirmation = async (customerEmail, customerName, businessName, serviceName, date, time) => {
  try {
    await transporter.sendMail({
      from: `"ZapBook" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Booking Confirmed — ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F0F0F; color: #ffffff; padding: 40px; border-radius: 16px;">
          <h1 style="color: #7C3AED;">ZapBook</h1>
          <h2>Your booking is confirmed! ✅</h2>
          <p>Hi <strong>${customerName}</strong>,</p>
          <p>Your appointment has been successfully booked.</p>
          <div style="background: #1a1a1a; border: 1px solid #7C3AED; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p><strong>Business:</strong> ${businessName}</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
          </div>
          <p style="color: #gray;">If you need to cancel or reschedule please contact the business directly.</p>
          <p style="color: #10B981;">Thank you for using ZapBook! 🚀</p>
        </div>
      `
    });
    console.log("Booking confirmation email sent!");
  } catch (err) {
    console.log("Email error:", err.message);
  }
};

const sendBusinessNotification = async (businessEmail, businessName, customerName, serviceName, date, time) => {
  try {
    await transporter.sendMail({
      from: `"ZapBook" <${process.env.EMAIL_USER}>`,
      to: businessEmail,
      subject: `New Booking — ${customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F0F0F; color: #ffffff; padding: 40px; border-radius: 16px;">
          <h1 style="color: #7C3AED;">ZapBook</h1>
          <h2>You have a new booking! 🎉</h2>
          <p>Hi <strong>${businessName}</strong>,</p>
          <p>A new appointment has been booked.</p>
          <div style="background: #1a1a1a; border: 1px solid #10B981; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p><strong>Customer:</strong> ${customerName}</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
          </div>
          <p style="color: #10B981;">Login to your ZapBook dashboard to manage this booking. 🚀</p>
        </div>
      `
    });
    console.log("Business notification email sent!");
  } catch (err) {
    console.log("Email error:", err.message);
  }
};

module.exports = { sendBookingConfirmation, sendBusinessNotification };