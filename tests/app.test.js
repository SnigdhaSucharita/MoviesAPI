const request = require("supertest");
const http = require("http");
const { getAllMovies } = require("../controllers/index.js");
const { app } = require("../index.js");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn()
}));

let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all movies", () => {
    let mockMovies = [
      {
        'movieId': 1,
        'title': 'Inception',
        'genre': 'Sci-Fi',
        'director': 'Christopher Nolan'
      },
      {
        'movieId': 2,
        'title': 'The Shawshank Redemption',
        'genre': 'Drama',
        'director': 'Frank Darabont'
      },
      {
        'movieId': 3,
        'title': 'The Godfather',
        'genre': 'Crime',
        'director': 'Francis Ford Coppola'
      }
    ];

    getAllMovies.mockReturnValue(mockMovies);
    let result = getAllMovies();
    expect(result).toEqual(mockMovies);
    expect(result.length).toBe(3);   
  });
});

describe("API Endpoint Tests", () => {
  it("GET /movies should get all movies", async () => {
    const res = await request(server).get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movies: [
        {
          'movieId': 1,
          'title': 'Inception',
          'genre': 'Sci-Fi',
          'director': 'Christopher Nolan'
        },
        {
          'movieId': 2,
          'title': 'The Shawshank Redemption',
          'genre': 'Drama',
          'director': 'Frank Darabont'
        },
        {
          'movieId': 3,
          'title': 'The Godfather',
          'genre': 'Crime',
          'director': 'Francis Ford Coppola'
        }
      ]
    });
    expect(res.body.movies.length).toBe(3);
  });

  it("GET /movies/details/:id should get a movie by id", async () => {
    const res = await request(server).get("/movies/details/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
     movie: {
      'movieId': 1,
      'title': 'Inception',
      'genre': 'Sci-Fi',
      'director': 'Christopher Nolan'
     } 
    });
  });
});