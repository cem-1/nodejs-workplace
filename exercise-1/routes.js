const fs = require("fs");

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if(url === "/"){
        res.write("<html>");
        res.write("<head><title>Enter Message</title></head>");
        res.write("<body><form action='/message' method='POST'>");
        //this action targets localhost:3000 directly.
        res.write("<input type='text' name='message'>");
        res.write("<button type='submit'>Send</button>");
        res.write("</form></body>");
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST"){
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt",message, (err) =>{
                //we will define error later.
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        })
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("did we returned???????????")
    res.write("</html>");
}



module.exports = {
    handler: requestHandler,
    someText: "Some hardcoded text here!",
}