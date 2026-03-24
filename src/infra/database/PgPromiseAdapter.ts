import pgp from 'pg-promise';
import { join } from 'node:path';

export interface DatabaseConnection {
  query(statement: string, params: any): Promise<any>;
  close(): Promise<void>;
}

class PgPromiseAdapter implements DatabaseConnection {


  protected connection: any

  constructor() {
    const host = process.env.POSTGRES_HOST || 'localhost';
    const user = process.env.POSTGRES_USER || 'postgres';
    const password = process.env.POSTGRES_PASSWORD || 'webdesign';
    const database = process.env.POSTGRES_DB || 'minhaoficina_db';
    const port = process.env.POSTGRES_PORT || '5432';

    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;
    this.connection = pgp()(connectionString);
  }

  async query(statement: string, params: any): Promise<any> {
    return await this.connection.query(statement, params);
  }

  async executeScript(script: string) {
    const pgPromise = pgp();
    const filePath = join(script);
    const query = new pgPromise.QueryFile(filePath);
    return await this.connection.query(query);
  }

  async createDatabase() {
    try {
      const result = await this.connection.query(`SELECT 1 FROM pg_database WHERE datname = 'minhaoficina_db'`, []);
      if (result.length === 0) {
        console.log(`Criando banco de dados: minhaoficina_db...`);
        await this.connection.query('CREATE DATABASE minhaoficina_db', []);
        console.log('Banco de dados criado com sucesso!');
      } else {
        console.log('O banco de dados já existe, pulando criação.');
      }
    } catch (error: any) {
      console.error('Erro ao verificar ou criar o banco de dados:', error);
      process.exit(1);
    }
  }

  async close(): Promise<void> {
    return await this.connection.$pool.end();
  }

}

export { PgPromiseAdapter }

