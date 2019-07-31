const es = require('./utilities');

/**
 * Uses type_as_you_go index to search for items by name in Elasticsearch
 *
 * @param {string} term the term to be searched
 * @returns {object} a promise object that resolves to the search results
 */
function typeAsYouGo(term) {
  const index = 'items-test2';
  const query = {
    query: {
      multi_match: {
        query: term,
        type: 'bool_prefix',
        fields: ['itemName', 'itemName._2gram', 'itemName._3gram'],
        fuzziness: 'AUTO'
      }
    }
    // suggest: {
    //   suggestion: {
    //     text: term,
    //     term: {
    //       field: 'itemName'
    //     }
    //   }
    // }
  };

  return es.search(index, query);
}

module.exports = { typeAsYouGo };
