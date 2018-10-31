const log4js = require('../src/alog4js')
log4js.init(['default','DB','modules'])
const logger = log4js.getLogger();
logger.trace("logger trace demo");
logger.debug("logger debug demo");
logger.info("logger info demo");
logger.warn("logger warn demo");
logger.error("logger error demo");
logger.fatal("logger fatal demo");


const db = require('./database/index.js');
const dbpool = require('./database/pool.js');
const insert = require('./modules/insert');
const update = require('./modules/update');

