import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material';
import { of } from 'rxjs';

const icons = [
  {
    name: 'arrow',
    source:
      '<svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24">' +
      '<path d="M8.6 16.3l4.6-4.6-4.6-4.5L10 5.7l6 6-6 6z"/>' +
      '<path fill="none" d="M0-.3h24v24H0z"/>' +
      '</svg>',
  },
];

@Injectable({ providedIn: 'root' })
export class IconRegistry extends MatIconRegistry {
  private preloaded: { [name: string]: SVGElement } = {};

  constructor(
    http: HttpClient,
    sanitizer: DomSanitizer,
    @Optional()
    @Inject(DOCUMENT)
    document,
  ) {
    super(http, sanitizer, document);
    const div = document.createElement('DIV');
    for (const icon of icons) {
      div.innerHTML = icon.source;
      this.preloaded[icon.name] = div.querySelector('svg')!;
    }
  }

  getNamedSvgIcon(iconName: string, namespace?: string) {
    return this.preloaded[iconName]
      ? of(this.preloaded[iconName].cloneNode(true) as SVGElement)
      : super.getNamedSvgIcon(iconName, namespace);
  }
}
