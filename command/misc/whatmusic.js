const fs = require('fs');
const acrcloud = require("acrcloud")
const acr = new acrcloud({ 
    host: "identify-eu-west-1.acrcloud.com", 
    access_key: "9f509308c5577432f293cbb3b301981e", 
    access_secret: "OeF53EypHULWKz9TH0oLwKzGKXM6fXSJ0aqLvN53"}) 

module.exports = {
	name: "whatmusic",
	desc: "Search Informasi Title Song",
	use: "Send Audio and reply media with caption /whatmusic",
    category: "premium",
	alias: ["wmusic"],
    limit: true,
    consume: 2,
    premium: true,
	premiumType: ["drakath", "nulgath", "artix"],
	async exec({ msg, sock, args, arg, isOwner }) {
        try {
        msg.reply("Please wait...")
        const { quoted, from, type } = msg;
        const content = JSON.stringify(quoted);
        const isMedia = type === "audioMessage";
        const isQAudio = type === "extendedTextMessage" && content.includes("audioMessage");
        fs.writeFileSync("./temp/whatmusic.mp3", isQAudio ? await quoted.download() : await msg.download());
        const asu = fs.readFileSync("./temp/whatmusic.mp3");
        acr.identify(asu).then(metadata => {
            console.log(metadata.metadata.music[0]);
            const rest = `*Data Pencarian Ditemukan!...*

\`\`\`» Title: ${metadata.metadata.music[0].title || '-'}\`\`\`
\`\`\`» Label: ${metadata.metadata.music[0].label || '-'}\`\`\`
\`\`\`» Album: ${metadata.metadata.music[0].album.name || '-'}\`\`\`
\`\`\`» Genres: ${metadata.metadata.music[0].genres[0].name || '-'}\`\`\`
\`\`\`» Artist: ${metadata.metadata.music[0].artists[0].name || '-'}\`\`\`
\`\`\`» Release: ${metadata.metadata.music[0].release_date || '-'}\`\`\`
\`\`\`» Duration: ${metadata.metadata.music[0].duration_ms || '-'} \`\`\`

\`\`\`✅ JSON\`\`\`\n
\`\`\`${JSON.stringify(metadata.metadata.music[0].external_metadata, null, 4)}\`\`\`


\`\`\`Score : ${metadata.metadata.music[0].score}%\`\`\`
`.trim();
            msg.reply(rest.trim());
        })
        } catch (e) {
            consola.error(e);
            msg.reply(`Error while searching music`);
        }
 	},
};