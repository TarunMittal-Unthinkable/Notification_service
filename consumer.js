import dotenv from 'dotenv';
import amqp from 'amqplib';
import {sendSMS,sendEmail} from './notifications.js';

dotenv.config();

export async function startConsumer() {
    const queue = 'notifications';
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();

    await channel.assertQueue(queue, { durable: true });
    console.log("Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, async (msg) => {
        console.log("msg",msg);
        if (msg !== null) {
            console.log("Received message", msg.content.toString());
            const { type, to, message } = JSON.parse(msg.content.toString());
            console.log("hiii",type, to, message);
            try {
                if (type === 'sms') {
                    console.log("hiii2",type, to, message);
                    await sendSMS(to, message);
                } else if (type === 'email') {
                    await sendEmail(to, 'Notification', message);
                }
                console.log('Notification sent');
                channel.ack(msg);
            } catch (error) {
                console.error('Failed to send notification:', error);
                channel.nack(msg);
            }
        }
    });
}

startConsumer();
