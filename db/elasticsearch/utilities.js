const esClient = require('./elasticsearch');

/**
 * Creates an index (similar to a database) in Elasticsearch
 *
 * @param {string} indexName representing a new index
 * @returns {promise} resolves to a response or an error
 */
async function createIndex(indexName) {
  return esClient.indices.create({
    index: indexName
  });
}

/**
 * Adds mapping to an index. Definies how Elasticsearch will index the data.
 * Docs can be found here: https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html
 * @param {string} indexName the index to add mapping
 * @param {object} mapping ES mapping object definition
 * @returns {object} promise that resolves to an affirmative if mapping is successful
 */
async function addMappingToIndex(indexName, mapping) {
  return esClient.indices.putMapping({
    index: indexName,
    body: mapping
  });
}

/**
 * Searches ElasticSearch based on passed arguements
 * @param {string} indexName the name of the index to search
 * @param {object} payload the query object
 * @returns {object} a promise that resolves to a ES result object
 */
async function search(indexName, payload) {
  return esClient.search({
    index: indexName,
    body: payload
  });
}

module.exports = { createIndex, addMappingToIndex, search };
