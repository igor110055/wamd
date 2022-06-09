const axios = require('axios');
const { pasaran } = require("../../lib/tgl");

module.exports = {
    name: "textpro",
    limit: true,
    consume: 1,
    category: "maker",
    use: "!texpro kategori teks",
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
                case "hartatahta":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/hartatahta?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* hartatahta\nCreated At : ${pasaran().asu}`
                    });
                    break
                case "blackpink":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/blackpink?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* Box3D\nCreated At : ${pasaran().asu}`
                    });
                    break
                case "neon":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/neon?apikey=Papah-Chan&text=${text}`
                        }, caption: `*Request by :* ${pushName}\n*Text :* ${text}\n*Category :* Box3D\nCreated At : ${pasaran().asu}`
                    });
                    break
                case "box3d":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/box3d?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* Box3D\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                case "neonlight":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/neonlight?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* neonlight\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                case "impressiveglitch":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/impressiveglitch?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* impressiveglitch\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                case "sandsummer":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/sandsummer?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* sandsummer\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                case "roadwarning":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/roadwarning?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* roadwarning\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                case "icecold":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/icecold?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* icecold\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                case "thunder":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/thunder?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* thunder\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                case "futureneon":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/textprome/futureneon?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* futureneon\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                case "hartacustom":
                    await sock.sendMessage(msg.from, {
                        image: {
                            url: `https://api.lolhuman.xyz/api/hartacustom?apikey=Papah-Chan&text=${text}`
                        }, caption: `*※ Request by :* ${pushName}\n*※ Text :* ${text}\n*※ Category :* hartacustom\n*※ Created At :* ${pasaran().asu}`
                    });
                    break
                default:
                    const list = [{
                        title: "Pilihan Teks",
                        rows: [
                            { title: "🖌 TextPro - hartatahta", rowId: `#textpro hartatahta ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - hartacustom", rowId: `#textpro hartacustom ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - BlackPink", rowId: `#textpro blackpink ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - Neon", rowId: `#textpro neon ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - Box3D", rowId: `#textpro box3d ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - NeonLight", rowId: `#textpro neonlight ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - ImpressiveGlitch", rowId: `#textpro impressiveglitch ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - SandSummer", rowId: `#textpro sandsummer ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - RoadWarning", rowId: `#textpro roadwarning ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - IceCold", rowId: `#textpro icecold ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - Thunder", rowId: `#textpro thunder ${args[0]}`, description: ""},
                            { title: "🖌 TextPro - FutureNeon", rowId: `#textpro futureneon ${args[0]}`, description: ""},
                        ]
                    }];
                     await sock.sendMessage(msg.from, {
                        text: "\n\`\`\`Silahkan Pilih Kategory dibawah ini...\`\`\`",
                        footer: "\n1. 🖌 TextPro - hartatahta\n2. TextPro - BlackPink\n3. TextPro - Neon\n4. TextPro - Box3D\n5. TextPro - NeonLight\n6. TextPro - ImpressiveGlitch\n7. TextPro - SandSummer\n8. TextPro - RoadWarning\n9. TextPro - IceCold\n10. TextPro - Thunder\n11. TextPro - FutureNeon",
                        title: "*TexproMe Maker :* " + "```" + args[0] + "```",
                        buttonText: "TextPro - Me",
                        sections: list,
                    });

            }



        } catch (e) {
            await msg.reply(`Something bad happend\n${e.message}`);
        }

    }
}