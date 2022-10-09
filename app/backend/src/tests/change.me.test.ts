import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import users from '../database/models/users';

const mockUser = ({
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
});

const mockLogin = ({
email: 'teste@teste.com',
password:'$2a$08$xi.Hxk1czAO0nZRB393u10aED0RQ1N3PA',})

describe('/login', () => {

  describe('Verifica que não é possível fazer login com email ou senha incorretos', () => {
    it('Verifica rota /login', async () => {
      const response = await (chai.request(app).post('/login')).send( mockLogin);
      expect(response.status).to.be.equal(401);
      expect (response.body).to.deep.equal({
        "message": "Incorrect email or password"
      })
    });
  });

  describe('Verifica que não é possível fazer login com um campo não preenchido', () => {
    it('Não efetua login sem campo email preenchido', async () => {
      const response = await (chai.request(app).post('/login')).send({email: '', password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'});
      expect(response.status).to.be.equal(400);
      expect (response.body).to.deep.equal({
        "message": "All fields must be filled"
      })
    });
  });

  describe('Verifica que não é possível fazer login com um campo não preenchido', () => {
    it('Não efetua login sem campo senha preenchida', async () => {
      const response = await (chai.request(app).post('/login')).send({email: 'admin@admin.com' , password:''});
      expect(response.status).to.be.equal(400);
      expect (response.body).to.deep.equal({
        "message": "All fields must be filled"
      })
    });
  });

});

describe('/login/validate', () => {

  before(async () => {
    sinon
      .stub(users, "findOne")
      .resolves(mockUser as users);
    });

  after(()=>{
    (users.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se o objeto retornado contém a informação role:user', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NTI5Mjk2NywiZXhwIjoxNjY1Mzc5MzY3fQ.O1HB_t_0g2xVGFiNvB4AUOTKsBXBwTNvvSNJ6poYzA4'
    const response = await chai
    .request(app).get('/login/validate')
       .set('authorization', token)
       expect(response.status).to.be.equal(200);
       expect(response.body).to.deep.equal({role: 'admin'});
        });
      })

      /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });

