// const Downloader = require("../../utils/downloader");
// const { fbdl } = new Downloader();
// const lang = require("../other/text.json");

// const errMess = `ID:\n${lang.indo.util.download.fbFail}\n\nEN:\n${lang.eng.util.download.fbFail}`;

const { default: axios } = require("axios");

module.exports = {
	name: "fb",
	limit: true,
	consume: 2,
	alias: ["fbdl", "facebook", "fbvid"],
	category: "downloader",
	desc: "Download Facebook video",
	async exec({ sock, msg, args }) {
		if (!args.length > 0) return await msg.reply("*Example Used:*\n!fb *https://fb.watch/xxx* or !fb *https://www.facebook.com/CraftySchool/videos/xxx*");
	try {
			axios.get(`https://api.lolhuman.xyz/api/facebook?apikey=Papah-Chan&url=${args[0]}`).then(async ({ data }) => {
				await sock.sendMessage(msg.from, { video: { url: data.result },mimetype: "video/mp4",
				caption: `Request by ${msg.pushName}`, }, { quoted: msg });
			})
		} catch (e) {
			await msg.reply(errMess);
		}
	},
};