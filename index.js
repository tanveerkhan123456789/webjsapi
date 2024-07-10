const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');

const app = express();
const port = 3000;

let qrCodeData = '';

// Initialize WhatsApp client
const client = new Client();

client.on('qr', async (qr) => {
    try {
        qrCodeData = await qrcode.toString(qr, { type: 'svg', errorCorrectionLevel: 'L', margin: 1, scale: 4 });
        console.log('QR code generated');
        setTimeout(() => {
            qrCodeData = ''; // Clear QR code data after 20 seconds
            console.log('QR code data cleared');
        }, 20000); // 20 seconds delay
    } catch (err) {
        console.error('Error generating QR code', err);
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

// Serve QR code on the web page
app.get('/', (req, res) => {
    const htmlContent = `
        <html>
        <body>
            <h1>Scan the QR Code</h1>
            ${qrCodeData ? qrCodeData : 'Generating QR code...'}
            <script>
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            </script>
        </body>
        </html>
    `;
    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
