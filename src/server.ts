import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import {getTopWords} from "./get-top-words";

const app = new Koa();
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Welcome to the RSS word counter start by posting to /top-words with the feed in a "rss" property within a json body';
});

router.post('/top-words', async (ctx) => {
  // We cant be sure this is a string! We should have some schema to parse this with
  let rss: string = ctx.request.body.rss;
  if (rss) {
    console.log(`New request with the following rss link ${rss}`);
    try {
      // This is the important part
      ctx.body = await getTopWords(rss);
    } catch (e) {
      ctx.throw(400, "Bad rss link");
    }

  } else {
    ctx.throw(400, "Rss link is missing");
  }
});

app.use(bodyParser());
app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');
