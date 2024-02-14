const http = require('http');
const path = require('path');
const route = require('./routes.js');

const myEmitter = require('./logEvents.js');


global.DEBUG = true;
const port = 3000;


//Every time a file was successfully read and write a message to the console.
myEmitter.on('fileReadSuccess', (fileName) => {
  console.log(`File Successfully Read: ${fileName}`);
});

//Every time a file is not available and write a message to the console.
myEmitter.on('fileNotAvailable', (fileName) => {
  console.error(`File Not Available: ${fileName}`);
});


const server = http.createServer((request, response) => {
  if (request.url === '/favicon.ico') {
    // Ignore favicon.ico requests
    response.writeHead(204, {'Content-Type': 'image/x-icon'});
    response.end();
    return;
  }
  if (DEBUG) console.log('Request URL:' , request.url);
  let path = './views/';
  switch (request.url) {
    case '/about':
      // myEmitter.emit('route' , path);
      path += 'about.html'
      if (DEBUG) console.log('Path:' , path);
      route.aboutPage(path, response);
      break;
    case '/contact':
      // myEmitter.emit('route' , path);
      path += 'contact.html'
      if (DEBUG) console.log('Path:' , path);
      route.contactPage(path, response);
      break;
    case '/products':
      // myEmitter.emit('route' , path);
      path += 'products.html'
      if (DEBUG) console.log('Path:' , path);
      route.productsPage(path, response);
      break;
    case '/subscribe':
      // myEmitter.emit('route' , path);
      path += 'subscribe.html'
      if (DEBUG) console.log('Path:' , path);
      route.subscribePage(path, response);
      break;
    case '/':
      // myEmitter.emit('route' , path);
      path += 'index.html'
      if (DEBUG) console.log('Path:' , path);
      route.indexPage(path, response);
      break;
    default:
      let message = `404 Not Found: ${request.url}`;
      if(DEBUG) console.log(message);
      myEmitter.emit('error', message);
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
      break;
  }
});


server.on('error', (err) => {
  console.error('Server Error:', err.message);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




