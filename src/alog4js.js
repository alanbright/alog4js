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
    log4js.categories = categories
    return log4js.configure({
        appenders: { out: { type: 'stdout' } },
        categories: categories
    });
}

log4js.init = init;
//debug(log4js)

function update(show, level){
    const logLevel = level || log4js.getLogger().level;
    debug('check logLevel',logLevel);
    debug('check log4js.categories',log4js.categories);
    if(show !== undefined){
        if(show === '*'){
            for(let elem of Object.keys(log4js.categories)){
                debug("elem", elem)
                log4js.categories[elem].level = logLevel;
            }
        }else{
            //sync the newest status
            for(let elem of Object.keys(log4js.categories)){
                debug("elem", elem, "log4js.getLogger(elem).level.levelStr",log4js.getLogger(elem).level.levelStr)
                log4js.categories[elem].level = log4js.getLogger(elem).level.levelStr;
            }

            const debugArray = show.split(',')
            debug('check debugArray',debugArray);
            for (let elem of debugArray){
                if(log4js.categories[elem]){
                    log4js.categories[elem].level = logLevel;
                }else{
                    log4js.categories[elem] = { appenders: ['out'], level: logLevel }
                }
            }
        }
    }
    debug('check set categories', log4js.categories);
    return log4js.configure({
        appenders: { out: { type: 'stdout' } },
        categories: JSON.parse(JSON.stringify(log4js.categories))
    });
}
log4js.update = update

module.exports = log4js;
