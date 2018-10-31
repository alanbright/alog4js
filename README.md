[npm-url]: https://npmjs.org/package/alog4js

# alog4js

This is a wrappers of the [log4js-node](https://github.com/log4js-node/log4js-node),
and we only add an init function for layout setting.

The init function parameter is an Array of domain list, 
and the domain list only need to set the top level

We can use its sublevel without further setting, thanks for Gareth Jones(log4js-node)

## prerequisite
[nodejs 10.12.0] (https://nodejs.org/dist/v10.12.0/) or bigger.

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

RUN with argument
```bash
LEVEL=info SHOW=* node main.js
```

## Example

* Default run with level=info, SHOW=*
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
