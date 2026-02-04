
import { Elysia } from 'elysia';
import cors from '@elysiajs/cors';
// import createSql from '../database/create.sql';
import { PgPromiseAdapter } from './database/PgPromiseAdapter';
import { BusinessController } from '../adapters/business/BusinessController';
import { BusinessRepositoryDatabase } from './repository/business/BusinessRepository';
import { NoteController } from '../adapters/note/NoteController';
import { NoteRepositoryDatabase } from './repository/note/NoteRepository';
import { CustomerRepositoryDatabase } from './repository/customer/CustomerRepository';

const app = new Elysia();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
const connection = new PgPromiseAdapter();
connection.executeScript('./database/create.sql');
//connection.query(createSql, []).catch(console.error);
const businessRepository = new BusinessRepositoryDatabase(connection);
const noteRepository = new NoteRepositoryDatabase(connection);
const customerRepository = new CustomerRepositoryDatabase(connection);
const businessController = new BusinessController(app, businessRepository);
const noteController = new NoteController(app, noteRepository, customerRepository);
businessController.save();
businessController.signIn();
noteController.save();

const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
  console.log(`Server running at ${app.server?.url}`)
});

