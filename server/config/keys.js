if (process.env.NODE_ENV === 'production'){
    module.exports = require('./prod'); // export the prod keys to who ever is asking for it
} else {
    module.exports = require('./prod'); // export the dev keys to who ever is asking for it
}