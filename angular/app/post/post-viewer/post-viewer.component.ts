import { Http } from '@angular/http';
import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'solomon-post-viewer',
  template: '<i>Loading {{slug}}.html...</i>'
})
export class PostViewerComponent {
  constructor (private _http: Http, private _elementRef: ElementRef) { }

  @Input()
  set slug (slug: string) {
    this._getHtml(slug);
  }

  private _getHtml (slug: string) {
    this._http.get(`/html/${slug}.html`).subscribe(
      response => {
        if (response.ok) {
          this._elementRef.nativeElement.innerHTML = response.text();
        } else {
          this._elementRef.nativeElement.innerHTML =
            `<h4><i>Failed to load ${slug}.html.</i></h4>
             <i>Error: ${response.status}</i>`;
        }
      },
      error => {
        this._elementRef.nativeElement.innerHTML =
          `<h4><i>Failed to load ${slug}.html.</i></h4>
           <i>Error: ${error}</i>`;
      });
  }
}
