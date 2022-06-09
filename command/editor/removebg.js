const { default: axios } = require("axios");
const {
    uploaderAPI
} = require("../../utils/uploader");

module.exports = {
    name: "removebg",
    alias: ["rbg"],
    use: "*Example :* Reply Image and Send Caption !removebg",
    category: "editor",
    async exec({ sock, msg, args }) {
		const { from, quoted, type } = msg;
		try {
			const content = JSON.stringify(quoted);
			const isMed = type === "imageMessage";
			const isQMed =
				type === "extendedTextMessage" &&
				(content.includes("imageMessage"));

            if (quoted && isQMed) {
                const asu = isQMed ? await quoted.download() : await msg.download();
                const resUrl = await uploaderAPI(asu, "uguu");
                const lolhuman = await axios.get(`https://api.lolhuman.xyz/api/filetourl?apikey=Papah-Chan&file=${resUrl.data.url}`)
                await sock.sendMessage(msg.from, { image: { url: `https://api.lolhuman.xyz/api/removebg?apikey=Papah-Chan&img=${lolhuman.data.result}` } }, { quoted: msg });
            } else if (isMed) {
                const asu = isMed ? await quoted.download() : await msg.download();
                const resUrl = await uploaderAPI(asu, "uguu");
                const lolhuman = await axios.get(`https://api.lolhuman.xyz/api/filetourl?apikey=Papah-Chan&file=${resUrl.data.url}`)
                await sock.sendMessage(msg.from, { image: { url: `https://api.lolhuman.xyz/api/removebg?apikey=Papah-Chan&img=${lolhuman.data.result}` } }, { quoted: msg });
            } else {
                await msg.reply("No media message found.\nDocument and sticker message currently not supported.");
            }

		} catch (e) {
			await msg.reply(`Error: ${e.message}`);
			console.log(e);
		}
	},
};