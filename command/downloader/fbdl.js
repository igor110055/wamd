const Downloader = require("../../utils/downloader");
const { fbdl } = new Downloader();
const xb = require("../../respon.json");

module.exports = {
	name: "fb",
	limit: true,
	consume: 2,
	alias: ["fbdl", "facebook", "fbvid"],
	category: "downloader",
	desc: "Download Facebook video",
	async exec({ sock, msg, args }) {
		try {
			if (!args.length > 0) return await msg.reply("No url provided");
			let data = await fbdl(args[0]);

			if (data.length === 0)
				return await msg.reply(xb.notfound.trim());
			await sock.sendMessage(msg.from, { video: { url: data[data.length - 1] }}, { quoted: msg });
		} catch (e) {
			await msg.reply(xb.error.trim());
		}
	},
};
