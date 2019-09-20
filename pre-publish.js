// vue3-koa-publish.js
// npm script in package.json
// "pre-publish": "npm run build && node ./pre-publish.js"
const Koa = require('koa');
const zlib = require('zlib');
const cors = require('@koa/cors');
const serve = require('koa-static');
const send = require('koa-send');
const compress = require('koa-compress')
const app = new Koa();
const port = 5010;
app.use(serve('dist'));
app.use(cors());
app.use(compress());
app.use(async (ctx, next) => {
  ctx.compress = true;
  await send(ctx, './dist/index.html');
});
app.listen(port);

console.log(`Server runs on port ${port} :)`)