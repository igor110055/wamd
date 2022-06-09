const {
    default: axios
} = require("axios");

module.exports = {
    name: "quotesmaker",
    alias: ["quotes", "qmaker"],
    use: "*Example :* !quotesmaker <text>",
    desc: "Membuat Quotes Sendiri",
    category: "maker",
    async exec({
        sock,
        msg,
        args
    }) {
        try {
            if (!args.length > 0) return await msg.reply("No valid text detected");
            const text = args.join(" ");
            const {
                sender,
                pushName,
                from
            } = msg;
            await sock.sendMessage(from, {
                image: {
                    url: `https://api.lolhuman.xyz/api/quotesmaker?apikey=Papah-Chan&text=${text}`
                },
                caption: `*Request By @${pushName} At ${new Date().toLocaleTimeString()}`
            }, {
                quoted: msg
            })
        } catch (e) {
            console.log(e);
            await msg.reply(e)
        }
    }
}