import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


const transport = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: process.env.PROJECT_GMAIL_EMAIL,
    pass: process.env.PROJECT_GMAIL_PASSWORD,
  },
});


export const forgotPass = async (email: string, password: string, mode: string) => {
  try {
    
    const responseMail = {
      from: process.env.PROJECT_GMAIL_EMAIL,
      to: email,
      subject: 'Generic Password Generated',
      html: `<h1>Password Generated successfully!</h1><br/><p>Your new password is ${password} </p>`,
    };

    const mailRes = await transport.sendMail(responseMail);
    return mailRes;

  } catch (error: any) {
    throw new Error(error.message);
  }
};


export const signupConfirm = async (email: string, mode: string) => {
  try {
    
    const responseMail = {
      from: process.env.PROJECT_GMAIL_EMAIL,
      to: email,
      subject: 'Registration Confirmed',
      html: `<h1>User Successfully Registred</h1>`,
    };

    const mailRes = await transport.sendMail(responseMail);
    return mailRes;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
