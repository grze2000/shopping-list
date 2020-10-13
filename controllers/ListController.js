const nameRegex = /^[\wżźćńółęąśŻŹĆĄŚĘŁÓŃ \.!?,:;\-&']{1,50}$/;

exports.getLists = (req, res) => {
    res.json(req.user.lists.map(x => ({_id: x._id, name: x.name, itemCount: x.items.length})));
}

exports.addList = (req, res) => {
    if(!req.body.name) {
        res.status(400).json({message: 'Nie podano nazwy listy'});
        return;
    }
    if(!nameRegex.test(req.body.name)) {
        res.status(400).json({message: 'Nazwa zawiera niedozwolone znaki'});
        return;
    }
    req.user.lists.push({
        name: req.body.name,
        items: []
    });
    req.user.save(err => {
        if(err) {
            res.status(500).json({message: 'Nie udało się utworzyć listy'});
        } else {
            res.status(201).json((x => ({_id: x._id, name: x.name, itemCount: x.items.length}))(req.user.lists[req.user.lists.length-1]));
        }
    });
}

exports.renameList = (req, res) => {
    const index = req.user.lists.findIndex(x => x._id.equals(req.params.id));
    if(index === -1) {
        res.status(400).json({message: 'Nie istnieje lista o podanym id!'});
        return;
    }
    if(!req.body.name.length) {
        res.status(400).json({message: 'Nie podano nazwy listy'});
        return;
    }
    if(!nameRegex.test(req.body.name)) {
        res.status(400).json({message: 'Nazwa zawiera niedozwolone znaki'});
        return;
    }
    req.user.lists[index].name = req.body.name;
    req.user.save(err => {
        if(err) {
            console.log(err);
            res.status(500).json({message: 'Nie udało się zmienić nazwy listy'});
        } else {
            res.sendStatus(201);
        }
    });
}

exports.removeList = (req, res) => {
    req.user.lists = req.user.lists.filter(list => !list._id.equals(req.params.id));
    req.user.save(err => {
        err ? res.sendStatus(500) : res.sendStatus(200);
    });
}

exports.getItems = (req, res) => {
    const list = req.user.lists.id(req.params.listId)
    if(!list) {
        res.status(400).json({message: 'Nie istnieje lista o podanym id'});
        return;
    }
    let result = list.toObject();
    result.items = result.items.map(x => {
        x.listId = list._id;
        return x;
    });
    res.json(result);
}

exports.addItem = (req, res) => {
    if(!req.user.lists.id(req.params.listId)) {
        res.status(400).json({message: 'Nie istnieje lista o podanym id'});
        return;
    }
    if(!req.body.name) {
        res.status(400).json({message: 'Nie podano nazwy produktu'});
        return;
    }
    if(!nameRegex.test(req.body.name)) {
        res.status(400).json({message: 'Nazwa zawiera niedozwolone znaki'});
        return;
    }
    if(/^(I'm |I am )/.test(req.body.name)) {
        res.status(418).json({message: 'And I... am... a teapot'});
        return;
    }
    req.user.lists.id(req.params.listId).items.push(req.body);
    req.user.save(err => {
        if(err) {
            res.status(500).json({message: 'Nie można dodać produktu'});
        } else {
            res.status(201).json(req.user.lists.id(req.params.listId).items[req.user.lists.id(req.params.listId).items.length-1]);
        }
    });
}

exports.updateItem = (req, res) => {
    if(!req.user.lists.id(req.params.listId)) {
        res.status(400).json({message: 'Nie istnieje lista o podanym id'});
        return;
    }
    if(!req.user.lists.id(req.params.listId).items.id(req.params.itemId)) {
        res.status(400).json({message: 'Nie istnieje produkt o podanym id'});
        return;
    }
    if(!Object.keys(req.body).length) {
        res.sendStatus(400);
        return;
    }
    for(let key in req.body) {
        req.user.lists.id(req.params.listId).items.id(req.params.itemId)[key] = req.body[key];
    }
    req.user.save(err => {
        if(err) {
            console.log(err);
            res.status(500).json({message: 'Nie można zaktualizować produktu'});
        } else {
            res.status(200).json(req.user.lists.id(req.params.listId).items.id(req.params.itemId));
        }
    });
}

exports.removeItem = (req, res) => {
    if(!req.user.lists.id(req.params.listId)) {
        res.status(400).json({message: 'Nie istnieje lista o podanym id'});
        return;
    }
    if(!req.user.lists.id(req.params.listId).items.id(req.params.itemId)) {
        res.status(400).json({message: 'Nie istnieje produkt o podanym id'});
        return;
    }
    req.user.lists.id(req.params.listId).items.pull(req.params.itemId);
    req.user.save(err => {
        if(err) {
            console.log(err);
            res.status(500).json({message: 'Nie można usunąć produktu'});
        } else {
            res.sendStatus(200);
        }
    });
}