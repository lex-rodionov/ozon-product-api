import pg from 'pg';

import config from '../config/index.js';

export default new pg.Pool(config.database);

