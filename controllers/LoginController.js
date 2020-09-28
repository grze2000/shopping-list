exports.register = (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.passwordRepeat) {
        res.status(400).json({success: false, message: 'Podaj prawidłowy email i hasło'});
    } else if(req.body.password !== req.body.passwordRepeat) {
        res.status(400).json({success: false, message: 'Podane hasła nie są takie same'});
    } else {
        var newUser = User({
            email: req.body.email,
            password: req.body.password
        });
        newUser.save((err) => {
            if(err) {
                return res.status(400).json({success: false, message: 'Taki użytkonik już istnieje'});
            }
            res.status(201).json({success: true, message: 'Pomyślnie utworzono uzytkownika'});
        });
    }
}

exports.login = (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) throw err;

        if(!user) {
            res.status(401).json({success: false, message: 'Nieprawidłowy adres email'});
        } else {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!err && isMatch) {
                    const token = jwt.sign({id: user._id}, process.env.SECRET);
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).json({success: false, message: 'Nieprawidłowe hasło'});
                }
            });
        }
    });
}