
const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url==="/"){
        res.setHeader("Content-Type","text/html");
        res.write("<h1> Hello! </h1>");
        res.write("<p>Welcome to main page! </h1>");
        res.write("<form action='/create-user' method='POST'>");
        res.write("<input type='text' name='username'>");
        res.write("<button type='submit'> Apply! </button>");
        res.write("</form>");
        return res.end();
    }
    if(url==="/users"){
        res.write("<html>");
        res.write("<ul><li> User 1 </ul></li>");
        res.write("</html>");
        return res.end();
    }
    if(url==="/create-user" && method === "POST"){
        const mybuffer = [];
        req.on("data",(chunk)=> {
            mybuffer.push(chunk);
        })
        req.on("end", () => {
            const parsedData = Buffer.concat(mybuffer).toString();
            console.log(parsedData);
        })
        res.statusCode = 302;
        res.setHeader("Location","/");
        res.end();
    }
}

module.exports = {
    handler: requestHandler,
}