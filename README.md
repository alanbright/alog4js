[npm-url]: https://npmjs.org/package/alog4js

# alog4js

This is a wrappers of the [log4js-node](https://github.com/log4js-node/log4js-node),
and we only add an init function for layout setting.

The init function parameter is an Array of domain list, 
and the domain list only need to set the top level

We can use its sublevel without further setting, thanks for Gareth Jones(log4js-node)

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

run
```bash
node examples/main.js
```
![Demo1](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo1.png)


```bash
LEVEL=debug SHOW=DB node examples/main.js
```
![Demo2](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo2.png)

```bash
LEVEL=trace SHOW=DB.index node examples/main.js
```
![Demo3](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo3.png)

```bash
LEVEL=error SHOW=default,DB,modules.insert node examples/main.js
```
![Demo4](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo4.png)

```bash
LEVEL=warn SHOW=default,DB.index node examples/main.js
```
![Demo5](https://raw.githubusercontent.com/alanbright/alog4js/master/screenshots/demo5.png)

## License

The original log4js-node was distributed under the Apache 2.0 License, and so is this. I've tried to
keep the original copyright and author credits in place, except in sections that I have rewritten
extensively.
