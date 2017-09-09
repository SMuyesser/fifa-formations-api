 const chai = require('chai');
 const chaiHttp = require('chai-http');

 const {app, runServer, closeServer} = require('../server');
 const {DATABASE_URL} = require('../config');
 const should = chai.should();
 chai.use(chaiHttp);

 describe('API', function() {
 	before(function() {
 		runServer(DATABASE_URL);
 	});

 	after(function() {
 		closeServer();
 	});

   it('should have status 200 on GET requests', function() {
     return chai.request(app)
       .get('/4-1-2-1-2')
       .then(function(res) {
         res.should.have.status(200);
         res.should.be.json;
       });
   });

 });