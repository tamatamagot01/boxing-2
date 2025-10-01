'use server'
import nodemailer from 'nodemailer'

type BookignDetailType = {
    bookingID: string
    customer: { first_name: string; last_name: string }
    trainer: { first_name: string; last_name: string } | null
    classType: string
    date: string
    time: string
    participant: number
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'itsaree.n9@gmail.com',
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
})

export async function sendMail(bookingDetails: BookignDetailType) {
    try {
        const htmlContent = generateBookingConfirmationHtml(bookingDetails)

        const info = await transporter.sendMail({
            from: '"Boxing Club Team" <boxingclub@gmail.com>',
            to: 'itsaree.n9@gmail.com', // ควรเป็นอีเมลลูกค้า
            subject: `🥊 Booking Confirmed: ${bookingDetails.classType} Class (ID: ${bookingDetails.bookingID})`,
            html: htmlContent,
        })

        return info
    } catch (error) {
        console.error('Error sending email:', error)
        // อาจจะ throw error หรือ return false/null แทนการ return ว่างๆ
        return null
    }
}

function generateBookingConfirmationHtml(details: BookignDetailType): string {
    const customerName = `${details.customer.first_name} ${details.customer.last_name}`
    const trainerName = details.trainer
        ? `${details.trainer.first_name} ${details.trainer.last_name}`
        : 'N/A' // หรือข้อความอื่นที่เหมาะสมถ้าไม่มีเทรนเนอร์

    // กำหนดสีและรูปแบบหลัก
    const primaryColor = '#FF4500' // Orange-Red, สื่อถึง Boxing/Energy
    const secondaryColor = '#333333'
    const bgColor = '#f4f4f4'
    const font = 'Arial, sans-serif'

    // โครงสร้าง HTML Email (ใช้ตารางเป็นหลักเพื่อให้รองรับหลาย Email Client)
    return `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmed - Boxing Club Team</title>
    <style>
        /* Global Styles */
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
        
        /* Typography */
        h1, h2, h3, h4, p { margin: 0; padding: 0; }
        
        /* Utility Classes (In-line styles are preferred in body for max compatibility) */
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            color: #ffffff !important;
            background-color: ${primaryColor};
            border-radius: 5px;
            text-decoration: none;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${bgColor};">

<center>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 600px;">
        
        <tr>
            <td align="center" style="padding: 20px 0; background-color: ${primaryColor};">
                <h1 style="color: #ffffff; font-family: ${font}; font-size: 28px; font-weight: 700;">
                    BOXING CLUB TEAM 🥊
                </h1>
            </td>
        </tr>

        <tr>
            <td align="center" style="padding: 30px 20px 20px; background-color: #ffffff;">
                <h2 style="color: ${secondaryColor}; font-family: ${font}; font-size: 24px; margin-bottom: 20px;">
                    การจองของคุณได้รับการยืนยันแล้ว!
                </h2>
                <p style="color: ${secondaryColor}; font-family: ${font}; font-size: 16px; line-height: 1.5;">
                    สวัสดีคุณ ${details.customer.first_name},
                </p>
                <p style="color: ${secondaryColor}; font-family: ${font}; font-size: 16px; line-height: 1.5; margin-top: 15px;">
                    ขอบคุณที่จองคลาสกับเรา รายละเอียดการจองของคุณมีดังนี้:
                </p>
            </td>
        </tr>

        <tr>
            <td align="center" style="padding: 0 20px 30px; background-color: #ffffff;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 500px; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden;">
                    
                    <tr>
                        <td colspan="2" style="background-color: ${primaryColor}; padding: 10px 15px;">
                            <p style="color: #ffffff; font-family: ${font}; font-size: 16px; font-weight: bold;">
                                ID การจอง: ${details.bookingID}
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td width="30%" style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; font-weight: bold; border-bottom: 1px solid #eeeeee; background-color: #f9f9f9;">
                            ประเภทคลาส:
                        </td>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${primaryColor}; font-weight: bold; border-bottom: 1px solid #eeeeee; background-color: #f9f9f9;">
                            ${details.classType}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; font-weight: bold; border-bottom: 1px solid #eeeeee;">
                            วัน/เวลา:
                        </td>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; border-bottom: 1px solid #eeeeee;">
                            ${details.date} เวลา ${details.time}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; font-weight: bold; border-bottom: 1px solid #eeeeee;">
                            เทรนเนอร์:
                        </td>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; border-bottom: 1px solid #eeeeee;">
                            ${trainerName}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; font-weight: bold;">
                            จำนวนผู้เข้าร่วม:
                        </td>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor};">
                            ${details.participant} ท่าน
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td align="center" style="padding: 20px 20px 40px; background-color: #ffffff;">
                <p style="color: ${secondaryColor}; font-family: ${font}; font-size: 15px; margin-bottom: 25px;">
                    หากคุณต้องการยกเลิกหรือเปลี่ยนแปลงการจอง กรุณาติดต่อเราโดยเร็วที่สุด
                </p>
                <a href="[LINK_TO_YOUR_WEBSITE/BOOKING_PAGE]" class="button" style="display: inline-block; padding: 12px 25px; font-size: 16px; font-weight: bold; color: #ffffff !important; background-color: ${primaryColor}; border-radius: 5px; text-decoration: none;">
                    จัดการการจอง
                </a>
            </td>
        </tr>

        <tr>
            <td align="center" style="padding: 20px; background-color: ${secondaryColor};">
                <p style="color: #cccccc; font-family: ${font}; font-size: 12px;">
                    Boxing Club Team | [เบอร์โทรศัพท์ของคุณ] | [ที่อยู่ของคุณ]
                </p>
                <p style="color: #cccccc; font-family: ${font}; font-size: 12px; margin-top: 5px;">
                    © ${new Date().getFullYear()} All rights reserved.
                </p>
            </td>
        </tr>

    </table>
</center>

</body>
</html>
    `
}
