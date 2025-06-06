const adminProtect = (req, res, next) => {
    const isLoggedIn = req.cookies?.adminLoggedIn === 'true';

    if (!isLoggedIn) {
        return res.redirect('/admin/login');
    }

    next();
};

module.exports = {
    adminProtect
};
