// const speedTest = require('speedtest-net');

// module.exports = {
//     name: 'speedtest',
//     description: 'Test your internet speed',
//     owner: true,
//     async exec({
//         msg,
//         args,
//         sock
//     }) {
//         try {
//             await msg.reply("Testing your internet speed...");
//             var st = await speedTest({
//                 acceptLicense: true,
//                 acceptGdpr: true,
//             });
//             let capt = `Your internet speed is ${speedText(st.download.bandwidth)} / ${speedText(st.upload.bandwidth)}`;
//             await msg.reply(capt);

//         } catch (err) {
//             console.log(err);
//             await msg.reply("Gagal mengecek internet speed");
//         }
//     }
// }


// function speedText(speed) {
//     let bits = speed * 8;
//     const units = ["", "K", "M", "G", "T"];
//     const places = [0, 1, 2, 3, 3];
//     let unit = 0;
//     while (bits >= 2000 && unit < 4) {
//         unit++;
//         bits /= 1000;
//     }

//     return `${bits.toFixed(places[unit])} ${units[unit]}bps`;
// }