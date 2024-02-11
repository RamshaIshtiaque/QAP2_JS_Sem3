const http = require('http');
const fs = require('fs'); 

global.DEBUG = true;

const port = 3000;

const server = http.createServer((request, response) => {
  if (DEBUG) console.log('Request URL:' , request.url);
  let path = './views/';
  switch (request.url) {
    case '/about':
      if (DEBUG) console.log('Handling route: /about');
      path += 'about.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    case '/contact':
      if (DEBUG) console.log('Handling route: /contact');
      path += 'contact.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    case '/products':
      if (DEBUG) console.log('Handling route: /products');
      path += 'products.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    case '/subscribe':
      if (DEBUG) console.log('Handling route: /subscribe');
      path += 'subscribe.html'
      if (DEBUG) console.log('Path:' , path);
      fetchFile(path,response);
      break;
    case '/':
      if (DEBUG) console.log('Handling route: /');
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
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
};

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


