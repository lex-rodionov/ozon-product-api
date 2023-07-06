import pg from 'pg';

import config from '../config/index.js';
import ozonService from '../app/ozon/ozon.service.js';

const INIT_DB = `
DROP TABLE IF EXISTS products;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (
  id uuid DEFAULT uuid_generate_v4(),
  ozon_id INTEGER DEFAULT NULL,
  offer_id VARCHAR(50) DEFAULT NULL,
  name VARCHAR(50) DEFAULT NULL,
  category_id INTEGER DEFAULT NULL,
  price VARCHAR(50) DEFAULT NULL,
  is_pulled_out BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);
`;
const LOAD_PRODUCTS = `INSERT INTO products (ozon_id, offer_id) VALUES `;

(async function initDB() {
  const client = new pg.Client(config.database);
  await client.connect();

  try {
    await client.query(INIT_DB);

    const products = await ozonService.fetchProductList();

    if (products && products.length > 0) {
      const productsToInsert = products.reduce((result, product, index) => {
        const query = `${result} (${product.product_id}, '${product.offer_id}')`;

        if (index === products.length - 1) {
          return query + ';';
        }

        return query + ',';
      }, '');

      await client.query(LOAD_PRODUCTS + productsToInsert);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
})();