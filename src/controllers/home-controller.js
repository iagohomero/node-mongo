class HomeController{

    static routes(){
        return {
            home: '/'
        }
    }

    home(){
        return (req, res) => {
            res.render('index');
        }
    }
}

module.exports = HomeController;