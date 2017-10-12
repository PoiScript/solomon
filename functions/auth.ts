import { Router } from 'express';

import { apiRequest, endpoints, handleError, notFound } from './util';

const router = Router();

router.post('/signIn', (req, res) => {
  let user: any;
  apiRequest('verifyPassword', req.body)
    .then(body => {
      user = body;
      return apiRequest('getAccountInfo', {idToken: body.idToken});
    })
    .then(info => {
      res.json({...user, ...info.users.find(i => i.localId === user.localId)});
    })
    .catch(err => handleError(err.error.error, res));
});

router.post('/signUp', (req, res) => {
  let user: any;
  apiRequest('signupNewUser', req.body)
    .then(body => {
      user = body;
      return apiRequest('getAccountInfo', {idToken: body.idToken});
    })
    .then(info => {
      res.json({...user, ...info.users.find(i => i.localId === user.localId)});
    })
    .catch(err => handleError(err.error.error, res));
});

router.post('/:endpoint', (req, res) => {
  const endpoint = endpoints[req.params.endpoint];
  if (endpoint) {
    apiRequest(endpoint, req.body)
      .then(body => {
        res.json(body);
      })
      .catch(err => handleError(err.error.error, res));
  } else {
    notFound(res);
  }
});

export default router;
