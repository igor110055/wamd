const Downloader = require("../../utils/downloader");
const { yt } = new Downloader();
const { fetchText, textParse, fetchBuffer } = require("../../utils");
const { validateURL } = require("../../utils/youtube-url-utils");
const xb = require("../../respon.json");

module.exports = {
	name: "ytv",
	limit: true,
	consume: 1,
	alias: ["ytmp4", "ytvid", "ytvideo"],
	category: "downloader",
	desc: "Download YouTube Video",
	async exec({ sock, msg, args }) {
		try {
			if (args.length < 1) return await msg.reply(`URL not provided`);
			let { url, opt } = textParse(args.join(" "));
			if (!validateURL(url)) return await msg.reply("Invalid URL");
			await msg.reply(xb.waiting.trim());

			const res = await yt(url, "video");
			if (res === "no_file") return await msg.reply("No download link found, maybe try another link?");
			switch (opt) {
				case "--doc":
					if (res.size >= 75 << 10) {
						let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
						let capt =`🎥 ＹＯＵＴＵＢＥ ＶＩＤＥＯ

(1). *Title	:* ${res.title}
(2). *VideoID	:* ${res.id}
(3). *FileSize	:* ${res.sizeF}

[📂 Download] : (${short})`.trim();
						await sock.sendMessage(msg.from, { image: { url: res.thumb }, caption: capt }, { quoted: msg });
					} else {
						await sock.sendMessage(
							msg.from,
							{
								document: await fetchBuffer(res.dl_link, { skipSSL: true }),	
								mimetype: "video/mp4",
								fileName: res.title + ".mp4",
							},
							{ quoted: msg }
						);
					}
					break;
				default:
					if (res.size >= 75 << 10) {
						let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
						let capt =`🎥 ＹＯＵＴＵＢＥ ＶＩＤＥＯ

(1). *Title	:* ${res.title}
(2). *VideoID	:* ${res.id}
(3). *FileSize	:* ${res.sizeF}

[📂 Download] : (${short})`.trim();
						await sock.sendMessage(msg.from, { image: { url: res.thumb }, caption: capt }, { quoted: msg });
					} else {
						let short = await fetchText(`https://tinyurl.com/api-create.php?url=${res.dl_link}`);
						let capt =`🎥 ＹＯＵＴＵＢＥ ＶＩＤＥＯ

(1). *Title	:* ${res.title}
(2). *VideoID	:* ${res.id}
(3). *FileSize	:* ${res.sizeF}

[📂 Download] : (${short})`.trim();
						await sock.sendMessage(
							msg.from,
							{
								video: await fetchBuffer(res.dl_link, { skipSSL: true }),
								mimetype: "video/mp4",
								caption: capt,
							},
							{ quoted: msg }
						);
					}
			}
		} catch (e) {
			console.log(e);
			await msg.reply(xb.error.trim());
		}
	},
};
