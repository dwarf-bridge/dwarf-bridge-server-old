import axios from 'axios';
import cheerio from 'cheerio';
import util from './util';
import config from '../config';

const getkillStatObject = (race, playersKilledYesteday, slainYesterday, playersKilledLastWeek, slainLastWeek) => {
    return {
        race: race,
        yesterdayKilled: playersKilledYesteday,
        yesterdaySlain: slainYesterday,
        lastweekKilled: playersKilledLastWeek,
        lastweekSlain: slainLastWeek
    }
}
const killstatsParser = (body, option) => {
    const $ = util.getCheerio(body);
    const killStats = { stats: [] };
    console.log(`Parsing...`);
    const stats = $('.BoxContent > form:nth-child(1) > table:nth-child(4) > tbody:nth-child(1)').find('tr').slice(2, -1).each(function(index) {

        const race = $(this).find('td').eq(0).text().trim();
        const playersKilledYesteday = $(this).find('td').eq(1).text().trim();
        const slainYesterday = $(this).find('td').eq(2).text().trim();
        const playersKilledLastWeek = $(this).find('td').eq(3).text().trim();
        const slainLastWeek = $(this).find('td').eq(4).text().trim();
        const object = getkillStatObject(race, playersKilledYesteday, slainYesterday, playersKilledLastWeek, slainLastWeek);
        killStats.stats[index] = object;
    });
    util.saveFile(killStats, config.savePath.killstats, option);
}


const getKillstatistics = (world) => {
    util.getInformation(util.getUrl('killstats', world), killstatsParser, world);
}

export default { getKillstatistics };