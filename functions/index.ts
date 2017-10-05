import { json } from 'body-parser';
import { auth, database, initializeApp } from 'firebase-admin';
import { config, https } from 'firebase-functions';
import * as express from 'express';
import * as request from 'request-promise';

initializeApp(config().firebase);
const app = express();
const baseUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const endpoints = {
  getUser: 'getAccountInfo',
  deleteUser: 'deleteAccount',
  updateUser: 'setAccountInfo',
  sendPasswordResetEmail: 'getOobConfirmationCode',
  verifyPasswordReset: 'resetPassword',
  confirmPasswordReset: 'resetPassword',
  sendVerificationEmail: 'getOobConfirmationCode',
  confirmEmailVerification: 'setAccountInfo'
};

class User {
  localId: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

app.use(json());

app.post('/api/comment/:slug', (req, res) => {
  const data = req.body;
  const current = (new Date()).toISOString();
  auth().getUser(data.uid).then(user =>
    database().ref().child(`/comment/${req.params.slug}`).push()
      .set({
        uid: user.uid,
        avatar: user.photoURL,
        name: user.displayName,
        content: data.content,
        created: current,
        updated: current
      })
  )
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => handleError(error, res));
});

app.get('/api/comment/:slug', (req, res) => {
  database().ref().child('/comment/' + req.params.slug).once('value')
    .then(snap => {
      const comments = [];
      snap.forEach(childSap => {
        comments.push(childSap.val());
      });
      return comments;
    })
    .then(comments => {
      res.status(200);
      res.json({data: comments});
    })
    .catch(error => handleError(error, res));
});

// chain verifyPassword & getAccountInfo requests
app.post('/api/auth/signIn', (req, res) => {
  let user: User;
  apiRequest('verifyPassword', req.body)
    .then((body: User) => {
      user = body;
      return apiRequest('getAccountInfo', {idToken: body.idToken});
    })
    .then(info => {
      res.status(200);
      res.json({...user, ...info.users.find(i => i.localId === user.localId)});
    })
    .catch(err => handleError(err.error.error, res));
});

// chain signupNewUser & getAccountInfo requests
app.post('/api/auth/signUp', (req, res) => {
  let user: User;
  apiRequest('signupNewUser', req.body)
    .then((body: User) => {
      user = body;
      return apiRequest('getAccountInfo', {idToken: body.idToken});
    })
    .then(info => {
      res.status(200);
      res.json({...user, ...info.users.find(i => i.localId === user.localId)});
    })
    .catch(err => handleError(err.error.error, res));
});

app.post('/api/auth/:endpoint', (req, res) => {
  const endpoint = endpoints[req.params.endpoint];
  if (endpoint) {
    apiRequest(endpoint, req.body)
      .then(body => {
        res.status(200);
        res.json(body);
      })
      .catch(err => handleError(err.error.error, res));
  } else {
    res.status(404);
    res.json({error: 'Not Found'});
  }
});

app.use('*', (req, res) => {
  res.status(404);
  res.json({error: 'Not Found'});
});

function apiRequest (endpoint: string, body: any) {
  return request({
    uri: baseUrl + endpoint,
    method: 'POST',
    body: body,
    json: true,
    qs: {
      key: config().firebase.apiKey
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

function handleError (error, res) {
  console.error(error);
  res.status(500);
  res.json({error: error});
}

exports.api = https.onRequest(app);
