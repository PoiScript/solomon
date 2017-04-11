import {InjectionToken} from '@angular/core';
import {SolomonConfig} from './interface/solomon-config';

export const CONFIG: SolomonConfig = {
  BLOG_NAME: 'Solomon',
  BLOG_DESCRIPTION: 'PoiScript\'s Blog',
  GITHUB_USERNAME: 'PoiScript',
  GITHUB_POST_REPO: 'Solomon-Post',
};

export const firebaseConfig = {
  apiKey: 'AIzaSyDptUPQOWYnHIDanDsPY_PFtB3fn2v2VfY',
  authDomain: 'solomon-poi.firebaseapp.com',
  databaseURL: 'https://solomon-poi.firebaseio.com',
  projectId: 'solomon-poi',
  storageBucket: 'solomon-poi.appspot.com',
  messagingSenderId: '90437469860'
};

export const CONFIG_TOKEN = new InjectionToken('config');
