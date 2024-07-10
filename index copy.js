const { Client, LocalAuth } = require('whatsapp-web.js');
2

client = new Client({
            authStrategy: new LocalAuth({
                clientId: '923044029735',
            }),
            webVersionCache: {
                type: 'remote',
                remotePath:
                    'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1014590669-alpha.html',
            },
            puppeteer: {
                headless: true, // or false if you want to see the browser
                args: ['--no-sandbox', '--disable-setuid-sandbox'], // other Chromium flags if needed
            },
            ...clientOpts,
        })