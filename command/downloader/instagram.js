const Downloader = require("../../utils/downloader");
const { insta } = new Downloader();
const axios = require("axios").default;
const xb = require("../../respon.json");

module.exports = {
	name: "igdl",
	limit: true,
	consume: 2,
	alias: ["ig"],
	category: "downloader",
	desc: "Download instagram media",
	async exec({ sock, msg, args }) {
		if (!args.length > 0) return await msg.reply("Ex: !igdl *instagram_url*");
		try {
			const ar = await insta(args[0]);
			if (ar.uriType === "igHigh") {
				const type = await fastCheck(ar.media[0].url);
				let ext = /image/.test(type)
					? { image: { url: ar.media[0].url } }
					: { video: { url: ar.media[0].url } };
				await sock.sendMessage(msg.from, { ...ext, caption: xb.success.trim()}, { quoted: msg });
			} else if (ar.uriType === "igStory") {
				const type = await fastCheck(ar.media[0].url);
				let ext = /image/.test(type)
					? { image: { url: ar.media[0].url } }
					: { video: { url: ar.media[0].url } };
				await sock.sendMessage(msg.from, { ...ext, caption: xb.success.trim() }, { quoted: msg });
			} else {
				ar.url.map(async (r) => {
					const type = await fastCheck(r);
					let ext = /image/.test(type) ? { image: { url: r } } : { video: { url: r } };
					await sock.sendMessage(msg.from, { ...ext, caption: xb.success.trim() }, { quoted: msg });
				});
			}
		} catch (e) {
			await msg.reply(xb.error.trim());
		}
	},
};

async function fastCheck(url) {
	const resp = await axios.get(url);
	return resp.headers["content-type"];
}
