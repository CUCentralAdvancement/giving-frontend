const { Pool } = require('pg');
const isProduction = process.env.NODE_ENV === 'production';

// Use a symbol to store a global instance of a connection, and to access it from the singleton.
const DB_KEY = Symbol.for('MyApp.db');
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasDb = globalSymbols.indexOf(DB_KEY) > -1;
const connectionString = process.env.DATABASE_URL;

if (!hasDb) {
  const pool = new Pool({ connectionString: connectionString, ssl: isProduction });

  global[DB_KEY] = {
    async query(text, params) {
      const start = Date.now();
      const res = await pool.query(text, params);
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res.rowCount });
      return res;
    },
    async getClient() {
      const client = await pool.connect();
      const query = client.query;
      const release = client.release;
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!');
        console.error(`The last executed query on this client was: ${client.lastQuery}`);
      }, 5000);
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args;
        return query.apply(client, args);
      };
      client.release = () => {
        // clear our timeout
        clearTimeout(timeout);
        // set the methods back to their old un-monkey-patched version
        client.query = query;
        client.release = release;
        return release.apply(client);
      };
      return client;
    },
  };
}

// Create and freeze the singleton object so that it has an instance property.
const singleton = {};
Object.defineProperty(singleton, 'instance', {
  get: function () {
    return global[DB_KEY];
  },
});

Object.freeze(singleton);
module.exports = singleton;
