const { generateWAMessageFromContent, proto } = require("@adiwajshing/baileys");
const Downloader = require("../../utils/downloader");
const { yt } = new Downloader();
const { fetchBuffer, fetchText } = require("../../utils");
const { footer } = require("../../config.json");
const xb = require("../../respon.json");
const { default: axios } = require("axios");


module.exports = {
	name: "play",
	category: "downloader",
	desc: "Play media from YouTube.",
	async exec({ sock, msg, args }) {
		const { from, sender, pushName } = msg;
		if (args.length < 1) return await msg.reply("No query given to search.");
		const ytsr = await axios.get(`https://api-xcoders.xyz/api/search/youtube?query=${args.join(" ")}&apikey=xcoders`)
		const ytsData = ytsr.data.result;
		console.log(ytsData);
		if (!ytsData.length < 0) return await msg.reply("No video found for that keyword, try another keyword");
		let thumb = await fetchBuffer(ytsData[0].thumbnail);
		const res = await yt(ytsData[0].url, "audio");
		let restt = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
		if (res === "no_file") return await msg.reply("No download link found, maybe try another keyword?");

		// message struct
		let prep = generateWAMessageFromContent(
			from,
			proto.Message.fromObject({
				buttonsMessage: {
					locationMessage: { jpegThumbnail: thumb.toString("base64") },
					contentText: `🎧 ＹＯＵＴＵＢＥ ＰＬＡＹ

(1). *Title	:* ${ytsData[0].title}
(2). *Extension	:* ${ytsData[0].type === "video" ? "mp4" : "mp3"}
(3). *VideoID	:* ${ytsData[0].videoId}
(4). *Duration	:* ${ytsData[0].duration}
(5). *Author	:* ${ytsData[0].author.name}
(6). *Uploaded	:* ${ytsData[0].published_at}
(7). *Description	:* ${ytsData[0].description}
  

[📂 Download] : (${restt})\n\n`.trim(),
					footerText: "",
					headerType: 6,
					buttons: [
						{ buttonText: { displayText: "Video" }, buttonId: `#ytv ${ytsData[0].url} SMH`, type: 1 },
					],
				},
			}),
			{ timestamp: new Date() }
		);

		// Sending message
		await sock.relayMessage(from, prep.message, { messageId: prep.key.id }).then(async () => {
			try {
				if (res.size >= 120 << 10) {
					let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
					let capt = `🎧 ＹＯＵＴＵＢＥ ＰＬＡＹ

(1). *Title	:* ${ytsData[0].title}
(2). *Extension	:* ${ytsData[0].type === "video" ? "mp4" : "mp3"}
(3). *VideoID	:* ${ytsData[0].videoId}
(4). *Duration	:* ${ytsData[0].duration}
(5). *Author	:* ${ytsData[0].author.name}
(6). *Uploaded	:* ${ytsData[0].published_at}
(7). *Description	:* ${ytsData[0].description}
  

[📂 Download Manual] : 
>> (${short})\n\n
`;
					await sock.sendMessage(from, { image: { url: res.thumb }, caption: capt }, { quoted: prep });
				} else {
					let respMsg = await sock.sendMessage(
						from,
						{ audio: await fetchBuffer(res.dl_link, { skipSSL: true }), mimetype: "audio/mpeg" },
						{ quoted: prep }
					);
					let sections = [{ title: "Select result", rows: [] }];
					for (let idx in ytsData) {
						sections[0].rows.push({ title: "🎶 " + ytsData[idx].title , description: "	» Channel: " + ytsData[idx].author.name + '\n' + "	» Duration: " + ytsData[idx].duration, rowId: `#yta ${ytsData[idx].url}` });
					}
					await sock.sendMessage(
						from,
						{
							text: `Requested by ${pushName}\n${ytsData.length} results found.`,
							buttonText: "All Results",
							footer: "",
							mentions: [sender],
							sections,
						},
						{ quoted: respMsg }
					);
					sections = null;
				}
			} catch (e) {
				console.log(e);
				await msg.reply();
			}
		});
		thumb = null;
	},
};
