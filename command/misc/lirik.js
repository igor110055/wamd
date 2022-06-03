const lyricsParse = require('lyrics-parse');
const {
    default: axios
} = require('axios')
const {
    JSDOM
} = require('jsdom')
const {
    botName,
    musixmatch
} = require('../../config.json');

module.exports = {
    name: 'lirik',
    alias: ["liriklagu", "lagulirik"],
    description: 'Lirik Lagu',
    usage: '/lirik <Judul Lagu>',
    category: 'misc',
    limit: true,
    consume: 1,
    async exec({
        sock,
        msg,
        args
    }) {
        try {
            if (!args.length > 0) return await msg.reply("Need to specify song name");
            const musix = await musixMatch(args.join(' '))
            if (!musix) {
                const lParse = await lyricsParse(args.join(' '))
                if (!lParse) return msg.reply('Tidak ditemukan')
                msg.reply(lParse)
            } else {
                msg.reply(`✅ *Lyrics Search*\n\n*${musix.artist}* - _${musix.title}_\n\n${musix.lyrics}\n\n_from musixmatch_`)
            }
        } catch (err) {
            console.log(err);
            await msg.reply("Error");
        }
    }
}

async function search(trackTitle) {
    const { data } = await axios.get(`http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${musixmatch}`)
    if (data.message.header.status_code !== 200) return []
    return data.message.body.track_list.filter(x => x.track.has_lyrics == 1).map(({ track }) => {
        return {
            track_id: track.track_id,
            track_name: track.track_name,
            artist_name: track.artist_name,
            track_share_url: track.track_share_url,
            album_name: track.album_name
        }
    })
}

async function lyrics(track_share_url) {
    const { data } = await axios.get(track_share_url)
    let dom = new JSDOM(data).window.document
    let lyric = [...dom.getElementsByClassName('mxm-lyrics__content')].map(x => x.textContent).join('')
    return lyric
}

async function musixMatch(title) {
    const data = await search(title);
    if (data.length == 0) return false
    const getLyrics = await lyrics(data[0].track_share_url)
    return {
        title: data[0].track_name,
        artist: data[0].artist_name,
        album: data[0].album_name,
        lyrics: getLyrics
    }
}