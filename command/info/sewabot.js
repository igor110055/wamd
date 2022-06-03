const { footer } = require("../../config.json");

module.exports = {
    name: 'sewabot',
    alias: ['sewabot', 'botsewa'],
    category: 'others',
    desc: 'Donation Bot',
    
    async exec({ msg, sock }) {
        const x = '```'
        let str = `*Berikut List Harga Sewa Bot*

_Sewa Bot Untuk dimasukin kedalam group dan digunakan di dalam group_

• *Paket 1 : Rp. 15.000*
${x}• Bot Join 1 Group ✅${x}
${x}• Durasi 1 Bulan ✅${x}
${x}• Bisa Set Text Welcome/Left ✅${x}
${x}• Fast Response  & 24 Jam Online✅${x}

• *Paket 2 : Rp. 30.000*
${x}• Bot Join 1 Group ✅${x}
${x}• Durasi 2 Bulan + 15 Hari ✅${x}
${x}• Bisa Set Text Welcome/Left ✅${x}
${x}• Fast Response  & 24 Jam Online✅${x}


• *Paket 3 : Rp. 65.000*
${x}• Bot Join 2 Group ✅${x}
${x}• Durasi 2 Bulan + 15 Hari ✅${x}
${x}• Bisa Set Text Welcome/Left ✅${x}
${x}• Fast Response  & 24 Jam Online✅${x}


- *Jika Ingin Menambah Sewa Group Hanya : Rp. 10.000*
- *Jika Ingin Menambah Durasi Hanya : Rp. 10.000*


*Kegunaan Sewa Bot :*
• *Bot Bisa Di Masukin Kedalam Group*
• *Bisa Menyambut Member Baru / Keluar*
• *Fast Response & Ada Error Langsung di perbaiki*


Minat? Chat Owner Bot / Klik Link Dibawah.`.trim()
        await sock.sendMessage(msg.from, {
            text: str,
            footer: footer,
            templateButtons: [
                { urlButton: { displayText: "Owner Bot", url: "https://bit.ly/3t57DIV" } },
            ]
        }, { quoted: msg })
    }
}