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
import teams from '../database/models/teams';
import matches from '../database/models/matches';

const mockUser = ({
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
});

const mockInvalidLogin = ({
email: 'teste@testecom',
password:'$2a$',})


describe('/login', () => {

  describe('Verifica que é possível fazer login com email e senha corretos', () => {
    it('Verifica se o login é efetuado com sucesso', async () => {
      const response = await (chai.request(app).post('/login')).send(
        {
      email: 'admin@admin.com',
      password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    });
      expect(response.status).to.be.equal(200);
    })
  });
});

  describe('Verifica que não é possível fazer login com email ou senha incorretos', () => {
    it('Retorna mensagem de erro se uma senha ou email incorreto for inserido nos campos para login', async () => {
      const response = await (chai.request(app).post('/login')).send( mockInvalidLogin);
      expect(response.status).to.be.equal(401);
      expect (response.body).to.deep.equal({
        "message": "Incorrect email or password"
      })
    });
  });

  describe('Verifica que não é possível fazer login com um campo não preenchido', () => {
    it('Não efetua login se o campo "email" não for preenchido', async () => {
      const response = await (chai.request(app).post('/login')).send({email: '', password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'});
      expect(response.status).to.be.equal(400);
      expect (response.body).to.deep.equal({
        "message": "All fields must be filled"
      })
    });
  });

  describe('Verifica que não é possível fazer login com um campo não preenchido', () => {
    it('Não efetua login se o campo "senha" não for preenchido', async () => {
      const response = await (chai.request(app).post('/login')).send({email: 'admin@admin.com' , password:''});
      expect(response.status).to.be.equal(400);
      expect (response.body).to.deep.equal({
        "message": "All fields must be filled"
      })
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2NTM4MDkwNiwiZXhwIjoxNjY1OTg1NzA2fQ.u0Cvnghsh7d56wFlcGZQWcCxQ3Z3BXtiPfgcMwL1kRg'
    const response = await chai
    .request(app).get('/login/validate')
       .set('authorization', token)
       expect(response.status).to.be.equal(200);
       expect(response.body).to.deep.equal({role: 'admin'});
  });
})

describe('/teams', () => {
  before(async () => {
    sinon
      .stub(teams, "findOne")
      .resolves({ } as teams);
  });

  after(()=>{
    (teams.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se o endpoint /teams retorna todos os times', async () => {
    const response = await chai
    .request(app).get('/teams')
      expect(response.status).to.be.equal(200);
  });
});

describe('teams/:id ', () => {
  it('Verifica se o endpoint /teams/:id retorna o time com o id informado', async () => {
   const response = await chai
   .request(app).get('/teams/1');
     expect(response.status).to.be.equal(200);
  });

});

describe('/matches', () => {
  before(async () => {
    sinon
      .stub(matches, "findOne")
      .resolves({ } as matches);
    });

  after(()=>{
    (matches.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se a rota "/matches" retorna status "200" ', async () => {
    const response = await chai
    .request(app).get('/matches')
       expect(response.status).to.be.equal(200);

  });

});

describe('/leaderboard', () => {
  before(async () => {
    sinon
      .stub(matches, "findOne")
      .resolves({ } as any);
    });

  after(()=>{
    (matches.findOne as sinon.SinonStub).restore();
  })

  it('Verifica se a rota /leaderboard/home retorna status "200"', async () => {
    const response = await chai.request(app).get('/leaderboard/home').send();
    expect(response.status).to.be.equal(200);

  });

  it('Verifica se a rota /leaderboard/away retorna status "200"', async () => {
    const response = await chai.request(app).get('/leaderboard/away').send();
    expect(response.status).to.be.equal(200);
  });
});












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

