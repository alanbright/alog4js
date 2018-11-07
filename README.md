# alog4js [![Build Status][travis-image]][travis-url] [![NPM Version][npm-image]][npm-url]
[travis-image]: https://travis-ci.org/alanbright/alog4js.svg?branch=master
[travis-url]: https://travis-ci.org/alanbright/alog4js
[npm-image]: https://img.shields.io/npm/v/alog4js.svg
[npm-url]: https://npmjs.org/package/alog4js

This is a wrappers of the [log4js-node](https://github.com/log4js-node/log4js-node),
and we add functions for dynamic layout setting.

The init function parameter is an Array of domain list, 
and the domain list only need to set the top level

We can use its sublevel without further setting, thanks for Gareth Jones(log4js-node)

## prerequisite
[nodejs 10.12.0](https://nodejs.org/dist/v10.12.0/) or bigger.

## installation

```bash
npm install alog4js
```

## usage

Initialize:
```javascript
var log4js = require('alog4js');
log4js.init(['default','Foo_toplevel1','Foo_toplevel2'...])
var logger = log4js.getLogger(); //now you can use the logger with default tag
```

RUN with argument:
```bash
LEVEL=info SHOW=* node main.js
```

Dynamic Layout setting:

Implement your REST API and run these code properly.

And your can update server log layout setting online.

* dynamic change log level
```javascript
logger.level = 'debug'; // ['trace','debug','info','warn','error','fatal']
```

* dynamic change specific log domain with log level
```javascript
//show is the variable format like Run Argument SHOW, check Example for further information
log4js.update(show, level); // log4js.update("DB.pool", "trace");
```

## Demo

run demo on your machine
[alog4js-demo](https://github.com/alanbright/alog4js-demo)


## Example

* Default run with LEVEL=info, SHOW=*
>```bash
> node examples/main.js
>```
> ![Demo1](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo1.PNG)

* set log level at 'debug', and show log belongs 'DB'.
>```bash
>LEVEL=debug SHOW=DB node examples/main.js
>```
> ![Demo2](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo2.PNG)


* set log level at 'trace', and show log belongs 'DB.index' only.
>```bash
>LEVEL=trace SHOW=DB.index node examples/main.js
>```
>![Demo3](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo3.PNG)


* set log level at 'error', and show log belongs 'default' or 'DB' or 'modules.insert'.
>```bash
>LEVEL=error SHOW=default,DB,modules.insert node examples/main.js
>```
>![Demo4](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo4.PNG)

* set log level at 'warn', and show log belongs 'default' or 'DB.index'.
>```bash
>LEVEL=warn SHOW=default,DB.index node examples/main.js
>```
>![Demo5](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo5.PNG)

## License

The original log4js-node was distributed under the Apache 2.0 License, and so is this. I've tried to
keep the original copyright and author credits in place, except in sections that I have rewritten
extensively.
