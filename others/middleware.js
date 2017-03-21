module.exports = {
    isLogin: function isLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', 'Haven\'t Login!');
            return res.redirect('/login');
        }
        next();
    },

    notLogin: function notLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', "Already Login!");
            return res.redirect('back');
        }
        next();
    }
}