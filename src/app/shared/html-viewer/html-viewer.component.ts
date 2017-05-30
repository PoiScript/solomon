import {Component, ElementRef, Input} from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'solomon-html-viewer',
  template: 'loading...'
})
export class ViewerComponent {

  constructor (private _http: Http, private _elementRef: ElementRef) { }

  @Input()
  set htmlUrl (url: string) {
    this._getHtml(url);
  }

  private _getHtml (url: string) {
    this._http.get(url).subscribe(
      response => {
        if (response.ok) {
          this._elementRef.nativeElement.innerHTML = response.text();
        } else {
          this._elementRef.nativeElement.innerText =
            `Failed to load html: ${url}. Error: ${response.status}`;
        }
      },
      error => {
        this._elementRef.nativeElement.innerText =
          `Failed to load html: ${url}. Error: ${error}`;
      });
  }

}
