const fs = require('fs')
const rl = require('readline')

const LINK_FILE = 'content/link.md'
const NG_OUTPUT_DIR = 'ng/src/assets/json'
const TABLE_START = '|GitHub Username|Nickname|Link Text|Link Address|Bio|'
const TABLE_END = '|:--:|:--:|:--:|:--:|:--:|'

const links = []

rl.createInterface({input: fs.createReadStream(LINK_FILE)})
  .on('line', line => {
    const parts = line.split('|')

    if (parts.length === 7 && line !== TABLE_START && line !== TABLE_END) {
      links.push({
        github_username: parts[1],
        name: parts[2],
        text: parts[3],
        address: parts[4],
        bio: parts[5]
      })
    }
  })
  .on('close', () => {
    if (!fs.existsSync(NG_OUTPUT_DIR)) {
      fs.mkdirSync(NG_OUTPUT_DIR)
    }

    fs.writeFile(`${NG_OUTPUT_DIR}/link.json`, JSON.stringify(links), (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log('[GENERATED] link.json')
      }
    })
  })
