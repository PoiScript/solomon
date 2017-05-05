import {InjectionToken} from '@angular/core';
import {SolomonConfig} from './app/interface/solomon-config';

export const CONFIG: SolomonConfig = {
  BLOG_NAME: 'Solomon',
  BLOG_DESCRIPTION: 'PoiScript\'s Blog',
  BLOG_URL: 'poi.works',
  GITHUB_USERNAME: 'PoiScript',
  GITHUB_POST_REPO: 'Solomon-Post'
};

export const CONFIG_TOKEN = new InjectionToken('config');
