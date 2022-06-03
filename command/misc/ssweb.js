const api = require('ssweb-api');
const consola = require('consola');


module.exports = {
    name: 'ssweb',
    alias: ['ssw'],
    description: 'Screenshot Website yang diinginkan',
    usage: 'Usage: /ssweb <url>',
    category: 'misc',
    async exec({
        sock,
        msg,
        args
    }) {
            if (!args.length === 1) return await msg.reply('Tidak ada url yang diinput');
            const url = args[0];
            var resultdekstop = await api.desktop({url: url, fullpage: true });
            var resulthp = await api.handphone({url: url, fullpage: true });
            await sock.sendMessage(msg.from , { image: { url: resultdekstop.result}, caption: "Nih Gann Versi Dekstop Full"}, { quoted: msg});
            await sock.sendMessage(msg.from , { image: { url: resulthp.result}, caption: "Nih Gann Versi Hp Full" }, { quoted: msg});

    }
}
