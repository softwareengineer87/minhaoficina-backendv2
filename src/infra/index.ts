
import { Elysia } from 'elysia';
// import createSql from '../database/create.sql';
import { PgPromiseAdapter } from './database/PgPromiseAdapter';
import jwt from '@elysiajs/jwt';
import { BusinessController } from '../adapters/business/BusinessController';

const app = new Elysia();
app.use(
  jwt({
    name: 'token-business',
    secret: 'webdesign'
  })
)
const connection = new PgPromiseAdapter();
connection.executeScript('./database/create.sql');
//connection.query(createSql, []).catch(console.error);

//app.post('/business', async ({ body }) => {

//});
const businessController = new BusinessController(app, connection);
businessController.save();

app.listen(3333, () => {
  console.log(`Server running at ${app.server?.url}`)
});

