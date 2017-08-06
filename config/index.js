export default {
    baseURL: 'https://tibia.com',
    secureURL: 'https://secure.tibia.com',
    worlds: ['Belobra','Honbra', 'Relembra'],
    hardcore: ['Helera', 'Macabra', 'Tortura'],
    URL: {
        world: `https://secure.tibia.com/community/?subtopic=worlds&world=`,
        experience: `http://www.tibia.com/library/?subtopic=experiencetable`,
        killstats: "https://secure.tibia.com/community/?subtopic=killstatistics&world=",
        online: {
            url: `https://secure.tibia.com/community/?subtopic=worlds&world=`,
            option: `&order=level_asc`
        },
        highscore: {
            url: 'https://secure.tibia.com/community/?subtopic=highscores'
        }
    },
    savePath: {
        experience: `./output/`,
        online: `./output/online/`,
        worlds: `./output/worlds/`,
        killstats: './output/killstats/'
    },
    ids: {
        vocations: {
            "No Vocation": 1,
            "Paladin": 8,
            "Royal Paladin": 9,
            "Sorcerer": 6,
            "Master Sorcerer": 7,
            "Druid": 4,
            "Elder Druid": 5,
            "Knight": 2,
            "Elite Knight": 3
        }
    },
    highscore: {
        settings: {
            maxPages: 12,
            pages: ['experience',
                'achievements',
                'axe',
                'sword',
                'club',
                'distance',
                'magic',
                'loyalty',
                'fishing',
                'shielding'],
            vocations: {
                all: 0,
                none: 1,
                druid: 2,
                knight: 3,
                paladin: 4,
                sorcerer: 5
            },
        }
    }
};