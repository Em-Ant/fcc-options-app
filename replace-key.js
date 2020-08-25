var fs = require('fs');
var path = require('path');

var html = fs.readFileSync(path.join(__dirname, 'client', 'public', 'index.html'), 'utf-8')

html = html.replace('---key---', process.env.GOOGLE_API_CLIENT_KEY);

fs.writeFileSync(path.join(__dirname, 'client', 'public', 'index.html'), html);