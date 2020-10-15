const nameRegex = /^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ \.!?,:;\-&']{1,50}$/;

exports.getCategories = (req, res) => {
    var categories = req.user.categories.map(x => ({_id: x._id, name: x.name, itemCount: 0}));
    for(list of req.user.lists) {
        for(item of list.items) {
            if(typeof item.category !== 'undefined') {
                const index = categories.findIndex(x => x._id.equals(item.category))
                if(index != -1) {
                    categories[index].itemCount++;
                }
            }
        }
    }
    res.json(categories);
}

exports.addCategory = (req, res) => {
    if(req.body.name) {
        if(nameRegex.test(req.body.name)) {
            req.user.categories.push({
                name: req.body.name
            });
            req.user.save(err => {
                if(err) {
                    res.status(500).json({message: 'Nie udało się utworzyć kategorii'});
                } else {
                    res.status(201).json([req.user.categories[req.user.categories.length-1]].map(x => ({_id: x._id, name: x.name, itemCount: 0}))[0]);
                }
            });
        } else {
            res.status(400).json({message: 'Nazwa zawiera niedozwolone znaki'});
        }
    } else {
        res.status(400).json({message: 'Nie podano nazwy kategorii'});
    }
}

exports.renameCategory = (req, res) => {
    const index = req.user.categories.findIndex(x => x._id.equals(req.params.id));
    if(index === -1) {
        res.status(400).json({message: 'Nie istnieje kategoria o podanym id!'});
        return;
    }
    if(!req.body.name.length) {
        res.status(400).json({message: 'Nie podano nazwy kategorii'});
        return;
    }
    if(!nameRegex.test(req.body.name)) {
        res.status(400).json({message: 'Nazwa zawiera niedozwolone znaki'});
        return;
    }
    req.user.categories[index].name = req.body.name;
    req.user.save(err => {
        if(err) {
            console.log(err);
            res.status(500).json({message: 'Nie udało się zmienić nazwy kategorii'});
        } else {
            res.sendStatus(201);
        }
    });
}

exports.getItems = (req, res) => {
    const category = req.user.categories.id(req.params.categoryId);
    if(!category) {
        res.status(400).json({message: 'Nie istnieje kategoria o podanym id'});
        return;
    }
    let items = [];
    for(list of req.user.lists) {
        for(item of list.items) {
            if(req.params.categoryId == item.category) {
                items.push(Object.assign({listId: list._id}, item.toObject()));
            }
        }
    }
    res.json({...category.toObject(), items: items, itemCount: items.length});
}

exports.removeCategory = (req, res) => {
    req.user.categories = req.user.categories.filter(category => !category._id.equals(req.params.id));
    req.user.save(err => {
        err ? res.sendStatus(500) : res.sendStatus(200);
    });
}