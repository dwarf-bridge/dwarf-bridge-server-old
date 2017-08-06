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

const env = dotenv.config()

if (env.error) {
  throw env.error;
}

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/hardcore';

const database = new pg.Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME
});

database.connect()
  .then(() => console.log('Databased connected'))
  .catch(err => console.error('Connection Error', err.stack));

// client.query('SELECT NOW()', (err, res) => {
//   if (err) throw err
//   console.log(res)
//   client.end()
// })

// config.hardcore.map((item) => {
//     online.getPlayers(item);
//     world.getInformation(item);
// });

//experience.getInformation();
//online.getPlayers('Relembra');
//world.getInformation('Relembra');
//killstats.getKillstatistics('Relembra');
// 
    // setTimeout(killstats.getKillstatistics, 2000, 'Relembra');
    // setTimeout(killstats.getKillstatistics, 4000, 'Antica');
    // setTimeout(killstats.getKillstatistics, 6000, 'Dolera');
//highscore.getInformation('Relembra');

const ksSchedule = schedule.scheduleJob('0 6 * * *', function() {
    console.log('Killstats is running');
    setTimeout(killstats.getKillstatistics, 2000, 'Relembra');
    setTimeout(killstats.getKillstatistics, 4000, 'Luminera');
    setTimeout(killstats.getKillstatistics, 6000, 'Macabra');
    setTimeout(killstats.getKillstatistics, 8000, 'Tortura');
    setTimeout(killstats.getKillstatistics, 10000, 'Helera');
});

// const onlineJob = schedule.scheduleJob('*/5 * * * *', function() {
//     console.log('online is running');
//     online.getPlayers('Relembra');
// });

// const worldJob = schedule.scheduleJob('*/5 * * * *', function() {
//     console.log('world is running');
//     world.getInformation('Relembra');
// });

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