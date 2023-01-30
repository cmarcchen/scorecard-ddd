import supertest, { SuperTest, Test, Response  } from 'supertest';

import app from '@src/server';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import FullPaths from '@src/routes/constants/FullPaths';

import login from '../support/login';

// Paths
const { Get } = FullPaths.HelloWorld;

// StatusCodes
const { OK} = HttpStatusCodes;

// **** Tests **** //

describe('HelloWorldRouter', () => {
  let agent: SuperTest<Test>, jwtCookie: string;

  // Run before all tests
  beforeAll((done) => {
    agent = supertest.agent(app);
    login(agent, (cookie: string) => {
      jwtCookie = cookie;
      done();
    });
  });

  // ** Get hello world ** //
  describe(`"GET:${Get}"`, () => {
    const callApi = () => agent.get(Get).set('Cookie', jwtCookie);

    // Success
    it(
      'should respond HelloWorld ' +
				`of "${OK}" if the request was successful.`,
      (done) => {
        // Call API
        callApi().end((_: Error, res: Response) => {
          expect(res.status).toBe(OK);

          expect(res.body.message).toEqual('Hello World');

          done();
        });
      },
    );
  });
});
