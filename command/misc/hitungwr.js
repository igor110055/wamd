const { default : axios } = require('axios');

module.exports = {
    name: 'hitungwr',
    aliases: ['hwr'],
    description: 'Hitung WR Mobile legends',
    usage: '!hitungwr Total Match | Total Winrate | To Winrate\nExample : !hitungwr 90|60|22',
    async exec({ sock, msg, args, arg }) {
        let matchWr = arg.split("|")[0] || "_";
        let Winrate = arg.split("|")[1] || "_";
        let toWr = arg.split("|")[2] || "_";
        try {
            axios.get(`https://zenzapis.xyz/api/information/hitungwr?apikey=sanzychan01&text=${matchWr}&text2=${Winrate}&text3=${toWr}`).then(async ({ data }) => {
                let result = data.result;
                log(data)
                const cpt = `Total Match : *${result.total_match}*
Total Winrate : *${result.total_winrate}*
To Winrate : *${result.req_winrate}*

\`\`\`${result.description}\`\`\`}\n`;
            await msg.reply(cpt);
            })
        } catch (err) {
            console.log(err);
            await msg.reply(err)
        }
    }
}