import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'

const links = [
  {
    'avatar_url': 'https://github.com/FiveYellowMice.png?size=200',
    'name': 'FiveYellowMice',
    'text': 'FiveYellowMice\'s Blog',
    'address': 'https://fiveyellowmice.com/'
  }, {
    'avatar_url': 'https://github.com/farseerfc.png?size=200',
    'name': 'farseerfc',
    'text': 'Farseerfc的小窩',
    'address': 'https://farseerfc.me/'
  }, {
    'avatar_url': 'https://github.com/lilydjwg.png?size=200',
    'name': '依云',
    'text': '依云\'s Blog',
    'address': 'http://blog.lilydjwg.me/'
  }, {
    'avatar_url': 'https://github.com/KenOokamiHoro.png?size=200',
    'name': 'ヨイツの賢狼ホロ',
    'text': '约伊兹的萌狼乡手札',
    'address': 'https://blog.yoitsu.moe/'
  }, {
    'avatar_url': 'https://github.com/felixonmars.png?size=200',
    'name': 'Felix Yan',
    'text': 'Felix\'s Blog',
    'address': 'https://blog.felixc.at/'
  }, {
    'avatar_url': 'https://github.com/PeterCxy.png?size=200',
    'name': 'PeterCxy',
    'text': 'Typeblog',
    'address': 'https://typeblog.net/'
  }, {
    'avatar_url': 'https://github.com/biergaizi.png?size=200',
    'name': '比尔盖子',
    'text': '比尔盖子 博客',
    'address': 'https://tomli.blog/'
  }, {
    'avatar_url': 'https://github.com/VOID001.png?size=200',
    'name': 'VOID001',
    'text': 'VOID001\'s WOWO',
    'address': 'https://void-shana.moe/'
  }, {
    'avatar_url': 'https://github.com/wengxt.png?size=200',
    'name': 'CS Slayer',
    'text': '恋符「Master Spark」',
    'address': 'https://marisa-kirisa.me/'
  }, {
    'avatar_url': 'https://github.com/xiaoyu2016.png?size=200',
    'name': 'NyanRabbit',
    'text': '伊妮卡丽因 - 某兔子の御用花园',
    'address': 'https://www.rabbittu.com/'
  }
]

const Links = () => (
  <Main>
    <Helmet title='Link - Solomon' />
    <Header title='Link' />
    <List>
      {links.map((link) =>
        <ListItem
          key={link.name}
          primaryText={link.name}
          secondaryText={link.text}
          href={link.address}
          leftAvatar={<Avatar src={link.avatar_url} />}
        />
      )}
    </List>
  </Main>
)

export default Links
