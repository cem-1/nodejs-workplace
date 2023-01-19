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