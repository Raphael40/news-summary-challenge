class NewsView {
  constructor(model, client) {
    this.model = model
    this.client = client
    this.mainContainerElement = document.querySelector('#main-container');
    const submitButtonEl = document.querySelector('#submit-button');
    
    submitButtonEl.addEventListener('click', () => {
      let query = document.querySelector('#news-input')

      this.displayNews(query.value)
    });
  }

  displayNews(query) {
    const existingNews = document.querySelectorAll('.article')
    existingNews.forEach((article) => {article.remove()})

    this.model.load(query).then(() => {
      const newsData = this.model.getNewsData()

      console.log(this.model.getNewsData().response.results)
      console.log(this.model.getNewsData())

      newsData.response.results.forEach((article) => {
        let div = document.createElement('div')
        let h2 = document.createElement('h2')
        let img = document.createElement('img')
        let p = document.createElement('p')
        h2.textContent = article.webTitle
        p.textContent = article.fields.bodyText
        img.src = article.fields.thumbnail
        h2.classList.add('webTitle')
        div.classList.add('article')
        div.insertBefore(h2, div.firstChild);
        div.append(img)
        div.append(p)
        this.mainContainerElement.append(div)
        document.querySelector('#news-input').value = ''
      })
    })


  }
}

module.exports = NewsView