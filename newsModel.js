const NewsClient = require("./newsClient");

class NewsModel {
  constructor(client) {
    this.client = client;
    this.news = null;
  }

  async load(query) {
    let data = await this.client.fetchNewsData(query)
    
    this.news = data
    console.log(this.news)
    return this.news
  }

  getNewsData() {
    return this.news;
  }
}

module.exports = NewsModel;