const axios = require("axios").default;

module.exports = {
	name: "igdl",
	limit: true,
	consume: 1,
	alias: ["ig", "instagram"],
	category: "downloader",
	desc: "Download instagram media",
	async exec({ sock, msg, args }) {
		if (!args.length > 0) return await msg.reply("Ex: !igdl *instagram_url*");
		try {
			axios.get(`https://api.lolhuman.xyz/api/instagram?apikey=Papah-Chan&url=${args[0]}`).then (({ data }) => {
				var url = data.result
                if (url.includes('.mp4')) {
					sock.sendMessage(msg.from, { video: { url: url}}, { quoted: msg})
				} else {
					sock.sendMessage(msg.from, { image: { url: url}}, { quoted: msg})
				}
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