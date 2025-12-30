'use server'
import { capitalizeString } from '@/utils/capitalizeString'
import { Resend } from 'resend'

type BookignDetailType = {
    bookingID: string
    customer: {
        first_name: string
        last_name: string
        email: string
        phone?: string
    }
    classType: string
    date: string
    time: { start: string; end: string }
    participant: number
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMail(bookingDetails: BookignDetailType) {
    try {
        const htmlContent = generateBookingConfirmationHtml(bookingDetails)

        const { data, error } = await resend.emails.send({
            from: 'Income Muay Thai <noreply@incomemuaythai.online>',
            to: [bookingDetails.customer.email],
            subject: `Your Booking is Confirmed! (ID: ${bookingDetails.bookingID})`,
            html: htmlContent,
        })

        if (error) {
            console.error('❌ Resend error:', error)
            return null
        }

        return data
    } catch (error) {
        console.error('❌ Error sending customer email:', error)
        console.error(
            'Error details:',
            error instanceof Error ? error.message : String(error),
        )
        return null
    }
}

export async function sendOwnerNotification(bookingDetails: BookignDetailType) {
    try {
        const ownerEmail = process.env.OWNER_EMAIL
        if (!ownerEmail) {
            console.warn(
                '⚠️ OWNER_EMAIL not configured in environment variables',
            )
            return null
        }

        const htmlContent = generateOwnerNotificationHtml(bookingDetails)

        const { data, error } = await resend.emails.send({
            from: 'Income Muay Thai System <noreply@incomemuaythai.online>',
            to: [ownerEmail],
            subject: `New Booking Received - ${bookingDetails.bookingID}`,
            html: htmlContent,
        })

        if (error) {
            console.error('❌ Resend error:', error)
            return null
        }

        return data
    } catch (error) {
        console.error('❌ Error sending owner notification:', error)
        console.error(
            'Error details:',
            error instanceof Error ? error.message : String(error),
        )
        return null
    }
}

function generateBookingConfirmationHtml(details: BookignDetailType): string {
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
    <title>Booking Confirmed - Income Muay Thai  Team</title>
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
                    Income Muay Thai
                </h1>
            </td>
        </tr>

        <tr>
            <td align="center" style="padding: 30px 20px 20px; background-color: #ffffff;">
                <h2 style="color: ${secondaryColor}; font-family: ${font}; font-size: 24px; margin-bottom: 20px;">
                    Your booking has been confirmed!
                </h2>
                <p style="color: ${secondaryColor}; font-family: ${font}; font-size: 16px; line-height: 1.5;">
                    Hello ${capitalizeString(details.customer.first_name)},
                </p>
                <p style="color: ${secondaryColor}; font-family: ${font}; font-size: 16px; line-height: 1.5; margin-top: 15px;">
                    Thank you for booking a class with us. The details of your booking are as follows:
                </p>
            </td>
        </tr>

        <tr>
            <td align="center" style="padding: 0 20px 30px; background-color: #ffffff;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 500px; border: 1px solid #dddddd; border-radius: 8px; overflow: hidden;">
                    
                    <tr>
                        <td colspan="2" style="background-color: ${primaryColor}; padding: 10px 15px;">
                            <p style="color: #ffffff; font-family: ${font}; font-size: 16px; font-weight: bold;">
                                Booking ID: ${details.bookingID}
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td width="30%" style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; font-weight: bold; border-bottom: 1px solid #eeeeee; background-color: #f9f9f9;">
                            Name:
                        </td>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; border-bottom: 1px solid #eeeeee; background-color: #f9f9f9;">
                            ${capitalizeString(details.customer.first_name)} ${capitalizeString(details.customer.last_name)}
                        </td>
                    </tr>

                    <tr>
                        <td width="30%" style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; font-weight: bold; border-bottom: 1px solid #eeeeee; background-color: #f9f9f9;">
                            Class Type:
                        </td>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${primaryColor}; font-weight: bold; border-bottom: 1px solid #eeeeee; background-color: #f9f9f9;">
                            ${capitalizeString(details.classType)}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; font-weight: bold; border-bottom: 1px solid #eeeeee;">
                            Date/Time:
                        </td>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; border-bottom: 1px solid #eeeeee;">
                            ${details.date} / ${details.time.start} - ${details.time.end}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor}; font-weight: bold;">
                            Participants:
                        </td>
                        <td style="padding: 15px; font-family: ${font}; font-size: 16px; color: ${secondaryColor};">
                            ${details.participant} 
                        </td>
                    </tr>
                </table>
            </td>
        </tr>


        <tr>
            <td align="center" style="padding: 20px; background-color: ${secondaryColor};">
                <p style="color: #cccccc; font-family: ${font}; font-size: 12px;">
                    Income Muay Thai Team | 080-6430456 | incomemuaythai@gmail.com | 
                    <a href="https://maps.google.com/?q=IC+Muay+Thai+Chiang+Mai+61+1+Sri+Phum+Chiang+Mai+50200" target="_blank" style="color: #FF4500; text-decoration: none;">
                        IC Muay Thai Chiang Mai, 61/1 Sri Phum, Chiang Mai 50200, Thailand
                    </a>
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

function generateOwnerNotificationHtml(details: BookignDetailType): string {
    // กำหนดสีและรูปแบบหลักสำหรับเจ้าของ
    const primaryColor = '#1E40AF' // Blue - Professional
    const successColor = '#10B981' // Green
    const secondaryColor = '#1F2937'
    const bgColor = '#F3F4F6'
    const font = 'Arial, sans-serif'

    return `
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>แจ้งเตือนการจองใหม่</title>
    <style>
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
        h1, h2, h3, h4, p { margin: 0; padding: 0; }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${bgColor};">

<center>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 650px;">
        
        <!-- Header -->
        <tr>
            <td align="center" style="padding: 25px 20px; background: linear-gradient(135deg, ${primaryColor} 0%, #3B82F6 100%);">
                <h1 style="color: #ffffff; font-family: ${font}; font-size: 26px; font-weight: 700; margin-bottom: 5px;">
                    แจ้งเตือนการจองใหม่
                </h1>
                <p style="color: #E0E7FF; font-family: ${font}; font-size: 14px;">
                    ระบบแจ้งเตือนการจอง
                </p>
            </td>
        </tr>

        <!-- Alert Badge -->
        <tr>
            <td align="center" style="padding: 20px 20px 0; background-color: #ffffff;">
                <div style="display: inline-block; background-color: ${successColor}; color: #ffffff; padding: 8px 20px; border-radius: 20px; font-family: ${font}; font-size: 14px; font-weight: 600;">
                    ✓ มีการจองเข้ามาใหม่
                </div>
            </td>
        </tr>

        <!-- Summary Info -->
        <tr>
            <td style="padding: 20px 30px; background-color: #ffffff;">
                <p style="color: ${secondaryColor}; font-family: ${font}; font-size: 16px; line-height: 1.6;">
                    มีลูกค้าจองคลาสเข้ามาใหม่ กรุณาตรวจสอบรายละเอียดด้านล่าง:
                </p>
            </td>
        </tr>

        <!-- Booking Details Card -->
        <tr>
            <td align="center" style="padding: 0 20px 20px; background-color: #ffffff;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 580px; border: 2px solid ${primaryColor}; border-radius: 10px; overflow: hidden;">
                    
                    <!-- Booking ID Header -->
                    <tr>
                        <td colspan="2" style="background-color: ${primaryColor}; padding: 15px 20px;">
                            <p style="color: #ffffff; font-family: ${font}; font-size: 18px; font-weight: bold;">
                                รหัสการจอง: ${details.bookingID}
                            </p>
                            <p style="color: #E0E7FF; font-family: ${font}; font-size: 13px; margin-top: 3px;">
                                ${new Date().toLocaleString('th-TH', {
                                    dateStyle: 'full',
                                    timeStyle: 'short',
                                    timeZone: 'Asia/Bangkok',
                                })}
                            </p>
                        </td>
                    </tr>

                    <!-- Customer Information Section -->
                    <tr>
                        <td colspan="2" style="background-color: #F9FAFB; padding: 15px 20px; border-bottom: 2px solid #E5E7EB;">
                            <p style="color: ${primaryColor}; font-family: ${font}; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                                ข้อมูลลูกค้า
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td width="35%" style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: #6B7280; border-bottom: 1px solid #E5E7EB;">
                            ชื่อ-นามสกุล:
                        </td>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: ${secondaryColor}; font-weight: 600; border-bottom: 1px solid #E5E7EB;">
                            ${capitalizeString(details.customer.first_name)} ${capitalizeString(details.customer.last_name)}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: #6B7280; border-bottom: 1px solid #E5E7EB;">
                            อีเมล:
                        </td>
                          <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: ${secondaryColor}; font-weight: 600; border-bottom: 1px solid #E5E7EB;">
                             ${details.customer.email}
                        </td>
                    </tr>
                    ${
                        details.customer.phone
                            ? `
                    <tr>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: #6B7280; border-bottom: 1px solid #E5E7EB;">
                            เบอร์โทร:
                        </td>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: ${secondaryColor}; font-weight: 600; border-bottom: 1px solid #E5E7EB;">
                            ${details.customer.phone}
                        </td>
                    </tr>`
                            : ''
                    }

                    <!-- Class Details Section -->
                    <tr>
                        <td colspan="2" style="background-color: #F9FAFB; padding: 15px 20px; border-bottom: 2px solid #E5E7EB;">
                            <p style="color: ${primaryColor}; font-family: ${font}; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                                รายละเอียดคลาส
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: #6B7280; border-bottom: 1px solid #E5E7EB;">
                            ประเภทคลาส:
                        </td>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: ${secondaryColor}; border-bottom: 1px solid #E5E7EB;">
                            <span style="background-color: #DBEAFE; color: ${primaryColor}; padding: 4px 12px; border-radius: 12px; font-weight: 600;">
                                ${capitalizeString(details.classType)}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: #6B7280; border-bottom: 1px solid #E5E7EB;">
                            วันที่:
                        </td>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: ${secondaryColor}; font-weight: 600; border-bottom: 1px solid #E5E7EB;">
                            ${details.date}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: #6B7280; border-bottom: 1px solid #E5E7EB;">
                            เวลา:
                        </td>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: ${secondaryColor}; font-weight: 600; border-bottom: 1px solid #E5E7EB;">
                            ${details.time.start} - ${details.time.end}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: #6B7280;">
                            จำนวนผู้เข้าร่วม:
                        </td>
                        <td style="padding: 12px 20px; font-family: ${font}; font-size: 15px; color: ${secondaryColor};">
                            <span style="background-color: ${successColor}; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-weight: 600;">
                                ${details.participant} คน
                            </span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td align="center" style="padding: 20px; background-color: ${secondaryColor};">
                <p style="color: #9CA3AF; font-family: ${font}; font-size: 12px;">
                    อีเมลนี้ส่งอัตโนมัติจากระบบจัดการ Income Muay Thai
                </p>
                <p style="color: #6B7280; font-family: ${font}; font-size: 11px; margin-top: 8px;">
                    © ${new Date().getFullYear()} Income Muay Thai Team สงวนลิขสิทธิ์
                </p>
            </td>
        </tr>

    </table>
</center>

</body>
</html>
    `
}
