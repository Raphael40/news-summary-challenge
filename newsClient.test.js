const NewsClient = require('./newsClient')

require("jest-fetch-mock").enableMocks();

describe ('Client class', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls fetch and loads data", (done) => {
    const client = new NewsClient();

    const mockResponse = {
      response: {
        orderBy: "newest",
      }
    };    

    fetch.mockResponse(
      JSON.stringify(mockResponse)
    );

    client.fetchNewsData('politics', (returnedDataFromApi) => {
      expect(returnedDataFromApi.response).toHaveProperty('orderBy', 'newest');

      done();
    });
  });
})
