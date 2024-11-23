const amqp = require('amqplib');
const dotenv = require('dotenv').config();

async function consumeMessage(queue = 'hello') {
    const amqpURL = process.env.URL;

    try {
        const connection = await amqp.connect(amqpURL);
        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false });

        console.log(`Aguardando mensagens na fila: ${queue}`);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`Mensagem recebida: ${msg.content.toString()}`);
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('Erro ao consumir mensagens:', error);
    }
}

consumeMessage();
