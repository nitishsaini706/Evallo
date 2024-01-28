const redis = require('redis');

let redisClient;
let initiated=false;
(async () => {
    if(!initiated){

        redisClient = redis.createClient({
            host:"localhost",
            port:6379,
        });
    
        redisClient.on('error', (err) => {
            console.error('Redis error:', err);
        });
        initiated=true;
        await redisClient.connect();
    }
})();
async function set(key, value) {
    await redisClient.set(key, value);
}

async function get(key) {
    const value = await redisClient.get(key);
    return value;
}
async function del(key) {
    try{
        await redisClient.del(key);
    }catch(e){
        console.error(e);
    }
}
module.exports = { redisClient, get, set, del };
