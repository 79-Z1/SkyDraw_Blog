class AdminController {
    showHome = async (req, res, next) => {
        res.render("pages/admin/home/index", {
            layout: 'mainAdmin.hbs'
        });
    }
}   

module.exports = new AdminController();