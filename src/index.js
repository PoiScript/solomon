import React from 'react'
import { render } from 'react-snapshot'
import { initializeApp } from 'firebase'

import App from './App'

import './index.css'

const config = {
  apiKey: 'AIzaSyDptUPQOWYnHIDanDsPY_PFtB3fn2v2VfY',
  authDomain: 'solomon-poi.firebaseapp.com',
  databaseURL: 'https://solomon-poi.firebaseio.com',
  projectId: 'solomon-poi',
  storageBucket: 'solomon-poi.appspot.com'
}

initializeApp(config)

render(<App />, document.getElementById('root'))
