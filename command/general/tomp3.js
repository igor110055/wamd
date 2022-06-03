const toAudio = require("../../lib/convert");
const {
    getRandom
} = require("../../utils");


module.exports = {
    name: "tomp3",
    alias: ["tomp3", "tomp3s", "tomp3s"],
    category: "general",
    desc: "Convert a video to mp3",
    async exec({
        msg,
        sock
    }) {
        const {
            quoted,
            from,
            type
        } = msg;

        const content = JSON.stringify(quoted);
        const isVideo = type === "videoMessage";
        const isQVid = type === "extendedTextMessage" && content.includes("videoMessage");
        let buffer, jancok;
        try {
            if (!isVideo) {
                await msg.reply("This command only works on audio messages");
                buffer = isQVideo ? await quoted.download() : await msg.download();
                jancok = await toAudio(buffer);
                await sock.sendMessage(from, { audio: jancok }, { quoted: msg });
                
            } else if (isQVid) {
                buffer = await quoted.download();
                jancok = await toAudio(buffer);
                await sock.sendMessage(from, { audio: jancok }, { quoted: msg });
            }
        } catch (err) {
            await msg.reply("Error: " + err);
            console.log(err);

        }


    }
}