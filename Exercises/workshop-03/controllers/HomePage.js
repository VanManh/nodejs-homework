const Controller = require("./Controller");

class HomePage extends Controller {
    constructor() {
        super();
    }

    index(req, res, next) {
        res.render('contents/home', {});
    }
}

module.exports = new HomePage();
