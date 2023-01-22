exports.get404Page = (req,res,next) =>{
    res.status(404).render("error", {pageTitle: "Page not found", path:""});
}