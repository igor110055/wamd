module.exports = {
    name: 'donation',
    alias: ['donation', 'donate'],
    category: 'others',
    desc: 'Donation Bot',
    async exec({ msg, sock }) {
        await msg.reply(`\`\`\`Do You Wan't Donation This Bot?\`\`\`
        
*Donate Let Through :*
●) *Gopay / Dana :* \`\`\`081220439155\`\`\`
●) *Saweria :* \`\`\`https://bit.ly/donationbot\`\`\`

\`\`\`We will receive any amount of your donation & it will be useful for developing bots\`\`\`

*❤️ Arigato For Donation!*`);
    }
}