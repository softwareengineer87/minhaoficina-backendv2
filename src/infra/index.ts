
import { Elysia } from 'elysia';
import cors from '@elysiajs/cors';
// import createSql from '../database/create.sql';
import { PgPromiseAdapter } from './database/PgPromiseAdapter';
import { BusinessController } from '../adapters/business/BusinessController';
import { BusinessRepositoryDatabase } from './repository/business/BusinessRepository';
import { NoteController } from '../adapters/note/NoteController';
import { NoteRepositoryDatabase } from './repository/note/NoteRepository';
import { CustomerRepositoryDatabase } from './repository/customer/CustomerRepository';
import { cookie } from '@elysiajs/cookie';
const app = new Elysia()

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(cookie());

const connection = new PgPromiseAdapter();
connection.executeScript('./database/create.sql');
//connection.query(createSql, []).catch(console.error);

const businessRepository = new BusinessRepositoryDatabase(connection);
const noteRepository = new NoteRepositoryDatabase(connection);
const customerRepository = new CustomerRepositoryDatabase(connection);
const noteController = new NoteController(app, noteRepository, customerRepository, connection);
const businessController = new BusinessController(app, businessRepository);
businessController.save();
businessController.signIn();
businessController.makeLogo();
businessController.update();
businessController.getById();
businessController.getLogo();
noteController.save();
// noteController.allNotes(connection);
app.group('/dashboard', (app) => app
  .onBeforeHandle(({ headers, set }) => {
    const authTokenName = headers.cookie ? headers.cookie.split('=')[0] : null;
    const authToken = headers.cookie ? headers.cookie.split('=')[1] : null;
    if (authTokenName !== 'minhaoficina-token') {
      set.status = 401;
      return {
        message: 'Sessao expirada'
      }
    }
    if (!authToken) {
      set.status = 401;
      return {
        message: 'Sessao expirada'
      }
    }
  })
  .get('/profile', () => 'profile')
  .get('/config', () => 'config')
  .get('/notes/:business_id', ({ query, params, set }) => noteController.getNotes(query, params, set))
)

const PORT = Number(process.env.PORT);
app.listen(3333, () => {
  console.log(`Server running at ${app.server?.url}`)
});

