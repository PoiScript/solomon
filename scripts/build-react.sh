cd react

node-sass-chokidar src/ -o src/ --output-style compressed

react-scripts build

react-snapshot

node scripts/replace-html.js

node scripts/moving-html.js
