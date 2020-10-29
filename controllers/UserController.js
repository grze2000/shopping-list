exports.getUser = (req, res) => {
    const userInfo = (({_id, email, sortType, ...other}) => ({_id, email, sortType}))(req.user);
    res.json(userInfo);
}

exports.updateUser = (req, res) => {
    const keys = ['email', 'sortType'];
    if(req.body.hasOwnProperty('email') && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email.toLowerCase())) {
        return res.status(400).json({message: 'Nie prawidłowy email'});
    }
    if(req.body.hasOwnProperty('sortType') && !/^[a-z ]+$/.test(req.body.sortType.toLowerCase())) {
        return res.status(400).json({message: 'Nie prawidłowy rodzaj sortowania'});
    }
    for(key of Object.keys(req.body)) {
        if(keys.includes(key)) {
            req.user[key] = req.body[key];
        }
    }
    req.user.save(err => {
        if(err) {
            res.status(500).json({message: 'Nie można zaktualizować profilu'});
        } else {
            res.status(200).json((({_id, email, sortType, ...other}) => ({_id, email, sortType}))(req.user));
        }
    });
}