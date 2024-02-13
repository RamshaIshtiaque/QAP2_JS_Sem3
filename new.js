const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();

global.DEBUG = true;
const port = 3000;

//Every time a specific route was accessed and write a message to the console.
myEmitter.on('route' , (path) => {
  const d = new Date();
  if(DEBUG) console.log(`Route Event on: ${path} at ${d}`);
});

//Every time a file was successfully read and write a message to the console.
myEmitter.on('fileReadSuccess', (fileName) => {
  console.log(`File Successfully Read: ${fileName}`);
});

//Every time a file is not available and write a message to the console.
myEmitter.on('fileNotAvailable', (fileName) => {
  console.error(`File Not Available: ${fileName}`);
});


const server = http.createServer((request, response) => {
  if (DEBUG) console.log('Request URL:' , request.url);
  let path = './views/';
  switch (request.url) {
    case '/about':
      myEmitter.emit('route' , path);
      path += 'about.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    case '/contact':
      myEmitter.emit('route' , path);
      path += 'contact.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    case '/products':
      myEmitter.emit('route' , path);
      path += 'products.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    case '/subscribe':
      myEmitter.emit('route' , path);
      path += 'subscribe.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    case '/':
      myEmitter.emit('route' , path);
      path += 'index.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    default:
      if (DEBUG) console.log(`404 Not Found: ${request.url}`);
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
  }
});

function fetchFile(fileName, response) {
  fs.readFile(fileName, (error, content) => {
    if(error) {
      myEmitter.emit('fileNotAvailable', fileName);
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    } else {
      myEmitter.emit('fileReadSuccess', fileName);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
};

server.on('error', (err) => {
  console.error('Server Error:', err.message);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


