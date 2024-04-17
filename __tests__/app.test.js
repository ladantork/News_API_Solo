const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js')
const seed = require ('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')
const endpointsData = require('../endpoints.json')


beforeEach(() => seed (data))
afterAll(() => db.end());


describe('/api/topics', () => {
    it('GET:200 sends an array of topics ', async() => {
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
    describe('/api/', () => {
        it("200 respond with /api  json data", () => {
         return request(app)
         .get('/api')
         .expect(200)
         .then((response)=>{
            expect(response.body.endpoints).toEqual(endpointsData);

         })
        });
    })
   
    describe('GET /api/articles/:article_id', () => {
      it('responds with the requested article 1', () => {
          return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((response)=>{
          expect(response.body).toHaveProperty('author');
          expect(response.body).toHaveProperty('title');
          expect(response.body).toHaveProperty('article_id');
          expect(response.body).toHaveProperty('body');
          expect(response.body).toHaveProperty('topic');
          expect(response.body).toHaveProperty('created_at');
          expect(response.body).toHaveProperty('votes');
          expect(response.body).toHaveProperty('article_img_url');
      });
          })
       
      });
      it('responds with 404 if article does not exist', () => {
      return request(app)
      .get('/api/articles/9999')
      .expect(404)
      .then((response)=>{
        expect(response.body).toHaveProperty('msg', 'Article not found')
      })
        
    });
    it('responds with 400 if article_id not valid', () => {
      return request(app)
      .get('/api/articles/a5g*')
      .expect(400)
      .then((response)=>{
        expect(response.body).toHaveProperty('error', 'Invalid article ID format')
      })
        
    });
    it('responds with 200 if created_at is a  valid format', () => {
      return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then((response)=>{
        const expectedCreatedAt = "2020-07-09T20:11:00.000Z";
        expect(response.body.created_at).toBe(expectedCreatedAt);
      })
        
    });


    