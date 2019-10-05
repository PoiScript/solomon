import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

interface Link {
  address: string;
  avatar: string;
  name: string;
}

@Component({
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LinkComponent {
  readonly links: Link[] = [
    {
      address: 'https://typeblog.net/',
      avatar: 'PeterCxy',
      name: 'PeterCxy',
    },
    {
      address: 'https://fiveyellowmice.com/',
      avatar: 'FiveYellowMice',
      name: 'FiveYellowMice',
    },
    {
      address: 'http://blog.lilydjwg.me/',
      avatar: 'lilydjwg',
      name: '依云',
    },
    {
      address: 'https://blog.yoitsu.moe/',
      avatar: 'KenOokamiHoro',
      name: 'ヨイツの賢狼ホロ',
    },
    {
      address: 'https://blog.felixc.at/',
      avatar: 'felixonmars',
      name: 'Felix Yan',
    },
    {
      address: 'https://farseerfc.me/',
      avatar: 'farseerfc',
      name: 'farseerfc',
    },
    {
      address: 'https://tomli.blog/',
      avatar: 'biergaizi',
      name: '比尔盖子',
    },
    {
      address: 'https://void-shana.moe/',
      avatar: 'VOID001',
      name: 'VOID001',
    },
    {
      address: 'https://marisa-kirisa.me/',
      avatar: 'wengxt',
      name: 'CS Slayer',
    },
    {
      address: 'https://www.rabbittu.com/',
      avatar: 'xiaoyu2016',
      name: 'NyanRabbit',
    },
    {
      address: 'https://blog.nfz.moe/',
      avatar: 'neofelhz',
      name: 'neoFelhz',
    },
    {
      address: 'https://sherlock-holo.github.io/',
      avatar: 'Sherlock-Holo',
      name: 'Sherlock Holo',
    },
    {
      address: 'https://blog.sukitsuki.com/',
      avatar: 'tsuki',
      name: 'Tsuka Tsuki',
    },
    {
      address: 'https://ekyu.moe/',
      avatar: 'Equim-chan',
      name: 'Equim',
    },
    {
      address: 'https://blog.nanpuyue.com',
      avatar: 'nanpuyue',
      name: '南浦月',
    },
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle('Link☆Solomon');
  }
}
