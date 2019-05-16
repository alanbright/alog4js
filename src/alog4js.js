const debug = require("debug")("alog4js:index");
const log4js = require("log4js");

function init(topLevelList){

    const logLevel = (process.env.LEVEL || 'info').toLowerCase();
    const levelObj = {}
    for (let elem of topLevelList){
        levelObj[elem] = 'off'; //default show nothing.
    }
    const show = process.env.SHOW; //show * means show All. show= DB, DB.pool, ... (string to array)
    const categories = { "default":{ appenders: [logLevel,'traceFile'], level:'trace' } }

    if(show !== undefined){
        if(show === '*'){
            for (let elem of topLevelList){
                levelObj[elem] = logLevel;//use define level or default info level
                categories[elem] = { appenders: [logLevel,'traceFile'], level: 'trace' }
            }
        }else{
            for (let elem of topLevelList){
                categories[elem] = { appenders: [logLevel,'traceFile'], level: levelObj[elem] }
            }
            const debugArray = show.split(',')
            for (let elem of debugArray){
                levelObj[elem] = logLevel;
                categories[elem] = { appenders: [logLevel,'traceFile'], level: levelObj[elem] }
            }
        }
    }else{
        // show is undefined, initial define domain to server log level info
        for (let elem of topLevelList){
            levelObj[elem] = logLevel;
            categories[elem] = { appenders: [logLevel,'traceFile'], level: 'trace' }
        }
    }
    debug('check categories', categories);
    log4js.categories = categories
    return log4js.configure({
        appenders: {
            out: { type: 'stdout' },
            trace: { type: 'logLevelFilter', level:'trace' , appender: "out" },
            debug: { type: 'logLevelFilter', level:'debug' , appender: "out" },
            info: { type: 'logLevelFilter', level:'info' , appender: "out" },
            warn: { type: 'logLevelFilter', level:'warn' , appender: "out" },
            error: { type: 'logLevelFilter', level:'error' , appender: "out" },
            fatal: { type: 'logLevelFilter', level:'fatal' , appender: "out" },
            off: { type: 'logLevelFilter', level:'off' , appender: "out" },
            traceFile: { type: 'file', filename: 'trace.log', maxLogSize: 104857600, numBackups:9, layout:{type: 'colored'} },
        },
        categories: categories
    });
}

log4js.init = init;
//debug(log4js)

function update(show, level){
    const logLevel = level || log4js.getLogger().level;
    debug('check show',show);
    debug('check logLevel',logLevel);
    debug('check log4js.categories',log4js.categories);
    if(show !== undefined){
        if(show === '*'){
            for(let elem of Object.keys(log4js.categories)){
                debug("elem", elem);
                log4js.categories[elem].appenders = [logLevel,'traceFile'];
            }
        }else{
            debug('sync the newest status');
            for(let elem of Object.keys(log4js.categories)){
                debug("elem", elem, "log4js.getLogger(elem).level.levelStr",log4js.getLogger(elem).level.levelStr.toLowerCase());
                log4js.categories[elem].appenders = [log4js.getLogger(elem).level.levelStr.toLowerCase(),'traceFile'];
            }
            const debugArray = show.split(',')
            debug('check debugArray',debugArray);
            for (let elem of debugArray){
                if(log4js.categories[elem]){
                    log4js.categories[elem]['appenders'] = [logLevel,'traceFile'];
                }else{
                    log4js.categories[elem] = {appenders: [logLevel,'traceFile'], level: 'trace' }
                }
            }
        }
    }
    debug('check set categories', log4js.categories);
    // avoid MaxListenersExceededWarning: Possible Event Emitter memory leak detected
    // https://github.com/log4js-node/log4js-node/blob/d1644210ae776a5fd944122d9d35d169d6a451f8/docs/migration-guide.md#config-reloading
    // https://github.com/log4js-node/log4js-node/blob/dcdf2ad1cc3db47713c3a98a26819a99db8a7344/test/tap/multiprocess-shutdown-test.js
    return log4js.shutdown( () => log4js.configure({
        appenders: {
            out: { type: 'stdout' },
            trace: { type: 'logLevelFilter', level:'trace' , appender: "out" },
            debug: { type: 'logLevelFilter', level:'debug' , appender: "out" },
            info: { type: 'logLevelFilter', level:'info' , appender: "out" },
            warn: { type: 'logLevelFilter', level:'warn' , appender: "out" },
            error: { type: 'logLevelFilter', level:'error' , appender: "out" },
            fatal: { type: 'logLevelFilter', level:'fatal' , appender: "out" },
            off: { type: 'logLevelFilter', level:'off' , appender: "out" },
            traceFile: { type: 'file', filename: 'trace.log', maxLogSize: 104857600, numBackups:9, layout:{type: 'colored'} },
        },
        categories: JSON.parse(JSON.stringify(log4js.categories))
    })
    );
}
log4js.update = update

module.exports = log4js;
