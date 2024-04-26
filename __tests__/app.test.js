const request = require('supertest');

const app = require('../app.js');
const db = require('../db/connection.js')
const seed = require ('../db/seeds/seed.js')
const data = require('../db/data/test-data/index.js')
const endpointsData = require('../endpoints.json')


beforeEach(() => seed (data))
afterAll(() => db.end());


describe('GET /api/topics', () => {
    test('GET:200 sends an array of topics ',() => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            expect(Array.isArray(body.topics)).toBe(true);
            const { topics } = body;
            expect(topics.length).toBe(3);
            topics.forEach((topic) => {
                expect(typeof topic.slug).toBe('string');
                expect(typeof topic.description).toBe('string');
    });
})
    })
    test('GET /api/topics returns 404 for requests to non-existent endpoints', () => {
      return request(app)
          .get('/api/nonexistent') // Use a non-existent endpoint
          .expect(404)
          .then(({ body }) => {
              expect(body.msg).toBe('Not found');
          });
  });
    })
    describe('GET /api/', () => {
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
        expect(response.body).toHaveProperty('msg', "Article not found")
      })
        
    });
    it('responds with 400 if article_id not valid', () => {
      return request(app)
      .get('/api/articles/a5g*')
      .expect(400)
      .then((response)=>{
        expect(response.body.msg).toBe('Invalid comment ID format')
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
            if (response.body.articles.length > 0) {
              expect(response.body.articles.length).toBe(13);
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
          // it("Get 200 , returns an array of filtered by topics",()=>{
          //    return request(app)
          //    .get('/api/articles?topic=coding')
          //    .expect(200)
          //    .then((response)=>{
          //     expect(typeof response.body).toBe('object')
          //     const articles = response.body.articles;
          //     console.log(articles)
          //     expect(Array.isArray(articles)).toBe(true); 
          //     articles.forEach(article => {
          //         expect(article).toHaveProperty('topic', 'coding');
          //     })
          //   })
          // })
          // it('200 - Responds with an empty array when topic exists but has no associated articles', () => {
          //   return request(app)
          //     .get('/api/articles?topic=cats')
          //     .expect(200)
          //     .then(({body})=>{
          //       const {articles} = body
          //       articles.forEach(article => {
          //         expect(article).toMatchObject({
          //           topic: "cats",
          //         });
          //       })
          //       expect(Array.isArray(body.articles)).toBe(true);
          //       //expect(body.articles.length).toBe(0);
          //     })
          //     });
        
          //   it('404 - Responds with topic not found when topic does not exist', () => {
          //     return request(app)
          //     .get('/api/articles?topic=bananas')
          //     .expect(404)
          //     .then((response)=>{
          //       expect(response.statusCode).toBe(404);
          //       expect(response.body).toHaveProperty('msg', 'Not found');
          //     })
          // })
          it('GET:404 for non-existent endpoint', () => {
            return request(app)
              .get('/api/artic')
              .expect(404)
              .then((response) => {
                expect(response.body.msg).toBe('Not found');
              });
          });
    })


    // app.test.js

describe('/api/articles', () => {
  it('GET:200 sends an array of articles object ', () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('articles');
        expect(Array.isArray(response.body.articles)).toBe(true);
        // Additional assertions as needed
      });
  });

  it('Get 200 , returns an array of articles filtered by topics', () => {
    return request(app)
      .get('/api/articles?topic=coding')
      .expect(200)
      .then((response) => {
        expect(typeof response.body).toBe('object');
        const articles = response.body.articles;
        expect(Array.isArray(articles)).toBe(true);
        articles.forEach(article => {
          expect(article).toHaveProperty('topic', 'coding');
        });
      });
  });

  it('404 - Responds with topic not found when topic does not exist', () => {
    return request(app)
      .get('/api/articles?topic=bananas')
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('msg', "No articles found for the specified topic");
      });
  });
});

  
      
    describe('GET /api/articles/:article_id/comments', () => {
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
     
        it('returns a 400 when article_id is not a number ', () => {
          return request(app)
              .get('/api/articles/td/comments') 
              .expect(400) 
              .then(({body})=>{
                expect(body.msg).toBe( 'Invalid comment ID format')
              })
      })
      it('Returns 404 empty array if article id as number is not valid ', () => {
        return request(app)
        .get('/api/articles/99999/comments')
        .expect(404)
        .then(({body})=>{
          expect(body.msg).toBe('No comments found for the specified article')
         
        })
    });
      })



      
    describe('POST /api/articles/:article_id/comments', () => {
      const newComment =
         {username: "butter_bridge" ,  
          body : 'My very first post inserted into comment table'}
      it('Add a comment for specific article from it/s id',()=>{ 
        return request(app)
        .post('/api/articles/6/comments')
        .send(newComment)
        .expect(201)
        .then((response)=>{
          expect(response.body).toHaveProperty('author', newComment.username);
          expect(response.body).toHaveProperty('body', newComment.body);
          expect(response.body.comment_id).toBe(19)
          expect(response.body.author).toBe("butter_bridge")
          expect(response.body.body).toBe('My very first post inserted into comment table')
          expect(response.body.votes).toBe(0)
          expect(response.body).toHaveProperty('created_at')
          expect(new Date(response.body.created_at)).toBeInstanceOf(Date);
        })
      })
      it('returns 400 for invalid request body',()=>{
        return request(app)
        .post('/api/articles/lkj/comments')
        .send(newComment)
        .expect(400)
        .then(({body})=>{
          expect(body.msg).toBe('Invalid comment ID format');    
      })
    })
    describe('/api/articles/:article_id/comments', () => {
      it('Returns 404 when no comments found ', () => {
          return request(app)
          .post('/api/articles/6/commen')
          .send(newComment)
          .expect(404)
          .then((response)=>{
            expect(response.body.msg).toBe('Not found' )
          })
      });
  
  }) 
  describe('PATCH /api/articles/:article_id', () => {
    const updateArticleVote ={ inc_votes : 10}
    it('returns updated article by article_id',()=>{  
      return request(app)
            .patch('/api/articles/1')
            .send(updateArticleVote)
            .expect(200)
            .then(({ body: {article_id,title, topic,author,body, created_at, votes, article_img_url}}) => {
              expect(votes).toBe(110)
              expect(article_id).toBe(1)
              expect(title).toBe('Living in the shadow of a great man')
              expect(topic).toBe('mitch')
              expect(author).toBe('butter_bridge')
              expect(body).toBe('I find this existence challenging')
              expect(created_at).toBe('2020-07-09T20:11:00.000Z')
              expect(article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700')
          })
    })
    it('returns 400 for invalid article_id',()=>{
      return request(app)
      .patch('/api/articles/lkj')
      .send(updateArticleVote)
      .expect(400)
      .then(({body})=>{
        expect(body.msg).toBe('Invalid comment ID format');    
    })
    })
      it('Returns 404 when article format is valid but it is not in database ', () => {
          return request(app)
          .post('/api/articles/6101')
          .send(updateArticleVote)
          .expect(404)
          .then(({body})=>{
            expect(body.msg).toBe('Not found' )
          })
      })
})
// api/comments/:comment_id
describe('DELETE /api/comments/:comment_id', () => {
  it('DELETE 204,delete the specific comment according to given comment_id  from database and return 204 status with no content ',()=>{  
    return request(app)
          .delete('/api/comments/1')
          .expect(204)
          
          })
  })
  test("DELETE 400 , Delete requests with an invalid comment_id format return 400 status as a 'Invalid comment ID format'", () => {
    return request(app)
    .delete("/api/comments/ladan")
    .expect(400)
    .then(({body})=>{
      expect(body.msg).toBe('Invalid comment ID format')
    })
  })
   test('DELETE 404, when comment format is valid but it is not in database return 404 status as "Not found" ', () => {
     return request(app)
     .delete('/api/comment/6101')
    .expect(404)
     .then(({body})=>{
       expect(body.msg).toBe('Comment not found' )
     })
 })
})

// api/users

describe('GET /api/users', () => {
    it('GET:200 sends an array of users object ', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('users');
          expect(Array.isArray(response.body.users)).toBe(true);
          expect(response.body.users.length).toBe(4);
          response.body.users.forEach((user) => {
              expect(typeof user.username).toBe('string');
              expect(typeof user.name).toBe('string');
              expect(typeof user.avatar_url).toBe('string');
  });
})

    })
  })
