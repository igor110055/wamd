const speedTest = require('speedtest-net');
const { formatSize } = require("../../utils");


module.exports = {
    name: 'speedtest',
    description: 'Test your internet speed',
    owner: true,
    async exec({
        msg,
        args,
        sock
    }) {
        try {
            await msg.reply("Testing your internet speed...");
            var st = await speedTest({
                acceptLicense: true,
                acceptGdpr: true,
            });
            let capt = `» *Speed Upload :* ${speedText(st.upload.bandwidth)}
» *Speed Download :* ${speedText(st.download.bandwidth)}
» *Ping :* ${st.ping.latency} Ms
» *Jitter :* ${st.ping.jitter} Ms
» *Packet Loss :* ${formatSize(st.packetLoss)}
» *Isp :* ${st.isp}

[#] Result : ${st.result.url}`;
            // await msg.reply(capt);
            await sock.sendMessage(msg.from, { image: { url: `https://api.lolhuman.xyz/api/ssweb?apikey=Papah-Chan&url=${st.result.url}`}, caption: capt}, { quoted: msg });


        } catch (err) {
            console.log(err);
            await msg.reply("Gagal mengecek internet speed");
        }
    }
}


function speedText(speed) {
    let bits = speed * 8;
    const units = ["", "K", "M", "G", "T"];
    const places = [0, 1, 2, 3, 3];
    let unit = 0;
    while (bits >= 2000 && unit < 4) {
        unit++;
        bits /= 1000;
    }

    return `${bits.toFixed(places[unit])} ${units[unit]}bps`;
}