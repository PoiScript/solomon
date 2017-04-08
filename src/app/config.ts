import {InjectionToken} from '@angular/core';
import {SolomonConfig} from './interface/solomon-config';

export const CONFIG: SolomonConfig = {
  BLOG_NAME: 'Solomon',
  BLOG_DESCRIPTION: 'PoiScript\'s Blog',
  GITHUB_USERNAME: 'PoiScript',
  GITHUB_POST_REPO: 'Solomon-Post',
};

export const firebaseConfig = {
  apiKey: 'AIzaSyAtCLgC-zOhSg2VojAhvrPrvEyL8scBNPc',
  authDomain: 'poi-works.firebaseapp.com',
  databaseURL: 'https://poi-works.firebaseio.com',
  storageBucket: 'poi-works.appspot.com',
  messagingSenderId: '306363697436'
};

export const CONFIG_TOKEN = new InjectionToken('config');
