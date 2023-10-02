const dbService = () => {
    const knex = require('knex')({
        client: 'mysql2',
        connection: {
            host: process.env.dbHost,
            port: process.env.dbPort,
            user: process.env.dbUser,
            password: process.env.dbPassword,
            database: process.env.db
        }
    });

    const tables = {
        users: 'users',
        stories: 'stories',
        storyViews: 'story_views',
        message: 'messages',
        friends: 'friends',
        friendsRequests: 'friends_requests',
        userInterests: 'users_interests',
        interests: 'interests'
    }

    const users = {
        getUsers: () => {
            return knex(tables.users).select();
        },
        addUser: ({firstName, lastName, email, password, birthdate, gender, profilePicture, country}) => {
            return knex(tables.users).insert({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                birthdate: birthdate,
                gender: gender,
                profile_picture: profilePicture,
                country: country
            });
        },
        deleteUser: (id) => {
            return knex(tables.users).where({id: id}).update({
                is_active: false
            });
        },
        getSingleUser: (id) => {
            return knex(tables.users).where({id: id}).select();
        },
        login: ({email, password}) => {
            return knex(tables.users).where({
                email: email,
                password: password
            }).count().select('id');
        },
        updateUser: (id, {firstName, lastName, email, password, birthdate, gender, profilePicture, country}) => {
            return knex(tables.users).where({id: id}).update({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                birthdate: birthdate,
                gender: gender,
                profile_picture: profilePicture,
                country: country
            })
        },
        getUserId: (email) => {
            return knex(tables.users).where({email: email}).select()
        },
        getFriends: (id) => {
            return knex.raw('call sp_get_friends(?)', [id])
        },
        searchUsers: (name, id) => {
            return knex(tables.users)
            .whereRaw(`CONCAT(first_name, ' ', last_name) LIKE '${name}%'`)
            .whereNot({id: id}).select()
        },
        verifyFriend: (user1, user2) => {
            return knex(tables.friends).where({user1: user1, user2: user2})
            .orWhere({user1: user2, user2: user1}).count()
        },
        sendFriendRequest: ({requester, requested, requestDate}) => {
            return knex(tables.friendsRequests).insert({
                requester: requester,
                requested: requested,
                request_date: requestDate
            })
        },
        verifyRequest: (user1, user2) => {
            return knex.raw('call sp_verify_requests(?, ?)', [user1, user2])
        },
        answerRequest: ({requester, requested, answer}) => {
            return knex.raw('call sp_answerRequest(?, ?, ?)', [requester, requested, answer])
        },
        getRequests: (id) => {
            return knex.raw('call getRequests(?)', [id])
        }
    }

    const messages = {  
        addMessage: ({sender, recipient, content, dateSent, timezone}) => {
            console.log(timezone)
            return knex(tables.message).insert({
                sender: sender,
                recipient: recipient,
                content: content,
                date_sent: dateSent,
                timezone: timezone
            })
        },

        getChat: (sender, recipient) => {
            return knex(tables.message).where({
                sender: sender,
                recipient: recipient
            }).
            orWhere({
                sender: recipient,
                recipient: sender
            }).orderBy('date_sent').select();
        },

        getLastMessage: (sender, recipient) => {
            return knex(tables.message).where({
                sender: sender,
                recipient: recipient
            })
            .orWhere({
                sender: recipient,
                recipient: sender
            }).orderBy('date_sent', 'desc').select().first()
        }
    }

    const interests = {
        addInterests: (interests, user) => {
            let query = `insert into ${tables.userInterests} (user_id, interest) values `
            interests.map((i, index) => index + 1 < interests.length? query = query.concat(`(${user}, ${i}), `): query = query.concat(`(${user}, ${i}) `))
            return knex.raw(query)
        },
        getUserInterests: (user) => {
            return knex.raw('call sp_get_interests(?)', [user])
        },
        getInterests: () => {
            return knex(tables.interests).select()
        }
    }

    return{
        users,
        messages,
        interests
    }
}

module.exports = {dbService}
