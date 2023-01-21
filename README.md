# Introduction
- This repository, i store my node.js exercises. 
- Here i take keynotes for exercises.

# Exercise-1 & 2 // Node.js
- Basics of http module.
- Creating server.
- Event loops and server.listen() methods.
- Request Handler term.
- Taking requests. With req.url and req.method, setting responses.
- Response writing with res.write(), HTML codes.
- Buffer and chunk terms. taking data with chunks using req.on and parsing it.
- Modifying headers and status code.
- Modules, exporting modules and import from another file.

# Exercise-3,4,5 // Express.js
- Introduce to express.js and practising
- Middleware concept, how works them and handling requests.
- Setting up middlewares with use() get() post() methods.
- body-parser package for parsing.
- Filtering paths on middlewares. 
- Difference of next() and res() methods on middlewares.
- Instead of res.write() method, res.send() method and its auto content-type setting.
- For redirecting, .redirect("/path") method.
- Using express router (express.Router()) and moving middlewares on the other folders. Exporting router.
- Adding 404 Page for getting benefit of "/" general path handling concept of express.js.
- Creating HTML files and linking onto express server without template engines.
- Helper function concept for navigation.
- Serving static files like css files on public folder.

# Exercise-6 // Template Engines - Pug
- Introduced to templating engines and their working principle.
- Popular template engines: EJS, Pug, Handlebars
- Worked with pug.
- Installing, implementing pug and configuration
- Setting "views" folder and creating .pug files
- Builded template with pug syntax, used them in middlewares with res.render() method.
- Working with dynamic contents
- Outputting simple text, list and conditional statements (loops and if statements) with pug
- Building layouts with pug

# Exercise-7,8 // Template Engines - HandleBars & EJS
- Registering template engines which not pre-built with express.js (like handlebar) with using .engine() 
- HTML-like syntax of handlebars
- Loops and conditional statements with handlebars
- Passing conditional logics to handlebars files from .js files as boolean
- Building layouts with handlebars {{{  }}}
- HTML-like syntax of EJS and using Javascript syntax building loops and if conditionals.
- Because EJS does not support building layouts, using partials/includes for getting benefit from layout-like features.

# Exercise-9 // Practising
- For exercise made mini website that has 4 pages; main, user-list, error, thank-you page.
- Used express.js and all the GET request for these pages handled with middlewares
- Main page has simply has subscription form with name, surname and email fields
- Submiting form sends POST request and redirect to the thank-you page.
- User List page output all the user inputs current session from main page
- Any non-existed urls shows error page.
- For POST request, body-parser helped with the parse the data.
- Nodemon implemented.
- Used EJS for templating and making layout
