const debug = require("debug")("alog4js:index");
const log4js = require("log4js");

function init(topLevelList){

    const logLevel = process.env.LEVEL || 'info';
    const levelObj = {}
    for (let elem of topLevelList){
        levelObj[elem] = 'off'; //default show nothing.
    }
    const show = process.env.SHOW; //show * means show All. show= DB, DB.pool, ... (string to array)
    const categories = { "default":{ appenders: ['out'], level:logLevel } }
    if(show !== undefined){
        if(show === '*'){
            for (let elem of topLevelList){
                levelObj[elem] = logLevel;
                categories[elem] = { appenders: ['out'], level: levelObj[elem] }
            }
        }else{
            for (let elem of topLevelList){
                categories[elem] = { appenders: ['out'], level: levelObj[elem] }
            }
            const debugArray = show.split(',')
            for (let elem of debugArray){
                levelObj[elem] = logLevel;
                categories[elem] = { appenders: ['out'], level: levelObj[elem] }
            }
        }
    }
    debug('check categories', categories);
    return log4js.configure({
        appenders: { out: { type: 'stdout' } },
        categories: categories
    });
}

log4js.init = init;
//debug(log4js)

module.exports = log4js;
