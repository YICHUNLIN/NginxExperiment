
var io = require('socket.io');
var count = 0;
const selfName = process.env.name;
const connect_redis = process.env.connect_redis;
const redis_port = process.env.redis_port;
const redis_pwd = process.env.redis_pwd;
const adapter = require('socket.io-redis')({host: connect_redis, port: redis_port, auth_pass: redis_pwd});
module.exports = (server, option) => {
    option = option || {};
    const ws = io(server, option);
    ws.adapter(adapter);
    ws.origins('*:*');
    console.log('web socket is running', `Redis ${connect_redis}:${redis_port}`);

    ws.use((socket, next) => {
      let token = socket.handshake.query.auth_token;
      if (token && (token == '123a456')) {
        return next();
      }
      
      return next(new Error('authentication error'));
    });

    ws.on('connection', (socket) => {
      socket.emit('Init_Ack', { status: 'INIT', from:  selfName});
      const id = `${selfName}:${++count}`;
      socket.emit('login success', { id });
      socket.on('dologin', (data) => {
        socket.user_info = data;
        socket.user_info.id = id;
        socket.broadcast.emit('user joined', socket.user_info);
      });
      socket.on('disconnect', (socket) => {
      });
    });
    return ws;
};