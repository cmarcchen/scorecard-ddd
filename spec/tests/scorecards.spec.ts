import supertest, { SuperTest, Test, Response } from 'supertest';

import app from '@src/server';

import ScorecardRepo from '@src/repos/ScorecardRepo';
import Scorecard from '@src/models/Scorecard';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import FullPaths from '@src/routes/constants/FullPaths';

import login from '../support/login';
import { TReqBody } from 'spec/support/types';

// **** Variables **** //

// Paths
const { Get, Post } = FullPaths.Scorecards;

// StatusCodes
const { OK, CREATED } = HttpStatusCodes;

// Dummy scorecards for GET req
const DummyGetAllScorecards = [
  Scorecard.new('peopleHub'),
  Scorecard.new('scorecardPod'),
  Scorecard.new('dotCom'),
] as const;

// Dummy update scorecard
const DummyScorecardData = {
  scorecard: Scorecard.new('MMM'),
} as const;

// **** Tests **** //

describe('ScorecardRouter', () => {
  let agent: SuperTest<Test>, jwtCookie: string;

  // Run before all tests
  beforeAll((done) => {
    agent = supertest.agent(app);
    login(agent, (cookie: string) => {
      jwtCookie = cookie;
      done();
    });
  });

  // ** Get all scorecards ** //
  describe(`"GET:${Get}"`, () => {
    const callApi = () => agent.get(Get).set('Cookie', jwtCookie);

    // Success
    it(
      'should return a JSON object with all the scorecards and a status code ' +
        `of "${OK}" if the request was successful.`,
      (done) => {
        // Add spy
        spyOn(ScorecardRepo, 'getAll').and.resolveTo([
          ...DummyGetAllScorecards,
        ]);
        // Call API
        callApi().end((_: Error, res: Response) => {
          expect(res.status).toBe(OK);
          for (let i = 0; i < res.body.scorecards.length; i++) {
            expect(res.body.scorecards[i]).toEqual(DummyGetAllScorecards[i]);
          }
          done();
        });
      },
    );
  });

  // Test add scorecard
  describe(`"POST:${Post}"`, () => {
    const callApi = (reqBody: TReqBody) =>
      agent.post(Post).set('Cookie', jwtCookie).type('form').send(reqBody);

    // Test add scorecard success
    it(
      `should return a status code of "${CREATED}" if the request was ` +
        'successful.',
      (done) => {
        // Spy
        spyOn(ScorecardRepo, 'add').and.resolveTo();
        // Call api
        callApi(DummyScorecardData).end((_: Error, res: Response) => {
          expect(res.status).toBe(CREATED);
          expect(res.body.error).toBeUndefined();
          expect(res.body.message).toBe('Scorecard created');
          done();
        });
      },
    );

    // // Missing param
    // it(
    // 	'should return a JSON object with an error message of ' +
    // 		`"${ValidatorErr}" and a status code of "${BAD_REQUEST}" if the scorecard ` +
    // 		'param was missing.',
    // 	(done) => {
    // 		// Call api
    // 		callApi({}).end((_: Error, res: Response) => {
    // 			expect(res.status).toBe(BAD_REQUEST);
    // 			expect(res.body.error).toBe(ValidatorErr);
    // 			done();
    // 		});
    // 	}
    // );
  });

  // // ** Update scorecards ** //
  // describe(`"PUT:${Update}"`, () => {
  // 	const callApi = (reqBody: TReqBody) =>
  // 		agent.put(Update).set('Cookie', jwtCookie).type('form').send(reqBody);

  // 	// Success
  // 	it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
  // 		// Setup spies
  // 		spyOn(ScorecardRepo, 'update').and.resolveTo();
  // 		spyOn(ScorecardRepo, 'persists').and.resolveTo(true);
  // 		// Call api
  // 		callApi(DummyScorecardData).end((_: Error, res: Response) => {
  // 			expect(res.status).toBe(OK);
  // 			expect(res.body.error).toBeUndefined();
  // 			done();
  // 		});
  // 	});

  // 	// Param missing
  // 	it(
  // 		'should return a JSON object with an error message of ' +
  // 			`"${ValidatorErr}" and a status code of "${BAD_REQUEST}" if the scorecard ` +
  // 			'param was missing.',
  // 		(done) => {
  // 			// Call api
  // 			callApi({}).end((_: Error, res: Response) => {
  // 				expect(res.status).toBe(BAD_REQUEST);
  // 				expect(res.body.error).toBe(ValidatorErr);
  // 				done();
  // 			});
  // 		}
  // 	);

  // 	// Scorecard not found
  // 	it(
  // 		'should return a JSON object with the error message of ' +
  // 			`"${SCORECARD_NOT_FOUND_ERR}" and a status code of "${NOT_FOUND}" if the id ` +
  // 			'was not found.',
  // 		(done) => {
  // 			// Call api
  // 			callApi(DummyScorecardData).end((_: Error, res: Response) => {
  // 				expect(res.status).toBe(NOT_FOUND);
  // 				expect(res.body.error).toBe(SCORECARD_NOT_FOUND_ERR);
  // 				done();
  // 			});
  // 		}
  // 	);
  // });

  // // ** Delete scorecard ** //
  // describe(`"DELETE:${Delete}"`, () => {
  // 	const callApi = (id: number) =>
  // 		agent.delete(insertUrlParams(Delete, { id })).set('Cookie', jwtCookie);

  // 	// Success
  // 	it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
  // 		// Setup spies
  // 		spyOn(ScorecardRepo, 'delete').and.resolveTo();
  // 		spyOn(ScorecardRepo, 'persists').and.resolveTo(true);
  // 		// Call api
  // 		callApi(5).end((_: Error, res: Response) => {
  // 			expect(res.status).toBe(OK);
  // 			expect(res.body.error).toBeUndefined();
  // 			done();
  // 		});
  // 	});

  // 	// Scorecard not found
  // 	it(
  // 		'should return a JSON object with the error message of ' +
  // 			`"${SCORECARD_NOT_FOUND_ERR}" and a status code of "${NOT_FOUND}" if the id ` +
  // 			'was not found.',
  // 		(done) => {
  // 			callApi(-1).end((_: Error, res: Response) => {
  // 				expect(res.status).toBe(NOT_FOUND);
  // 				expect(res.body.error).toBe(SCORECARD_NOT_FOUND_ERR);
  // 				done();
  // 			});
  // 		}
  // 	);

  // 	// Invalid param
  // 	it(
  // 		`should return a status code of "${BAD_REQUEST}" and return an error ` +
  // 			`message of "${ValidatorErr}" if the id was not a valid number`,
  // 		(done) => {
  // 			callApi('horse' as unknown as number).end((_: Error, res: Response) => {
  // 				expect(res.status).toBe(BAD_REQUEST);
  // 				expect(res.body.error).toBe(ValidatorErr);
  // 				done();
  // 			});
  // 		}
  // 	);
  // });
});
