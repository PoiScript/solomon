import { Router } from 'express';
import { auth, database } from 'firebase-admin';

import { handleError } from './util';

const router = Router();

router.post('/:slug', (req, res) => {
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
    .catch(err => handleError(err, res));
});

router.get('/:slug', (req, res) => {
  database().ref().child('/comment/' + req.params.slug).once('value')
    .then(snap => {
      const comments = [];
      snap.forEach(childSap => {
        comments.push(childSap.val());
      });
      return comments;
    })
    .then(comments => {
      res.json({data: comments});
    })
    .catch(err => handleError(err, res));
});

export default router;
