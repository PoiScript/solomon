const admin = require('firebase-admin')
const bodyParser = require('body-parser')
const express = require('express')
const functions = require('firebase-functions')

// must initialize app before using any firebase-admin api
admin.initializeApp(functions.config().firebase)
const ref = admin.database().ref()
const auth = admin.auth()

const app = express()
app.use(bodyParser.json())

// create a new comment
app.post('/api/comment/:slug', (req, res) => {
  const data = req.body
  const current = (new Date()).toISOString()
  auth.getUser(data.uid)
    .then(user =>
      ref.child(`/comment/${req.params.slug}`).push()
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
      res.sendStatus(200)
    })
    .catch(error => handleError(error, res))
})

// list the comments
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
      res.json({data: comments})
    })
    .catch(error => handleError(error, res))
})

app.get('*', (req, res) => {
  res.status(404)
  res.json({error: 'Not Found'})
})

function handleError (error, res) {
  console.error(error)
  res.status(500)
  res.json({error: error})
}

exports.api = functions.https.onRequest(app)
