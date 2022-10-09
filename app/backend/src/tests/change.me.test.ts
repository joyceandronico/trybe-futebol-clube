import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

//import users from '../database/models/users';

const mockUser = ({

  email: 'test@test.com',
  password:'senha_mock'


});

describe('/login', () => {

  describe('Verifica que não é possível fazer login com email ou senha incorretos', () => {
    it('Verifica rota /login', async () => {
      const response = await (chai.request(app).post('/login')).send(mockUser);
      expect(response.status).to.be.equal(401);
      expect (response.body).to.deep.equal({
        "message": "Incorrect email or password"
      })
    });
  });

  describe('Verifica que não é possível fazer login com um campo não preenchido', () => {
    it('Não efetua login sem campo email preenchido', async () => {
      const response = await (chai.request(app).post('/login')).send({password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'});
      expect(response.status).to.be.equal(401);
      expect (response.body).to.deep.equal({
        "message": "Incorrect email or password"
      })
    });
  });

  describe('Verifica que não é possível fazer login com um campo não preenchido', () => {
    it('Não efetua login sem campo senha preenchida', async () => {
      const response = await (chai.request(app).post('/login')).send({email: 'admin@admin.com' });
      expect(response.status).to.be.equal(400);
      expect (response.body).to.deep.equal({
        "message": "All fields must be filled"
      })
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
});
