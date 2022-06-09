const path = require('path');
const {ocr, TesseractConfig} = require('ocr-search');
const fs = require('fs')
const consola = require('consola')

module.exports = {
    name: 'ocrs',
    alias: ['ocrsearch'],
    category: 'premium',
    desc: 'Mengambil Teks di dalam Gambar',
    use: 'Send Image and reply media with caption /ocrs',
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
                oem: '1',
                psm: '3'
            }
            const content = JSON.stringify(quoted);
            const isMedia = type === "imageMessage";
            const isQImage = type === "extendedTextMessage" && content.includes("imageMessage");
            const isSticker = type === "stickerMessage";
            const isQSticker = type === "extendedTextMessage" && content.includes("stickerMessage");
            if (!isQImage || !isMedia) {
                const image = isQImage ? await quoted.download() : await msg.download();
                fs.writeFileSync(`./temp/${sender}.png`, image);
                const babi = await ocr(`./temp/${sender}.png`, ocrconf, true);
                msg.reply("```" + babi.trim() + "```");
                fs.unlinkSync(`./temp/${sender}.png`);
            }  else if (!isQSticker || !isSticker) {
                const sticker = isQSticker ? await quoted.download() : await msg.download();
                fs.writeFileSync(`./temp/${sender}.png`, sticker);
                const babi = await ocr(`./temp/${sender}.png`, ocrconf, true);
                msg.reply("```" + babi.trim() + "```");
                fs.unlinkSync(`./temp/${sender}.png`);
            } else {
                msg.reply('Please send image or sticker');
            }
        } catch (e) {
            consola.error(e);
            msg.reply(`Error while processing: ${e}`);
        }
    }
}