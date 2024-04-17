const request = require('supertest');
const app = require('../app.js');
const db = require('../db/connection.js')
const seed = require ('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')
const endpointsData = require('../endpoints.json')


beforeEach(() => seed (data))
afterAll(() => db.end());


describe('/api/topics', () => {
    it('GET:200 sends an array of topics ',() => {
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
  test('returns 404 for requests to non-existent endpoints',() => {
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
          expect(response.body.author).toBe("butter_bridge");
          expect(response.body.title).toBe("Living in the shadow of a great man");
          expect(response.body.article_id).toBe(1);
          expect(response.body.body).toBe("I find this existence challenging");
          expect(response.body.topic).toBe("mitch");
          expect(response.body.created_at).toBe("2020-07-09T20:11:00.000Z");
          expect(response.body.votes).toBe(100);
          expect(response.body.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
      });
          })
        })
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

    describe('/api/articles', () => {
      it('GET:200 sends an array of articles object ', () => {
          return request(app)
          .get('/api/articles')
          .expect(200)
          .then((response) => {
            expect(response.body).toHaveProperty('articles');
            expect(Array.isArray(response.body.articles)).toBe(true);
            expect(response.body.articles.length).toBe(13);
            if (response.body.articles.length > 0) {
              const article = response.body.articles[0];
              expect(article).toHaveProperty('author');
              expect(article).toHaveProperty('title');
              expect(article).toHaveProperty('article_id');
              expect(article).toHaveProperty('topic');
              expect(article).toHaveProperty('created_at');
              expect(article).toHaveProperty('votes');
              expect(article).toHaveProperty('article_img_url');
              expect(article).toHaveProperty('comment_count');
              if (article.comment_count > 0) {
                expect(typeof article.comment_count).toBe('number');
            }else {
              expect(article.comment_count).toBe(0);
          }
              
          }
          })
        })
      })
      describe('GET /api/articles', () => {
        it('Returns 404 if it is a bad request ', () => {
            return request(app)
            .get('/api/$Tg')
            .expect(404)
            .then((response)=>{
              expect(response.statusCode).toBe(404);
              expect(response.body).toHaveProperty('msg', "Not found")
            })
        });
    });
    describe('/api/articles/:article_id/comments', () => {
      it('GET 200 and return comments for the specified article ID', () => {
          return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then((response) => {
            expect(Array.isArray(response.body.comments)).toBe(true);
            expect(response.body.comments.length).toBe(11);
            response.body.comments.forEach(comment => {
            expect(typeof comment).toBe('object')
          if(comment.comment_id === 9){
            expect(comment.body).toBe('Superficially charming');
            expect(comment.article_id).toBe(1);
            expect(comment.author).toBe('icellusedkars');
            expect(comment.votes).toBe(0);
            expect(comment.created_at).toBe("2020-01-01T03:08:00.000Z");
            }
            })
          })
        })
      })
      describe('/api/articles/:article_id/comments', () => {
        it('returns a 400 when article_id is not a number ', () => {
            return request(app)
                .get('/api/articles/td/comments') 
                .expect(400) 
                .then((response)=>{
                  expect(response.body.error).toBe( "Invalid article ID format")
                })
        });
      })
      describe('/api/articles/:article_id/comments', () => {
        it('Returns 404 empty array if article id as number is not valid ', () => {
            return request(app)
            .get('/api/articles/99999/comments')
            .expect(404)
            .then((response)=>{
              expect(response.body.error).toBe("No comments found for this article")
             
            })
        });
    });
  
      