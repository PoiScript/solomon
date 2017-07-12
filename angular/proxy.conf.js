const PROXY_CONFIG = [
  {
    context: [
      '/amp',
      '/atom.xml',
      '/favicon.ico',
      '/fonts',
      '/html',
      '/icon.png',
      '/markdown',
      '/post.json'
    ],
    target: 'http://localhost:8000'
  }
]

module.exports = PROXY_CONFIG
