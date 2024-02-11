// Step 1: Import required modules
const http = require('http');

// Step 2: Set up port
const port = 3000;

// Step 3: Create an HTTP server
const server = http.createServer((request, response) => {
  // Step 4: Use request.url to determine the requested route
  switch (request.url) {
    // Step 5: Add console.log for each case
    case '/about':
      console.log('Handling route: /about');
      // Perform actions specific to the /about route
      response.end('About Page');
      break;
    case '/contact':
      console.log('Handling route: /contact');
      // Perform actions specific to the /contact route
      response.end('Contact Page');
      break;
    case '/products':
      console.log('Handling route: /products');
      // Perform actions specific to the /products route
      response.end('Products Page');
      break;
    case '/subscribe':
      console.log('Handling route: /subscribe');
      // Perform actions specific to the /subscribe route
      response.end('Subscribe Page');
      break;
    case '/':
      console.log('Handling route: /');
      // Perform actions specific to the root route
      response.end('Home Page');
      break;
    default:
      console.log(`404 Not Found: ${request.url}`);
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
  }
});

// Step 7: Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
