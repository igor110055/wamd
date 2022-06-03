const { default: axios } = require("axios");

module.exports = {
	name: "yts",
	alias: ["ytsearch"],
	category: "downloader",
	desc: "Search on YouTube.",
	async exec({ sock, msg, args }) {
		if (args.length < 1) return await msg.reply("No query given to search.");
		const ytsr = await axios.get(`https://api-xcoders.xyz/api/search/youtube?query=${args.join(" ")}&apikey=xcoders`)
		const ytsData = ytsr.data.result;
		let txt = `YouTube Search\n   ~> Query: ${args.join(" ")}\n`;
		for (let i = 0; i < ytsData.length; i++) {
			txt += `\n📙 Title: ${ytsData[i].title}\n📎 Url: ${ytsData[i].url}\n🚀 Upload: ${ytsData[i].published_at}\n`;
		}
		await sock.sendMessage(msg.from, { image: { url: ytsData[0].image ? ytsData[0].image : ytsData[0].thumbnail}, caption: txt }, { quoted: msg });
	},
};
