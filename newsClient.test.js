const NewsClient = require('./newsClient')

require("jest-fetch-mock").enableMocks();

describe ('Client class', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("calls fetch and loads data by newest", async () => {
    const client = new NewsClient();
  
    const mockResponse = {
      response: {
        orderBy: "newest",
        results: [{
          sectionId: 'random'
        }]
      }
    };    
  
    fetch.mockResponse(JSON.stringify(mockResponse));
  
    const returnedDataFromApi = await client.fetchNewsData();
    expect(returnedDataFromApi.response).toHaveProperty('orderBy', 'newest');
    expect(returnedDataFromApi.response.results[0]).toHaveProperty('sectionId', 'random');
  });

  it("calls fetch and loads data for politics by newest", async () => {
    const client = new NewsClient();
  
    const mockResponse = {
      response: {
        orderBy: "newest",
        results: [{
          sectionId: 'politics'
        }]
      }
    };    
  
    fetch.mockResponse(JSON.stringify(mockResponse));
  
    const returnedDataFromApi = await client.fetchNewsData('politics');
    expect(returnedDataFromApi.response).toHaveProperty('orderBy', 'newest');
    expect(returnedDataFromApi.response.results[0]).toHaveProperty('sectionId', 'politics');
  });
})
