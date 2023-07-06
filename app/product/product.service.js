import db from '../../database/index.js';
import ozonService from '../ozon/ozon.service.js';

export default {
  async create(data) {
    const query = `
      INSERT INTO products (ozon_id, offer_id, name, category_id, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [data.ozon_id, data.offer_id, data.name, data.category_id, data.price];

    const resp = await db.query(query, values);
    return resp.rows[0];
  },
  async fetchAll() {  
    const query = 'SELECT * FROM products';

    const resp = await db.query(query);
    return resp.rows;
  },
  async getOne(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const values = [id];

    const resp = await db.query(query, values);
    const product = resp.rows[0];

    if (!product) throw new Error('Product not found');

    if (product.is_pulled_out) {
      return product;
    }

    const ozonProduct = await ozonService.getProduct(product.ozon_id);
    return this.update(id, { ...ozonProduct, is_pulled_out: true })
  },
  async update(id, data) {
    const keys = Object.keys(data);
    if (keys.length < 1) throw Error('Nothing to update.');
  
    const values = [id];
    const queryColumns = keys.reduce((result, key, index) => {
      values.push(data[key]);
  
      const orderNumber = index + 2;
      result += `${key} = $${orderNumber}`;
  
      if (keys.length - 1 !== index) {
        return result += ', ';
      }
  
      return result;
    }, '');

    const query = `
      UPDATE products
      SET ${queryColumns}
      WHERE id = $1
      RETURNING *
    `;
  
    const resp = await db.query(query, values);
    if (resp.rowCount < 1) throw Error('Not Found');
  
    return resp.rows[0];
  },
  async delete(id) {
    const query = `
      DELETE FROM products
      WHERE id = $1
    `;
    const values = [id];

    const resp = await db.query(query, values);
    return resp.rowCount;
  }
}