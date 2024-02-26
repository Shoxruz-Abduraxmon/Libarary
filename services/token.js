const jwt = require('jsonwebtoken');

const generatorToken = userId => {
    const jwtToken = jwt.sign({userId}, process.env.jwt_secret, {expiresIn: '30d'});

    return jwtToken
}

module.exports = generatorToken;