module.exports = (app, dbService) => {
    app.get('/api', (req, res) => {
        res.send('my social network api')
    })

    //users routes
    app.get('/api/users', (req, res) => {
        dbService.users.getUsers().then(result => {
            res.json(result);
        }).catch(e => {
            res.status(500).json(e);
        })
    })
    app.get('/api/users/:id', (req, res) => {
        dbService.users.getSingleUser(req.params.id).then(result => {
            res.json(result);
        }).catch(e => {
            res.status(500).json(e);
        })
    })
    app.post('/api/users', (req, res) => {
        const user = req.body;
        dbService.users.addUser(user).then(() => {
            res.send('user added');
        }).catch(e => {
            res.status(500).json(e);
        })
    })
    app.post('/api/login', (req, res) => {
        const user = req.body;
        dbService.users.login(user).then(result => {
            res.json(result);
        }).catch(e => {
            res.status(500).json(e);
        })
    })
    app.get('/api/users/:id/friends', (req, res) => {
        const id = req.params.id;
        dbService.users.getFriends(id).then(result => {
            res.json(result);
        }).catch(e => {
            res.status(500).json(e);
        })
    })
    app.get('/api/users/search/:id/:name', (req, res) => {
        const name = req.params.name;
        const id = req.params.id;
        dbService.users.searchUsers(name, id).then(result => {
            res.json(result);
        }).catch(e => {
            res.status(500).json(e);
        })
    })

    //chat routes
    app.get('/api/chat/:id/:friend', (req, res) => {
        const id = req.params.id;
        const friend = req.params.friend;
        dbService.messages.getChat(id, friend).then(result => {
            res.json(result);
        }).catch(e => {
            res.status(500).json(e);
        });
    })

    app.post('/api/chat/:sender/:recipient', (req, res) => {
        const sender = req.params.sender;
        const recipient = req.params.recipient;
        const content = req.body.content;
        const dateSent = req.body.dateSent
        dbService.messages.addMessage({
            sender: parseInt(sender),
            recipient: parseInt(recipient),
            content: content,
            dateSent: dateSent
        }).then(() => {
            res.send("message sent")
        }).catch(e => {
            res.status(500).json(e)
        })
    })

    app.get('/api/chat/:sender/:recipient/lastmessage', (req, res) => {
        const sender = req.params.sender;
        const recipient = req.params.recipient;
        dbService.messages.getLastMessage(sender, recipient).then(result => {
            res.json(result);
        }).catch(e => {
            res.status(500).json(e);
        })
    })
}