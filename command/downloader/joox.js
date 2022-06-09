const axios = require("axios").default;

module.exports = {
	name: "joox",
	limit: true,
	consume: 1,
	alias: ["jooxplay", "playjoox"],
	category: "downloader",
	desc: "Download Song from Joox",
	async exec({ sock, msg, args }) {
		if (!args.length > 0) return await msg.reply("Ex: !joox *Judul Lagu");
		try {
            axios.get(`https://api.lolhuman.xyz/api/jooxplay?apikey=Papah-Chan&query=${args[0]}`).then(async ( { data }) =>{
                var url = data.result
                let capt = `*🎶 ${url.info.singer} - ${url.info.song} 🎶*\n
*⏰ ${url.info.duration} - ${url.info.date}\n`
                sock.sendMessage(msg.from, { image: { url: url.image}, caption : capt}, { quoted: msg})
                await sock.sendMessage(msg.from, { audio: { url: url.audio[0].link}, mimetype: "audio/mpeg",
                ptt: true}, { quoted: msg})
            })
		} catch (e) {
			await msg.reply("Error: " + e.message);
		}
	},
};

async function fastCheck(url) {
	const resp = await axios.get(url);
	return resp.headers["content-type"];
}