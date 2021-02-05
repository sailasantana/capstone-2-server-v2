const bcrypt = require('bcrypt');const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../src/config');

const sessionObj = {
    first_name: "Saila",
    last_name: "Kath",
    user_name: "blah",
    password: "gelloeee@1A"
    }

function makeAuthHeader(user, secret = JWT_SECRET) {
    const session_token = jwt.sign(
        sessionObj, secret, {expiresIn : '15m'}   
    )
    return session_token;
}

console.log(makeAuthHeader(sessionObj,secret = JWT_SECRET))





function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('doggoUser').insert(preppedUsers)
        .then(() => {
            db.raw(
                `SELECT setval('doggoUser_id_seq), ?)`,
                [users[users.length - 1].id]
            )
        })
}

module.exports = { makeAuthHeader,seedUsers }