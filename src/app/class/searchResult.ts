import {Intro} from "./post"
export class SearchResult {
  total_count: number
  incomplete_results: boolean
  score: number
  items: [{
    name: string
    sha: string
    html_url: string
    intro: Intro
    text_matches: [{
      object_type: string
      fragment: string
      matches: [{
        text: string
        indices: number[]
      }]
    }]
  }]
}
