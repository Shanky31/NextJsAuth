import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendMail = async ({ email, emailType, userID }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userID.toString(), 10);
    console.log("here111");
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        $set: {
          verfiyToken: hashedToken,
          verfiyTokenExpiryDate: Date.now() + 3600000,
          //6 hrs token validity
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiryDate: Date.now() + 600000,
          //6 hrs token validity
        },
      });
    }
    console.log("here112");
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e65e230d2581ee", //X
        pass: "c9cb5ffc75be34", //X
      },
    });
    console.log("here113");
    const htmlTemplate =
      emailType.toLowerCase() === "verify"
        ? `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to Verify Your Email</p>`
        : `<p>Click <a href='${process.env.DOMAIN}/resetpassword?token=${hashedToken}'>here</a> to Reset Your Password</p>`;

    const mailOptions = {
      from: "shashank@shashank.ai",
      to: email,
      subject:
        emailType.toLowerCase() === "verify"
          ? "Verify Your Email"
          : "Reset Your Password",
      text: "Hello world?", // plain‑text body
      html: htmlTemplate,
    };
    console.log("here114", mailOptions);
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("here115");
    return mailResponse;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
