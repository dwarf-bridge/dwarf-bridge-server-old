import axios from 'axios';
import cheerio from 'cheerio';
import util from './util';
import config from '../config';


// const URL = `https://secure.tibia.com/community/?subtopic=highscores&
//     world=${worlds}&
//     list=${page}&
//     profession=${vocation}&
//     currentpage=${pageNum}`;

const settings = config.highscore.settings;

const getHighscoreObject = (page, player) => {
    switch (page) {
        case 'experience':
            return {
                rank: Number(player[0]),
                name: player[1],
                vocation: player[2],
                level: Number(player[3]),
                experience: Number(player[4])
            }
        default:
            break;
    }
};

const highscorePlayers = {
    ranking: {
        experience: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        achievements: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        axe: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        sword: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        club: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        distance: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        magic: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        loyalty: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        fishing: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        },
        shielding: {
            overall: [],
            none: [],
            druid: [],
            knight: [],
            paladin: [],
            sorcerer: []
        }
    }
};

const highscoreParser = (body, option) => {
    let finished = false;
    const $ = util.getCheerio(body);
    console.log(`Parsing ${option.page + ' page no. ' + option.pageNumber}...`);
    if (option.page === 'experience') {
        let experienceLength = $('#highscores .TableContainer .Table3 .TableContent tbody').find('tr').length;
        const experienceSliced = $('#highscores .TableContainer .Table3 .TableContent tbody').find('tr').slice(2, experienceLength - 1);

        const experience = $(experienceSliced).each(function(index) {
            if ($(experienceSliced).length != 25 && option.pageNumber > 1) {
                return false;
            };

            const playerRank = $(this).find('td').eq(0).html();

            if (playerRank == NaN) {
                return false;
            }

            const playerName = $(this).find('td a[href]').html();

            switch (option.vocation) {
                case 0:
                    if (highscorePlayers.ranking.experience.overall.length >= 1) {
                        if (highscorePlayers.ranking.experience.overall[0].name === playerName) {
                            return false;
                        }
                    }
                    break;
                case 1:
                    if (highscorePlayers.ranking.experience.none.length >= 1) {
                        if (highscorePlayers.ranking.experience.none[0].name === playerName) {
                            return false;
                        }
                    }
                    break;
                case 2:
                    if (highscorePlayers.ranking.experience.druid.length >= 1) {
                        if (highscorePlayers.ranking.experience.druid[0].name === playerName) {
                            return false;
                        }
                    }
                    break;
                case 3:
                    if (highscorePlayers.ranking.experience.knight.length >= 1) {
                        if (highscorePlayers.ranking.experience.knight[0].name === playerName) {
                            return false;
                        }
                    }
                    break;
                case 4:
                    if (highscorePlayers.ranking.experience.paladin.length >= 1) {
                        if (highscorePlayers.ranking.experience.paladin[0].name === playerName) {
                            return false;
                        }
                    }
                    break;
                case 5:
                    if (highscorePlayers.ranking.experience.sorcerer.length >= 1) {
                        if (highscorePlayers.ranking.experience.sorcerer[0].name === playerName) {
                            return false;
                        }
                    }
                    break;
                default:
                    break;
            }

            const playerVocation = $(this).find('td').eq(2).html();
            const playerLevel = $(this).find('td').eq(3).html();
            let playerExperience;

            if ($(this).find('td').eq(4).html()) {
                playerExperience = $(this).find('td').eq(4).html().replace(/\,/g, '');
            };
            const player = getHighscoreObject('experience', [playerRank, playerName, playerVocation, playerLevel, playerExperience]);

            switch (option.vocation) {
                case 0:
                    highscorePlayers.ranking.experience.overall[playerRank - 1] = player;
                    break;
                case 1:
                    highscorePlayers.ranking.experience.none[playerRank - 1] = player;
                    break;
                case 2:
                    highscorePlayers.ranking.experience.druid[playerRank - 1] = player;
                    break;
                case 3:
                    highscorePlayers.ranking.experience.knight[playerRank - 1] = player;
                    break;
                case 4:
                    highscorePlayers.ranking.experience.paladin[playerRank - 1] = player;
                    break;
                case 5:
                    highscorePlayers.ranking.experience.sorcerer[playerRank - 1] = player;
                    break;
                default:
                    break;
            }
        });
        if (option.pageNumber == option.lastPage && option.vocation == 5) {
            setTimeout(util.saveFile, 30000, highscorePlayers, config.savePath.highscore, option);
        }
    }
};

const getExperienceLadder = (vocationValue, world) => {
    const page = 'experience';
    for (let pageNumber = 1; pageNumber <= settings.maxPages; pageNumber++) {
        setTimeout(
            util.getInformation,
            `${pageNumber * 3}000`,
            util.getUrl('highscore', {
                world: world,
                profession: vocationValue,
                currentPage: pageNumber}
            ),
            highscoreParser, { world: world, page: page, pageNumber: pageNumber, vocation: vocationValue, lastPage: settings.maxPages}
        );
    }
}
const getInformation = (world) => {
    let page = 'experience';
    if (page == 'experience') {
        let vocation = 0;
        setTimeout(getExperienceLadder, (vocation) * 45000, vocation, world);
        vocation = 1;
        setTimeout(getExperienceLadder, (vocation) * 45000, vocation, world);
        vocation = 2;
        setTimeout(getExperienceLadder, (vocation) * 45000, vocation, world);
        vocation = 3;
        setTimeout(getExperienceLadder, (vocation) * 45000, vocation, world);
        vocation = 4;
        setTimeout(getExperienceLadder, (vocation) * 45000, vocation, world);
        vocation = 5;
        setTimeout(getExperienceLadder, (vocation) * 45000, vocation, world);
    }
}

export default { getInformation };