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
        message: 'messages'
    }

    const users = {
        getUsers: () => {
            return knex(tables.users).select();
        },
        addUser: ({firstName, lastName, email, password, birthdate, gender, profilePicture}) => {
            return knex(tables.users).insert({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                birthdate: birthdate,
                gender: gender,
                profile_picture: profilePicture
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
        updateUser: (id, {firstName, lastName, email, password, birthdate, gender, profilePicture}) => {
            return knex(tables.users).where({id: id}).update({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                birthdate: birthdate,
                gender: gender,
                profile_picture: profilePicture
            })
        },
        getFriends: (id) => {
            return knex(tables.users).whereNot({id: id}).select()
        }
    }

    const messages = {
        addMessage: ({sender, recipient, content, dateSent}) => {
            return knex(tables.message).insert({
                sender: sender,
                recipient: recipient,
                content: content,
                date_sent: dateSent
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
        }
    }

    return{
        users,
        messages
    }
}

module.exports = {dbService}
