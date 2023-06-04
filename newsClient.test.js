const NewsClient = require('./newsClient')

require("jest-fetch-mock").enableMocks();

describe ('Client class', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls fetch and loads data", async () => {
    const client = new NewsClient();
  
    const mockResponse = {
      response: {
        orderBy: "newest",
      }
    };    
  
    fetch.mockResponse(JSON.stringify(mockResponse));
  
    const returnedDataFromApi = await client.fetchNewsData('politics');
    expect(returnedDataFromApi.response).toHaveProperty('orderBy', 'newest');
  });
})
