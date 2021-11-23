const http = require('http');
const path = require('path');
const Koa = require('koa');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const slow = require('koa-slow');
const Router = require('koa-router');
const NewsGenerator = require('./js/NewsGenerator');

const app = new Koa();

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(slow({
  delay: 5000,
}));

const dirPublic = path.join(__dirname, '/public');
app.use(koaStatic(dirPublic));

const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

const newsGenerator = new NewsGenerator();
newsGenerator.generate();

router.get('/news/latest', async (ctx) => {
  const response = {
    status: 'ok',
    data: newsGenerator.news,
  };

  ctx.response.body = JSON.stringify(response);
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
// eslint-disable-next-line no-console
server.listen(port, () => console.log('Server started'));
