const NewsModel = require('./newsModel')
// const NewsClient = require('./newsClient')

require("jest-fetch-mock").enableMocks();

describe ('Model class with data from client', () => {

  beforeEach(() => {
    fetch.resetMocks();
  });

  // old test that used the actual api
  // it ('fetches the news politics data', async () => {
  //   const client = new NewsClient
  //   const news = new NewsModel(client)

  //   await news.load('politics')
  //   result = news.getNewsData()
  //   expect(result['response']['results'][0]['sectionId']).toBe('politics')
  // })

  it ('fetches the mocked news politics data', async () => {
    const mockNewsClient = {
      fetchNewsData: jest.fn(), // This is a jest mock function
    };

    const mockResponse = {
      response: {
        orderBy: "newest",
      }
    }

    mockNewsClient.fetchNewsData.mockResolvedValueOnce(mockResponse);

    const news = new NewsModel(mockNewsClient);

    await news.load('politics')
    expect(mockNewsClient.fetchNewsData).toHaveBeenCalledWith('politics');

    const newsData = news.getNewsData();
    expect(newsData.response.orderBy).toEqual("newest");
    expect(newsData.response).toHaveProperty("orderBy", "newest");
  })
})