import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Link } from '../../model';

@Component({ templateUrl: './link.component.html' })
export class LinkComponent {
  readonly links: Link[] = [
    {
      address: 'https://typeblog.net/',
      avatar: 'https://github.com/PeterCxy.png?size=400',
      name: 'PeterCxy',
    },
    {
      address: 'https://fiveyellowmice.com/',
      avatar: 'https://github.com/FiveYellowMice.png?size=400',
      name: 'FiveYellowMice',
    },
    {
      address: 'http://blog.lilydjwg.me/',
      avatar: 'https://github.com/lilydjwg.png?size=400',
      name: '依云',
    },
    {
      address: 'https://blog.yoitsu.moe/',
      avatar: 'https://github.com/KenOokamiHoro.png?size=400',
      name: 'ヨイツの賢狼ホロ',
    },
    {
      address: 'https://blog.felixc.at/',
      avatar: 'https://github.com/felixonmars.png?size=400',
      name: 'Felix Yan',
    },
    {
      address: 'https://farseerfc.me/',
      avatar: 'https://github.com/farseerfc.png?size=400',
      name: 'farseerfc',
    },
    {
      address: 'https://tomli.blog/',
      avatar: 'https://github.com/biergaizi.png?size=400',
      name: '比尔盖子',
    },
    {
      address: 'https://void-shana.moe/',
      avatar: 'https://github.com/VOID001.png?size=400',
      name: 'VOID001',
    },
    {
      address: 'https://marisa-kirisa.me/',
      avatar: 'https://github.com/wengxt.png?size=400',
      name: 'CS Slayer',
    },
    {
      address: 'https://www.rabbittu.com/',
      avatar: 'https://github.com/xiaoyu2016.png?size=400',
      name: 'NyanRabbit',
    },
    {
      address: 'https://blog.nfz.moe/',
      avatar: 'https://github.com/neofelhz.png?size=400',
      name: 'neoFelhz',
    },
    {
      address: 'https://sherlock-holo.github.io/',
      avatar: 'https://github.com/Sherlock-Holo.png?size=400',
      name: 'Sherlock Holo',
    },
    {
      address: 'https://blog.sukitsuki.com/',
      avatar: 'https://github.com/tsuki.png?size=400',
      name: 'Tsuka Tsuki',
    },
    {
      address: 'https://ekyu.moe/',
      avatar: 'https://github.com/Equim-chan.png?size=400',
      name: 'Equim',
    },
    {
      address: 'https://blog.nanpuyue.com',
      avatar: 'https://github.com/nanpuyue.png?size=400',
      name: '南浦月',
    },
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle('link | solomon');
  }
}
