import config from './config';
import dotenv from 'dotenv';
import world from './methods/world';
import character from './methods/character';
import experience from './methods/experience';
import online from './methods/online';
import highscore from './methods/highscore';
import killstats from './methods/killstats';

import schedule from 'node-schedule';
import moment from 'moment';
import pg from 'pg';

// const env = dotenv.config()

// if (env.error) {
//   throw env.error;
// }

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/hardcore';

// const database = new pg.Client({
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 5432,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWD,
//     database: process.env.DB_NAME
// });

// database.connect()
//   .then(() => console.log('Databased connected'))
//   .catch(err => console.error('Connection Error', err.stack));

// client.query('SELECT NOW()', (err, res) => {
//   if (err) throw err
//   console.log(res)
//   client.end()
// })

// config.hardcore.map((item) => {
//     online.getPlayers(item);
//     world.getInformation(item);
// });

// experience.getInformation();
//online.getPlayers('Macabra');
// world.getInformation('Helera');
// killstats.getKillstatistics('Antica');
// highscore.getInformation('Relembra');


const ksJob = schedule.scheduleJob('3 6 * * *', function() {
    console.log('killstats is running');
    setTimeout(killstats.getKillstatistics, 3000, 'Relembra');
    setTimeout(killstats.getKillstatistics, 6000, 'Macabra');
    setTimeout(killstats.getKillstatistics, 8000, 'Tortura');
    setTimeout(killstats.getKillstatistics, 10000, 'Helera');
});

const onlineJob = schedule.scheduleJob('*/5 * * * *', function() {
    console.log('online is running');
    setTimeout(online.getPlayers, 3000, 'Relembra');
    setTimeout(online.getPlayers, 6000, 'Macabra');
    setTimeout(online.getPlayers, 9000, 'Tortura');
    setTimeout(online.getPlayers, 12000, 'Helera');
});

const worldJob = schedule.scheduleJob('*/5 * * * *', function() {
    console.log('world is running');
    setTimeout(world.getInformation, 3000, 'Relemebra');
    setTimeout(world.getInformation, 6000, 'Macabra');
    setTimeout(world.getInformation, 9000, 'Tortura');
    setTimeout(world.getInformation, 12000, 'Helera');
});

// const houseBiddingJob = schedule.scheduleJob('*/15 * * * *', function() {
//     console.log('house is running');
//     houses.getInformation('Relembra');
// });

// const houseLastBiddingJob = schedule.scheduleJob('50 5 * * *', function() {
//     console.log('house buyers is running');
//     houses.getInformation('Relembra');

// const highscoreJob = schedule.scheduleJob('0 6 * *', function() {
//     console.log('highscores running');
//     highscore.getInformation('Relembra');
// })