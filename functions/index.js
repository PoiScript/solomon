const express = require('express')
const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)

const app = express()
const ref = admin.database().ref()

app.get('/api/comment/:slug', (req, res) => {
  const comments = []
  ref
    .child(`/comment/${req.params.slug}`)
    .once('value')
    .then(snap => {
      snap.forEach(childSap => {
        comments.push(childSap.val())
      })
      return comments
    })
    .then(comments => {
      res.status(200)
      res.json({ data: comments })
    })
    .catch(error => {
      console.error(error)
      res.status(500)
      res.json({ error: error })
    })
})

app.get('*', (req, res) => {
  res.status(404)
  res.json({ error: 'Not Found' })
})

exports.api = functions.https.onRequest(app)
