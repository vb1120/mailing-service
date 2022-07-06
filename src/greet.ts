import { createTransport, createTestAccount } from 'nodemailer'

export const greet = async (userInfo: { email: string; name?: string }) => {
    const { email, name } = userInfo
    // Generate test account
    const testAccount = await createTestAccount()

    // create reusable transporter object using the default SMTP transport
    let transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    // Define transport object
    const mailDetails = {
        from: 'test@example.com',
        to: email,
        subject: 'Welcome',
        text: `${name ? name : email} welcome to our note app`
    }

    // Send mail
    transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err.message)
        } else {
            console.log('Message sent: %s', data.messageId)
        }
    })
}
