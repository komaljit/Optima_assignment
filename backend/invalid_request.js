var express = require('express');
var router = express.Router();


// catch 404 and forward to error handler
module.exports.router = router.use(function (request, response, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
router.use(function (err, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};

    console.log(err);

    // render the error page
    response.status(err.status || 500);
    response.json('error');
});
