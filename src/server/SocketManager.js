const io = require('./index.js').io;

const {VERIFY_USER , USER_CONNECTED , LOGOUT} = require('../Events');

const {createUser , createMessage , createChat} = require('../Factories')

let connectedUsers = { };

module.exports = function(socket){
    console.log("Socket Id " + socket.id);


    //Verify Username
        socket.on(VERIFY_USER , (nickname , callback)=>{
            if (isUser(connectedUsers , nickname)){
                callback({isUser:true , user:null});
            } else {
                callback({isUser:false , user:createUser({name:nickname})});
            }
        });
    //User Connects with the username
        socket.on(USER_CONNECTED, (user)=>{
            connectedUsers = addUser(connectedUsers, user);
            socket.user = user

            io.emit(USER_CONNECTED, connectedUsers);
            console.log(connectedUsers);
        });
    //User disconects

    //User logouts

};

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of users
*/

function addUser(userList, user){
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
}

/*
* Removes user from the list is passed in.
* @param userList {Object} Object with key value pairs of users
* @param username {String} name of user to be removed.
* @return userList {Object} Object with key value pairs of users
*/

function removeUser(userList, username){
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}

/*
* Checks if the user in list is passed in.
* @param userList {Object} Object with key value pairs of users
* @param username {String}
* @return userList {Object} Object with key value pairs of users
*/

function isUser(userList ,username){
    return username in userList
}