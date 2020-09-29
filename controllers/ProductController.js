exports.getProducts = (req, res) => {
    var data = {
        name: 'Wszytkie produkty',
        items: [],
        itemCount: 0
    };
    for(list of req.user.lists) {
        data.items = data.items.concat(list.items.toObject().map(x => {
            x.listId = list._id;
            return x;
        }));
    }
    data.itemCount = data.items.length;
    res.json(data);
}

exports.countProducts = (req, res) => {
    var count = 0;
    for(list of req.user.lists) {
        count += list.items.length;
    }
    res.json({productCount: count});
}