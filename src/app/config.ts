import {SolomonConfig} from "./interface/solomon-config"
import {OpaqueToken} from "@angular/core"

export const CONFIG: SolomonConfig = {
  BLOG_NAME: 'Solomon',
  RECENT_POST_LIMIT: 6,
  RECENT_ANIME_LIMIT: 6,
  RECENT_PROJECT_LIMIT: 6,
  GITHUB_USERNAME: 'PoiScript',
  GITHUB_POST_REPO: 'Solomon-Post',
  KITSU_ID: 140033
}

export const CONFIG_TOKEN = new OpaqueToken('config')
