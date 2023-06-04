const NewsModel = require('./newsModel')
const NewsClient = require('./newsClient')
const NewsView = require('./newsView')

const newsClient = new NewsClient();
const newsModel = new NewsModel(newsClient);
const newsView = new NewsView(newsModel, newsClient);

newsView.displayNews()