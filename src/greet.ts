import { createTransport } from 'nodemailer'

export const greet = (userInfo: { email: string; name?: string }) => {
    const { email, name } = userInfo
    // Generate test account

    // create reusable transporter object using the default SMTP transport
    let transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'test@gmail.com',
            pass: 'password'
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
            console.log('Message sent')
        }
    })
}
