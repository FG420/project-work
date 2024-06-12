import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, password: string) => {
  try {
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '07a125ec7e34ef',
        pass: '98aa20c967aed0',
      },
    });

    const mailOptions = {
      from: 'no-reply@email.com',
      to: email,
      subject: 'Generic Password Generated',
      html: `<h1>Password Generated successfully!</h1><br/><p>Your new password is ${password} </p>`,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
