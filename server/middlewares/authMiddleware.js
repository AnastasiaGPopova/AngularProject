const jwt = require('../lib/jsonwebtoken');
const SECRET = 'victoriasecret';

exports.authentication = () => async (req, res, next) => {
 

    let numberS = "-1"
    const index = req.rawHeaders.indexOf('X-Authorization')

    // console.log(index)

    if (index !== Number(numberS)) {
        try {
            const token = req.rawHeaders[index+1]
            // console.log(token)
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            console.log(req.user)
        } catch(err) {
            return console.log(err)
        }
    }
    
    next();
};