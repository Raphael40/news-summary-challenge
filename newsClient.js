const apiKey = require('./apiKey');

class NewsClient {

  fetchNewsData(query) {
    return fetch(`http://content.guardianapis.com/search?order-by=newest&show-fields=bodyText&q=${query}&api-key=${apiKey}`)
    .then((response) => response.json())
    .then((newsData) => { 
      return newsData
    })
  }
}

// ad this to url after newest for article content show-fields=bodyText&

module.exports = NewsClient;