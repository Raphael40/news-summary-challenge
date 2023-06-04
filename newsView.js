class NewsView {
  constructor(model, client) {
    this.model = model
    this.client = client

    this.mainContainerElement = document.querySelector('#main-container');
  }

  displayNews() {
    // const existingNews = document.querySelectorAll('.news')
    // existingNews.forEach((article) => {article.remove()})

    this.model.load().then(() => {
      const newsData = this.model.getNewsData()

      console.log(this.model.getNewsData().response.results)

      newsData.response.results.forEach((article) => {
        let div = document.createElement('div')
        let h2 = document.createElement('h2')
        // add test for getting bodytext to client test
        h2.textContent = article.webTitle
        div.textContent = article.fields.bodyText
        h2.classList.add('webTitle')
        div.classList.add('article')
        div.insertBefore(h2, div.firstChild);
        this.mainContainerElement.append(div)
      })
    })


  }
}

module.exports = NewsView