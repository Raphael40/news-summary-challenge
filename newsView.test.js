/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NewsModel = require('./newsModel')
const NewsClient = require('./newsClient')
const NewsView = require('./newsView')

describe ('NewsView', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  xit ('gets the news items from the model', () => {
    const newsModel = new NewsModel()
    newsModel.load('politics')

    const newsView = new NewsView(newsModel)
    newsView.displayNews()
    expect(document.querySelectorAll('.news')[0].textContent).toEqual('Politics')
    expect(document.querySelectorAll('.news').length).toEqual(5)
  })
})