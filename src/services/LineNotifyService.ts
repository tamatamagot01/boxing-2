import axios from 'axios'

interface BookingNotificationData {
    bookingID: string
    customerName: string
    email: string
    phone: string
    classType: string
    trainerName?: string
    bookingDate: string
    bookingTime: string
    participant: number
}

class LineNotifyService {
    private token: string
    private apiUrl = 'https://notify-api.line.me/api/notify'

    constructor() {
        this.token = process.env.LINE_NOTIFY_TOKEN || ''
    }

    /**
     * ส่งข้อความแจ้งเตือนผ่าน LINE Notify
     */
    async sendMessage(message: string): Promise<boolean> {
        if (!this.token) {
            console.error('LINE_NOTIFY_TOKEN is not configured')
            return false
        }

        try {
            const response = await axios.post(
                this.apiUrl,
                new URLSearchParams({
                    message: message,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${this.token}`,
                    },
                },
            )

            return response.status === 200
        } catch (error) {
            console.error('Error sending LINE notification:', error)
            return false
        }
    }

    /**
     * ส่งข้อความแจ้งเตือนการจองใหม่
     */
    async sendBookingNotification(
        data: BookingNotificationData,
    ): Promise<boolean> {
        const {
            bookingID,
            customerName,
            email,
            phone,
            classType,
            trainerName,
            bookingDate,
            bookingTime,
            participant,
        } = data

        const classTypeText = classType === 'group' ? 'กลุ่ม' : 'ส่วนตัว'
        const trainerInfo = trainerName ? `\n👤 เทรนเนอร์: ${trainerName}` : ''

        const message = `
🥊 มีการจองใหม่!

📝 รหัสการจอง: ${bookingID}
👥 ลูกค้า: ${customerName}
📧 อีเมล: ${email}
📱 เบอร์โทร: ${phone}
🏋️ ประเภท: ${classTypeText}${trainerInfo}
📅 วันที่: ${bookingDate}
⏰ เวลา: ${bookingTime}
👫 จำนวนผู้เข้าร่วม: ${participant} คน
        `.trim()

        return await this.sendMessage(message)
    }

    /**
     * ทดสอบการเชื่อมต่อ LINE Notify
     */
    async testConnection(): Promise<boolean> {
        return await this.sendMessage(
            '🔔 ทดสอบการเชื่อมต่อ LINE Notify สำเร็จ!',
        )
    }
}

export default new LineNotifyService()
