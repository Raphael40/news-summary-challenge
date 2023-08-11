const apiKey = require('./apiKey');

class NewsClient {

  async fetchNewsData(query) {
    let response = await fetch(`http://content.guardianapis.com/search?order-by=newest&show-fields=bodyText,thumbnail&q=${query}&api-key=${apiKey}`)
    const newsData = await response.json()
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log(newsData)
    return newsData
  }
}

// ad this to url after newest for article content show-fields=bodyText&

module.exports = NewsClient;