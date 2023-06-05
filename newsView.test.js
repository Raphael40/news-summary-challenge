/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const NewsModel = require('./newsModel')
const NewsClient = require('./newsClient')
const NewsView = require('./newsView')

require('jest-fetch-mock').enableMocks()

describe ('NewsView', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it ('gets the news items from the model', async () => {
    const mockNewsClient = {
      fetchNewsData: jest.fn(), // This is a jest mock function
    };

    const mockResponse = {
      response: {
        orderBy: "newest",
        results: [{
          sectionId: 'politics',
          webTitle: 'Title',
          fields: {
            bodyText: 'text'
          }
        }]
      }
    };    
    
    mockNewsClient.fetchNewsData.mockResolvedValue(mockResponse);
    
    const newsModel = new NewsModel(mockNewsClient);
    const newsView = new NewsView(newsModel, mockNewsClient);

    const button = document.querySelector('#submit-button');
    const input = document.querySelector('#news-input');
    input.value = 'politics';
    button.click()
    
    await newsView.displayNews()

    const newsData = newsModel.getNewsData();
    expect(newsData.response.orderBy).toEqual("newest");
    expect(newsData.response.results).toHaveLength(1);
    expect(newsData.response.results[0].sectionId).toEqual("politics");
    expect(newsData.response.results[0].fields.bodyText).toEqual("text");

    await new Promise((resolve) => setTimeout(resolve, 100));

    const articles = document.querySelectorAll('.article');
    expect(articles.length).toBe(2);

    const h2 = document.querySelector('.webTitle');
    expect(h2.textContent).toEqual("Title");
  })
})