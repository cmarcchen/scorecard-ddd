import { Router } from 'express';
import jetValidator from 'jet-validator';

import adminMw from './middleware/adminMw';
import Paths from './constants/Paths';
import User from '@src/models/User';
import AuthRoutes from './AuthRoutes';
import UserRoutes from './UserRoutes';
import HelloWorldRoutes from './HelloWorldRoutes';
import ScorecardRoutes from './ScorecardRoutes';

// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();

// **** Setup **** //

const authRouter = Router();

// Login user
authRouter.post(
  Paths.Auth.Login,
  validate('email', 'password'),
  AuthRoutes.login,
);

// Logout user
authRouter.get(Paths.Auth.Logout, AuthRoutes.logout);

// Add AuthRouter
apiRouter.use(Paths.Auth.Base, authRouter);

// ** Add UserRouter ** //

const userRouter = Router();

// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.instanceOf]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.instanceOf]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Add UserRouter
apiRouter.use(Paths.Users.Base, adminMw, userRouter);

const helloWorldRouter = Router();

helloWorldRouter.get(Paths.HelloWorld.Get, HelloWorldRoutes.get);

apiRouter.use(Paths.HelloWorld.Base, helloWorldRouter);

// ** Add ScorecardRouter ** //

const scorecardRouter = Router();

scorecardRouter.get(Paths.Scorecards.Get, ScorecardRoutes.getAll);

scorecardRouter.post(Paths.Scorecards.Post, ScorecardRoutes.add);

apiRouter.use(Paths.Scorecards.Base, scorecardRouter);

// **** Export default **** //

export default apiRouter;
