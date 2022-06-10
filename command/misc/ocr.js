    const ocrtess = require('node-tesseract-ocr')
    const fs = require('fs')
    const consola = require('consola')

    module.exports = {
        name: 'ocr',
        alias: ['ocrtess'],
        category: 'premium',
        desc: 'Mengambil Teks di dalam Gambar',
        use: 'Send Image and reply media with caption /ocr',
        limit: true,
        consume: 2,
        async exec({
            msg,
            args
        }) {
            try {
                const {
                    quoted,
                    from,
                    sender,
                    type
                } = msg;
                const ocrconf = {
                    lang: 'eng',
                    oem: '3',
                    psm: '3'
                }
                const content = JSON.stringify(quoted);
                const isMedia = type === "imageMessage";
                const isQImage = type === "extendedTextMessage" && content.includes("imageMessage");
                const isSticker = type === "stickerMessage";
                const isQSticker = type === "extendedTextMessage" && content.includes("stickerMessage");
                if (!isQImage || !isMedia) {
                    msg.reply('Please wait...');
                    const image = isQImage ? await quoted.download() : await msg.download();
                    fs.writeFileSync(`./temp/${sender}.png`, image);
                    ocrtess.recognize(`./temp/${sender}.png`, ocrconf)
                        .then(text => {
                            msg.reply("```" + text.trim() + "```");
                            fs.unlinkSync(`./temp/${sender}.png`);
                        })
                }  else if (!isQSticker || !isSticker) {
                    msg.reply('Please wait...');
                    const sticker = isQSticker ? await quoted.download() : await msg.download();
                    fs.writeFileSync(`./temp/${sender}.png`, sticker);
                    ocrtess.recognize(`./temp/${sender}.png`, ocrconf)
                        .then(text => {
                            msg.reply("```" + text.trim() + "```");
                            fs.unlinkSync(`./temp/${sender}.png`);
                        })
                    } else {
                        msg.reply('Please send image or sticker');
                    }
            } catch (e) {
                consola.error(e);
                msg.reply(`Error while executing command: ${e}`);
            }
        }
    }