import {Component, Input} from '@angular/core';

import {SearchResult} from '../../../../class/searchResult';
import {Intro} from '../../../../class/post';


@Component({
  selector: 'solomon-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  private _result: SearchResult;
  @Input() intros: Intro[];

  @Input()
  set result(result: SearchResult) {
    this._result = result;
    this._result.items
      .filter(item => item.name !== 'about.md' && item.name !== 'link.md ')
      .forEach(item => item.intro = this.intros.find(intro => intro.slug === item.name.substring(0, item.name.length - 3)));
  }

  get result(): SearchResult {
    return this._result;
  }
}
