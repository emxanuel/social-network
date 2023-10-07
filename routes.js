const moment = require('moment')
module.exports = (app, dbService) => {
    app.get('/api', (req, res) => {
        res.send('My social network api')
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
            res.json(result[0]);
        }).catch(e => {
            res.status(500).json(e);
        })
    })
    app.get('/api/users/email/:email', (req, res) => {
        dbService.users.getUserId(req.params.email).then(result => {
            res.json(result[0].id)
        }).catch(e => {
            res.status(500).json(e)
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
            res.json(result[0]["count(*)"]);
        }).catch(e => {
            res.status(500).json(e);
        })
    })
    app.get('/api/users/:id/friends', (req, res) => {
        const id = req.params.id;
        dbService.users.getFriends(id).then(result => {
            res.json(result[0][0]);
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
    app.get('/api/users/verify/:user1/:user2', (req, res) => {
        const user1 = req.params.user1;
        const user2 = req.params.user2;
        dbService.users.verifyFriend(user1, user2).then(result => {
            res.json(result[0]["count(*)"]);
        }).catch(e => {
            res.status(500).json(e)
        })
    })
    app.get('/api/users/:id/requests', (req, res) => {
        const id = req.params.id;
        dbService.users.getRequests(id).then(result => {
            res.json(result[0][0]);
        }).catch(e => {
            res.status(500).json(e)
        })
    })
    app.post('/api/users/request/', (req, res) => {
        const data = req.body;
        dbService.users.sendFriendRequest(data).then(() => {
            res.send('request sended');
        }).catch(e => {
            res.status(500).json(e)
        })
    })
    app.get('/api/users/request/:user1/:user2', (req, res) => {
        const user1 = req.params.user1;
        const user2 = req.params.user2;
        dbService.users.verifyRequest(user1, user2).then((result) => {
            res.json(result[0][0][0]);
        }).catch(e => {
            res.status(500).json(e);
        })
    })
    app.post('/api/users/request/:user1/:user2', (req, res) => {
        data = req.body
        dbService.users.answerRequest(data).then(() => {
            res.json('request answered')
        }).catch(e => {
            res.status(500).json(e)
        })
    })
    app.get('/api/users/picture/no-picture', (req, res) => {
        res.sendFile(__dirname + '/media/default/no-profile-photo.jpg')
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
        let dateSent = req.body.dateSent;
        const timezone = req.body.timezone
        dateSent = moment(dateSent, 'M/D/YYYY, h:mm:ss A').format('YYYY-MM-DD HH:mm:ss')
        
        dbService.messages.addMessage({
            sender: parseInt(sender),
            recipient: parseInt(recipient),
            content: content,
            dateSent: dateSent,
            timezone: timezone
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

    //interests routes
    app.get('/api/interests', (req, res) => {
        dbService.interests.getInterests().then(result => {
            res.json(result)
        }).catch(e => {
            res.status(500).json(e)
        })
    })
    app.get('/api/interests/:user', (req, res) => {
        const user = req.params.user
        dbService.interests.getUserInterests(user).then(result => {
            res.json(result[0][0])
        }).catch(e => {
            res.status(500).json(e)
        })
    })
    app.post('/api/interests/:user', (req, res) => {
        const user = req.params.user
        const body = req.body
        dbService.interests.addInterests(body.interests, user).then(() => {
            res.json({
                response: 'interests added',
                ...body
            })
        }).catch(e => {
            res.status(500).json(e)
        })
    })
}