const es = require('elasticsearch');

const esClient = new es.Client({
  host: 'localhost:9200'
});

module.exports = esClient;

/* SEEDING FUNCTIONALITY */
