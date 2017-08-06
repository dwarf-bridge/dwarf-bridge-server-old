import axios from 'axios';
import cheerio from 'cheerio';
import util from './util';
import config from '../config';

const getOnlinePlayerObject = (player, level, vocation) => {
    return {
        name: player,
        level: Number(level),
        vocation: vocation
    }
}

const onlinePlayerParser = (body, option) => {
    const $ = util.getCheerio(body);
    let onlinePlayers = { players: [] };
    console.log(`Parsing...`);
    const online = $('.Table2 .InnerTableContainer table tbody').find('tr').slice(1).each(function(index) {

        const playerName = $(this).find('td a[href]').html();
        const playerLevel = $(this).find('td').eq(1).html();
        const playerVocation = $(this).find('td').eq(2).html();

        const player = getOnlinePlayerObject(playerName, playerLevel, playerVocation);
        onlinePlayers.players[index - 1] = player;
    });

    if (onlinePlayers.players.length == 0) {
        onlinePlayers = [];
    }
    util.saveFile(onlinePlayers, config.savePath.online, option);
}

const getPlayers = (world) => {
    util.getInformation(util.getUrl('online', world), onlinePlayerParser,  { world: world });
}

export default { getPlayers };
