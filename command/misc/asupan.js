// const { default: axios } = require("axios");

// module.exports = {
//     "name": "asupan",
//     "alias": ["penyegar", "timeline"],
//     "limit": true,
//     "consume": 2,
//     "description": "Asupan penyegar random cewe",
//     "usage": "!asupan",
//     "category": "misc",
//     async exec({ sock, msg, args, arg }) {
//         try {
//             let opt = args[0]
//             switch (opt) {
//                 case "asupan1":
//                     await sock.sendMessage(msg.from, { video: {url : `https://zenzapis.xyz/api/random/asupan?apikey=sanzychan01`}, mimetype: "video/mp4"}, { quoted: msg});
//                     break
//                 case "asupan2":
//                     await sock.sendMessage(msg.from, { video: {url : `https://zenzapis.xyz/api/random/asupantiktok?apikey=sanzychan01`}, mimetype: "video/mp4" }, { quoted: msg});
//                     break
//                 case "asupan3":
//                     await sock.sendMessage(msg.from, { video: {url : `https://zenzapis.xyz/api/random/asupan/aeunicetjoaa?apikey=sanzychan01`}, mimetype: "video/mp4" }, { quoted: msg});
//                     break 
//                 case "asupan4":
//                     await sock.sendMessage(msg.from, { video: {url : `https://zenzapis.xyz/api/random/asupan/natajadeh?apikey=sanzychan01`}, mimetype: "video/mp4" }, { quoted: msg});
//                     break
//                 case "asupan5":
//                     let gas = await axios.get(`https://api.lolhuman.xyz/api/asupan?apikey=Papah-Chan`)
//                     const rest = gas.data.result
//                     await sock.sendMessage(msg.from, { video: {url : rest}, mimetype: "video/mp4" }, { quoted: msg});
//                     default:
//                     const list = [{
//                         title: "Random Asupan",
//                         rows: [
//                             { title: "🎥 Random Asupan / Penyegar timeline (1)", rowId: `#asupan asupan1`, description: ""},
//                             { title: "🎥 Random Asupan / Penyegar timeline (2)", rowId: `#asupan asupan2`, description: ""},
//                             { title: "🎥 Random Asupan / Penyegar timeline (3)", rowId: `#asupan asupan3`, description: ""},
//                             { title: "🎥 Random Asupan / Penyegar timeline (4)", rowId: `#asupan asupan4`, description: ""},
//                             { title: "🎥 Random Asupan / Penyegar timeline (5)", rowId: `#asupan asupan5`, description: ""},
//                         ]
//                     }];
//                      await sock.sendMessage(msg.from, {
//                         text: "\n\`\`\`Silahkan Pilih Kategory dibawah ini...\`\`\`",
//                         footer: "",
//                         title: "*Random Asupan / Penyegar Timeline😜*",
//                         buttonText: "Penyegar",
//                         sections: list,
//                     });
//             }
//         } catch (err) {
//             console.log(err);
//             await msg.reply(err)
//         }
//     }
// }