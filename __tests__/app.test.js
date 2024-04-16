const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js')
const seed = require ('../db/seeds/seed.js')
const topicData = require('../db/data/development-data/topics.js')
const userData =  require('../db/data/development-data/users.js')
const articleData = require('../db/data/development-data/articles.js')
const commentData = require('../db/data/development-data/comments.js')
beforeEach(async() => await seed ({ topicData, userData, articleData, commentData }))
afterAll(async() => {if (db){await db.end()}});


describe('/api/topics', () => {
    it('GET:200 sends an array of topics ', async () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(3);
            response.body.forEach((topic) => {
                expect(typeof topic.slug).toBe('string');
                expect(typeof topic.description).toBe('string');
    });
})
    })
    test('returns 404 for requests to non-existent endpoints', async() => {
        return request(app)
          .get('/api/top')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('Not found');
          });
          
      });
})
