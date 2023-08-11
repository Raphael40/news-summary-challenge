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

  // Filters what is displayed on the page
  displayNews(query) {
    const existingNews = document.querySelectorAll('.article')
    existingNews.forEach((article) => {article.remove()})

    const createArticleElement = (article) => {
      const div = document.createElement('div');
      div.classList.add('article');
      
      const link = document.createElement('a')
      link.href = article.webUrl
      div.appendChild(link)
      
      const h2 = document.createElement('h2');
      h2.textContent = article.webTitle;
      h2.classList.add('webTitle');
      link.appendChild(h2);
  
      const img = document.createElement('img');
      img.src = article.fields.thumbnail;
      div.appendChild(img);

      const p = document.createElement('p');
      p.textContent = article.fields.bodyText;
      div.appendChild(p);
  
      return div;
    };
  
  // Updates page content when submit button is clicked with a value
  const updateNewsDisplay = (model) => {
    const newsData = model.getNewsData();
    const mainContainerElement = document.getElementById('main-container');
    const newsInput = document.querySelector('#news-input');

    newsData.response.results.forEach((article) => {
        const articleElement = createArticleElement(article);
        mainContainerElement.appendChild(articleElement);
    });

    newsInput.value = '';
  };
  
  // Usage
  this.model.load(query)
    .then(() => {
        updateNewsDisplay(this.model);
    });


  }
}

module.exports = NewsView