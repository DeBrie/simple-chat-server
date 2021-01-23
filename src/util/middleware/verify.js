const AccessToken = require('../../models/AccessToken');
const User = require('../../models/User');
const failed = { ok: -1 }
const success = { ok: 1 }
function verify(token) {
    return new Promise((res, reject) => {
        AccessToken.findOne({ token: token }, function (err, token) {
            if (err) reject({ ...failed, err })
            if (!token) reject({ ...failed })
            if (Math.round((Date.now() - token.created) / 1000) > 3600) {
                AccessToken.deleteMany({ token: token }, (err) => err && reject({ ...failed, err }));
                reject({ ...failed, message: 'Token expired' });
            }
            User.findById(token.userId, function (err, user) {
                if (err) reject({ ...failed, err })
                if (!user) reject({ ...failed, message: 'Unknown user' })
                const info = { scope: '*' };
                res({ ...success, ...user, ...info });
            });
        });
    })
}

module.exports = verify;