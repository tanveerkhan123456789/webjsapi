const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');

const client = new Client({
    puppeteer: {
        headless: false, // Set to true if you want to run in headless mode
        executablePath: puppeteer.executablePath(), // Ensure Chrome is used
    },
    authStrategy: new LocalAuth() // Optional: Use LocalAuth to save session
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
