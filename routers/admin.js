
function adminMiddleware(req, res, next) {
    req.cookies.token ? true: false
    console.log(req.cookies)
    res.locals.token = true;

    next()
}

module.exports = adminMiddleware;