import {OpaqueToken} from '@angular/core'
import {SolomonConfig} from './interface/solomon-config'

export const CONFIG: SolomonConfig = {
  BLOG_NAME: 'Solomon',
  RECENT_POST_LIMIT: 6,
  RECENT_ANIME_LIMIT: 6,
  RECENT_PROJECT_LIMIT: 6,
  GITHUB_USERNAME: 'PoiScript',
  GITHUB_POST_REPO: 'Solomon-Post',
  KITSU_ID: 140033
}

export const firebaseConfig = {
  apiKey: 'AIzaSyAtCLgC-zOhSg2VojAhvrPrvEyL8scBNPc',
  authDomain: 'poi-works.firebaseapp.com',
  databaseURL: 'https://poi-works.firebaseio.com',
  storageBucket: 'poi-works.appspot.com',
  messagingSenderId: '306363697436'
}

export const CONFIG_TOKEN = new OpaqueToken('config')
