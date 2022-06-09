const { pasaran } = require("../../lib/tgl");

module.exports = {
    name: "ttp",
    limit: true,
    consume: 1,
    category: "maker",
    use: "*Example:* !ttp kategori teks",
    async exec({
        sock,
        msg,
        args
    }) {
        try {
            const { sender, pushName } = msg;
            let opt = args[0];
            const text = args.slice(1).join(" ");
            if (!text === "") {
                return await msg.reply("No valid text detected")
            };
            switch (opt) {
                case "1":
                    await sock.sendMessage(msg.from, {
                        sticker: {
                            url: `https://api.lolhuman.xyz/api/ttp?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* Text To Picture (1)\nCreated At : ${pasaran().asu}`
                    });
                    break
                case "2":
                    await sock.sendMessage(msg.from, {
                        sticker: {
                            url: `https://api.lolhuman.xyz/api/ttp2?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* Text To Picture (2)\nCreated At : ${pasaran().asu}`
                    });
                    break
                case "3":
                    await sock.sendMessage(msg.from, {
                        sticker: {
                            url: `https://api.lolhuman.xyz/api/ttp3?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* Text To Picture (3)\nCreated At : ${pasaran().asu}`
                    });
                    break
                case "4":
                    await sock.sendMessage(msg.from, {
                        sticker: {
                            url: `https://api.lolhuman.xyz/api/ttp4?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* Text To Picture (4)\nCreated At : ${pasaran().asu}`
                    });
                    break
                case "5":
                    await sock.sendMessage(msg.from, {
                        sticker: {
                            url: `https://api.lolhuman.xyz/api/ttp5?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* Text To Picture (5)\nCreated At : ${pasaran().asu}`
                    });
                    break
                case "6":
                    await sock.sendMessage(msg.from, {
                        sticker: {
                            url: `https://api.lolhuman.xyz/api/ttp6?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* Text To Picture (6)\nCreated At : ${pasaran().asu}`
                    });
                    break
                default:
                    const list = [{
                        title: "Category Text To Picture",
                        rows: [
                            { title: "🖌 Text to Picture (1)", rowId: `#ttp 1 ${args[0]}`, description: ""},
                            { title: "🖌 Text to Picture (2)", rowId: `#ttp 2 ${args[0]}`, description: ""},
                            { title: "🖌 Text to Picture (3)", rowId: `#ttp 3 ${args[0]}`, description: ""},
                            { title: "🖌 Text to Picture (4)", rowId: `#ttp 4 ${args[0]}`, description: ""},
                            { title: "🖌 Text to Picture (5)", rowId: `#ttp 5 ${args[0]}`, description: ""},
                            { title: "🖌 Text to Picture (6)", rowId: `#ttp 6 ${args[0]}`, description: ""}
                        ]
                    }];
                     await sock.sendMessage(msg.from, {
                        text: "\n\`\`\`Silahkan Pilih Kategory dibawah ini...\`\`\`",
                        footer: "\n1. 🖌 Text to Picture (1)\n2. 🖌 Text to Picture (2)\n3. 🖌 Text to Picture (3)\n4. 🖌 Text to Picture (4)\n5. 🖌 Text to Picture (5)\n6. 🖌 Text to Picture (6)",
                        title: "*Text to Picture :* " + "```" + args[0] + "```",
                        buttonText: "Text to Picture",
                        sections: list,
                    });

            }



        } catch (e) {
            await msg.reply(`Something bad happend\n${e.message}`);
        }

    }
}