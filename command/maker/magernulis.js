const {
    default: axios
} = require("axios");

module.exports = {
    name: "magernulis",
    alias: ["magernulis", "nulis"],
    use: "*Example :* !magernulis <text>",
    desc: "Menulis di buku",
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
                    url: `https://api.lolhuman.xyz/api/nulis?apikey=Papah-Chan&text=${text}`
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