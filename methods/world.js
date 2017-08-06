import axios from 'axios';
import cheerio from 'cheerio';
import util from './util';
import config from '../config';

const getWorldInformationObject = (world, status, online, record, creation, location, pvp, premium, transfer, titles, preview) => {
    const worldObject = {};
    worldObject[world] = {
        status: (status) ? status : '',
        online: (online) ? Number(online) : 0,
        record: (record) ? record : '',
        creation: (creation) ? creation : '',
        location: (location) ? location : '',
        pvp: (pvp) ? pvp : '',
        premium: (premium) ? premium : '',
        transfer: (transfer) ? transfer : '',
        titles: (titles) ? titles : '',
        preview: (preview) ? preview : ''
    };
    return worldObject
}

const parseWorldTitles = (titles) => {
    if (titles === "This game world currently has no title.") {
        return {
            count: 0,
            titlesList: ['']
        }
    }
    const separatedTitles = titles.split(', ');
    return {
        titlesList: separatedTitles,
        count: separatedTitles.length
    }
}
const worldInformationParser = (body, option) => {
    console.log('Parsing...');
    const $ = util.getCheerio(body);
    let index = 0;
    const world = $('.Table1').eq(1).find('table tbody');

    index += 2;
    const status = $(world).find('td').eq(index).text();
    index += 2;
    const online = $(world).find('td').eq(index).html();
    index += 2;
    const record = $(world).find('td').eq(index).html();
    index += 2;
    const creation = $(world).find('td').eq(index).html();
    index += 2;
    const location = $(world).find('td').eq(index).html();
    index += 2;
    const pvp = $(world).find('td').eq(index).html();

    let premium;
    if ($(world).find('td').eq(index + 1).html() === 'Premium Type:') {
        index += 2;
        premium = $(world).find('td').eq(index).html();
    }
    let transfer;
    if ($(world).find('td').eq(index + 1).html() === 'Transfer Type:') {
        index += 2;
        transfer = $(world).find('td').eq(index).html();
    }
    let titles;
    if ($(world).find('td').eq(index + 1).html() === 'World Quest Titles:') {
        index += 2;
        titles = parseWorldTitles($(world).find('td').eq(index).text());
    }
    let preview;
    if ($(world).find('td').eq(index + 1).text() === 'Preview Game World: ') {
        index += 2;
        preview = $(world).find('td').eq(index).html();
    }

    let worldInformation = [];
    if (status !== '') {
        const worldObject = getWorldInformationObject(option.world, status, online, record, creation, location, pvp, premium, transfer, titles, preview);
        worldInformation.push(worldObject);
    }

    util.saveFile(worldInformation, config.savePath.worlds, option);
};

const getInformation = (world) => {
    util.getInformation(util.getUrl('world', world), worldInformationParser, { world: world });
};

export default { getInformation };