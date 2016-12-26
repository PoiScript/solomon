import { Component } from '@angular/core'

@Component({
    selector: 'card-tag',
    templateUrl: './card-tag.component.html',
})

export class CardTagComponent {
  color: string;

  availableColors = [
    { name: 'Tag1', color: '' },
    { name: 'Tag2', color: 'primary' },
    { name: 'Tag3', color: 'accent' },
    { name: 'Tag4', color: 'warn' }
  ];
}