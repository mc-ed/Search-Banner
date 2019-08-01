const es = require('elasticsearch');
const { NODE_ENV } = require('../../config');

const host = NODE_ENV === 'production' ? 'es:9200' : `localhost:9200`;

const esClient = new es.Client({ host });

module.exports = esClient;

/* SEEDING FUNCTIONALITY */
