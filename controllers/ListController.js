exports.getLists = (req, res) => {
    res.json(req.user.lists.map(x => ({_id: x._id, name: x.name, itemCount: x.items.length})));
}

exports.addList = (req, res) => {
    if(req.body.name) {
        if(nameRegex.test(req.body.name)) {
            req.user.lists.push({
                name: req.body.name,
                items: []
            });
            req.user.save(err => {
                if(err) {
                    res.status(500).json({message: 'Nie udało się utworzyć listy'});
                } else {
                    res.status(201).json([req.user.lists[req.user.lists.length-1]].map(x => ({id: x._id, name: x.name, itemCount: x.items.length}))[0]);
                }
            });
        } else {
            res.status(400).json({message: 'Nazwa zawiera niedozwolone znaki'});
        }
    } else {
        res.status(400).json({message: 'Nie podano nazwy listy'});
    }
}

exports.removeList = (req, res) => {
    req.user.lists = req.user.lists.filter(list => !list._id.equals(req.params.id));
    req.user.save(err => {
        err ? res.sendStatus(500) : res.sendStatus(200);
    });
}

exports.getItems = (req, res) => {
    const list = req.user.lists.find(list => list._id.equals(req.params.listId));
    if(typeof list !== 'undefined') {
        var result = list.toObject();
        result.items = result.items.map(x => {
            x.listId = list._id;
            return x;
        });
        res.json(result);
    } else {
        res.status(400).json({message: 'Nie istnieje lista o podanym id'});
    }
}

exports.addItem = (req, res) => {
    const index = req.user.lists.findIndex(list => list._id.equals(req.params.listId));
    if(index !== -1) {
        if(req.body.name) {
            if(nameRegex.test(req.body.name)) {
                if(/^(I'm |I am )/.test(req.body.name)) {
                    res.status(418).json({message: 'And I... am... a teapot'});
                    return;
                }
                req.user.lists[index].items.push(req.body);
                req.user.save(err => {
                    if(err) {
                        res.status(500).json({message: 'Nie można dodać produktu'});
                    } else {
                        res.status(201).json(req.user.lists[index].items[req.user.lists[index].items.length-1]);
                    }
                });
            } else {
                res.status(400).json({message: 'Nazwa zawiera niedozwolone znaki'});
            }
        } else {
            res.status(400).json({message: 'Nie podano nazwy produktu'});
        }
    } else {
        res.status(400).json({message: 'Nie istnieje lista o podanym id'});
    }
}

exports.updateItem = (req, res) => {
    const listIndex = req.user.lists.findIndex(list => list._id.equals(req.params.listId));
    if(listIndex !== -1) {
        const itemIndex = req.user.lists[listIndex].items.findIndex(item => item._id.equals(req.params.itemId));
        if(itemIndex !== -1) {
            if(Object.keys(req.body).length) {
                for(let key in req.body) {
                    req.user.lists[listIndex].items[itemIndex][key] = req.body[key];
                }
                req.user.save(err => {
                    if(err) {
                        res.status(500).json({message: 'Nie można zaktualizować produktu'});
                    } else {
                        res.status(200).json(req.user.lists[listIndex].items[itemIndex]);
                    }
                });
            } else {
                res.sendStatus(400);
            }
        } else {
            res.status(400).json({message: 'Nie istnieje produkt o podanym id'});
        }
    } else {
        res.status(400).json({message: 'Nie istnieje lista o podanym id'});
    }
}

exports.removeItem = (req, res) => {
    const listIndex = req.user.lists.findIndex(list => list._id.equals(req.params.listId));
    if(listIndex !== -1) {
        const itemIndex = req.user.lists[listIndex].items.findIndex(item => item._id.equals(req.params.itemId));
        if(itemIndex !== -1) {
            req.user.lists[listIndex].items.splice(itemIndex, 1);
            req.user.save(err => {
                if(err) {
                    res.status(500).json({message: 'Nie można usunąć produktu'});
                } else {
                    res.sendStatus(200);
                }
            });
        } else {
            res.status(400).json({message: 'Nie istnieje produkt o podanym id'});
        }
    } else {
        res.status(400).json({message: 'Nie istnieje lista o podanym id'});
    }
}