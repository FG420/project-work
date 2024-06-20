import nodemailer from 'nodemailer';


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


export const signupConfirm = async (email: string, id: string, mode: string) => {
  try {
    
    const responseMail = {
      from: process.env.PROJECT_GMAIL_EMAIL,
      to: email,
      subject: 'Verify the Registration',
      // html: `<h1>Click the link to be verify</h1>`,
      html: `<p>Click <a href="${process.env.DOMAIN}/verify-email/${id}">here</a> to verify the registration of the account
                or copy and paste the following link. <br> ${process.env.DOMAIN}/verify-email/${id}</p>`,
    };

    const mailRes = await transport.sendMail(responseMail);
    return mailRes;

  } catch (error: any) {
    throw new Error(error.message);
  }
};
