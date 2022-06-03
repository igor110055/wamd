const djs = require("../../lib/Collection");
const {
	footer,
	botName
} = require("../../config.json");

// Other Modules
const os = require("os");
const {
	formatSize
} = require("../../utils");
const {
	pasaran
} = require("../../lib/tgl");
const moment = require("moment-timezone");
const Prem = require("../../event/database/Premium");
const user = new Prem();

module.exports = {
	name: "help",
	alias: ["h", "cmd", "menu"],
	category: "general",
	async exec({
		sock,
		msg,
		args,
		isOwner
	}) {
		if (args[0]) {
			const data = [];
			const name = args[0].toLowerCase();
			const {
				commands,
				prefix
			} = djs;
			const cmd = commands.get(name) || commands.find((cmd) => cmd.alias && cmd.alias.includes(name));
			if (!cmd || (cmd.category === "private" && !isOwner)) return await msg.reply("No command found");
			else data.push(`*Cmd:* ${cmd.name}`);
			if (cmd.alias) data.push(`*Alias:* ${cmd.alias.join(", ")}`);
			if (cmd.limit) data.push(`*Limit:* ${cmd.consume || 1}`);
			if (cmd.premium) data.push(`*Premium:* ${cmd.premiumType.join(" / ")}`);
			if (cmd.desc) data.push(`*Description:* ${cmd.desc}`);
			if (cmd.use)
				data.push(
					`*Usage:* \`\`\`${prefix}${cmd.name} ${cmd.use}\`\`\`\n\nNote: [] = optional, | = or, <> = must filled`
				);

			return await msg.reply(data.join("\n"));
		} else {
			const {
				pushName,
				sender
			} = msg;
			const {
				prefix,
				commands
			} = djs;
			const cmds = commands.keys();
			let category = [];

			for (let cmd of cmds) {
				let info = commands.get(cmd);
				if (!cmd) continue;
				if (!info.category || info.category === "private" || info.owner) continue;
				if (Object.keys(category).includes(info.category)) category[info.category].push(info);
				else {
					category[info.category] = [];
					category[info.category].push(info);
				}
			}
			let userData = user.getUser(msg.sender);
			let str =
				`Hello, ${pushName === undefined ? sender.split("@")[0] : pushName} 😊👏\n\n` +
				`⏰ Time: ${moment().format('HH:mm:ss')}\n📅 Tanggal: ${pasaran().asu}` +
				`\n💻 Memory: ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}\n🖥 CPU: ${os.cpus()[0].model}${os.cpus().length > 1 ? " (" + os.cpus().length + "x)" : ""}\n\n` +
				`👤 *Your Limit:* ${userData.limit} Limit - (${userData.type ? userData.type : "basic/Free"})\n\n` +
				`*💰 Donate :*\n` +
				"*» Saweria:* _https://saweria.co/nafiz919_\n\n";
			const keys = Object.keys(category);
			for (const key of keys) {
				str += `╭──────❨ *${key.toUpperCase()}* ❩\n\`\`\`${category[key]
					.map(
						(cmd, idx) =>
							`├ ${idx + 1}. ${prefix}${cmd.name}${cmd.limit ? ` (${cmd.consume || 1} limit)` : ""}`
					)
					.join("\n")}\`\`\`\n╰──────────────\n\n`;
			}
			str += `send ${prefix}help followed by a command name to get detail of command, e.g. ${prefix}help sticker`;
			await sock.sendMessage(
				msg.from, {
					text: str,
					footer: footer,
					templateButtons: [{
							urlButton: {
								displayText: "My Instagram",
								url: "https://instagram.com/nfz.01"
							}
						},
						{
							urlButton: {
								displayText: "Instagram Bot",
								url: "https://instagram.com/nzlbots"
							}
						},
						{
							quickReplyButton: {
								displayText: "Sewa Bot",
								id: `${prefix}sewabot`
							}
						},
						{
							quickReplyButton: {
								displayText: "Donasi Bot",
								id: `${prefix}donation`
							}
						}
					],
				}, {
					quoted: msg
				}
			);
		}
	},
};