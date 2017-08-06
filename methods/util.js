import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import moment from 'moment';
import config from '../config';
import mkdirp from 'mkdirp';
import exists from 'path-exists';

const getCheerio = (body) => {
    const $ = cheerio.load(body, {decodeEntities: false});
    return $;
};

const getUrl = (subject, option = '') => {
    if (subject == 'highscore') {
        return `https://secure.tibia.com/community/?subtopic=highscores&world=Relembra&list=experience&profession=${option.profession}&currentpage=` + option.currentPage;
    } else if (subject === 'world' || subject === 'killstats') {
        return config.URL[subject] + option;
    } else if (subject === 'online') {
        return config.URL[subject].url + option + config.URL[subject].option;
    }
    return config.URL[subject];
}
const getInformation = (url, parser, option = {}) => {
    console.log('Gathering information from', url);
    axios.get(url)
        .then(response => {
            parser(response.data, option);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("Data:", error.response.data);
                console.log("Status:", error.response.status);
                console.log("Headers:", error.response.headers);
                if (error.response.status == 403) {
                    setTimeout(getInformation, 2000, url, parser, option);
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
};

const saveFile = (content, path, option = false, timestamp = true) => {
    let completePath =  path + `${option.world}/`+ moment().format('YYYY/MM/DD') + '/';
    let file = `${option.world}`;
    let runningTime = moment();
    if (timestamp === true) {
        file += '-' + runningTime.format('YY-MM-DD-HH-mm-ss') + '.json';
    } else {
        file += '.json';
    }
    const data = {
        version: '1.0',
        processing: runningTime,
        data: content,
        success: (content.length == 0) ? false : true
    }
    console.log(runningTime.format('YY-MM-DD-HH-mm-ss'), "-" , "Job did complete with", option.world);
    exists(completePath).then(exists => {
        if (exists) {
            fs.writeFile(`${completePath + file}`, JSON.stringify(data, null, 2), 'utf-8', function(err) {
            if (err) throw err
            console.log(`Done!`);
            });
        } else {
            mkdirp(completePath, function (err) {
                if (err) console.error(err);
                else {
                    fs.writeFile(`${completePath + file}`, JSON.stringify(data, null, 2), 'utf-8', function(err) {
                    if (err) throw err
                    console.log(`Done!`);
                    });
                }
            });
        }
    });
};

export default { getCheerio, getInformation, getUrl, saveFile };