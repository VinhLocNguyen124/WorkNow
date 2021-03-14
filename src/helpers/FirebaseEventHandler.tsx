//Firebase 
import database from '@react-native-firebase/database';
import { fetchData, getData } from '../apis/apiCaller';

const checkExistingRoom = (iduser1: String, iduser2: string, loadRoomInfo: Function, createNewRoom: Function) => {
    const query = database().ref("roomchats").orderByKey();
    query.once("value")
        .then(snapshot => {
            let check = false;
            //Kiểm tra id room đã tồn tại chưa
            snapshot.forEach(child => {
                const key = child.key;
                if (key === (iduser1 + "_" + iduser2) || key === (iduser2 + "_" + iduser1)) {
                    //Room có tồn tại -> tải room data về
                    loadRoomInfo(key);
                    check = true;
                    return true;
                }
            });

            //Room chưa tồn tại -> tạo mới room 
            if (!check) {
                createNewRoom();
            }

        });
};

const getUserInfo = async (iduser: string) => {
    const userInfo = await getData("users/userinfo/" + iduser);
    return userInfo;
}

const createNewRoomChat = (iduser1: String, iduser2: string) => {

    const roomKey = '/roomchats/' + iduser1 + "_" + iduser2;
    const roomRef = database().ref(roomKey);

    roomRef.set({
        iduser1: iduser1,
        iduser2: iduser2,
        unread: false
    }).then(() => {
        const newMessage = database()
            .ref(roomKey + "/messages")
            .push();

        newMessage
            .set({
                content: " Nhắn tin với nhau thôi nào !! ^_^ ",
                email: "",
                time: Date.now(),
                username: "admin"
            })
    });
}

const loadRoomChatContent = async (key: string, callback: Function) => {

    const query = database().ref("roomchats/" + key + "/messages").orderByKey();
    query.once("value")
        .then(snapshot => {
            let messages = [];
            if (snapshot) {
                snapshot.forEach(child => {
                    messages.push(child.val());
                });
                callback(messages.reverse());
            }
        });
}

const getListRoomChat = (idCurrentUser: string, callback: Function) => {
    const query = database().ref("roomchats").orderByKey();
    query.once("value")
        .then(async snapshot => {
            let rooms = [];
            if (snapshot) {

                snapshot.forEach(async child => {
                    const room = child.val();

                    if ((idCurrentUser === room.iduser1 || idCurrentUser === room.iduser2) && room.lastMessage) {
                        let idUserGuess = "";

                        if (room.iduser1 === idCurrentUser) {
                            idUserGuess = room.iduser2;
                        } else if (room.iduser2 === idCurrentUser) {
                            idUserGuess = room.iduser1;
                        }

                        rooms.push({
                            _id: child.key,
                            idguess: idUserGuess,
                            message: room.lastMessage,
                            time: room.time,
                            unread: room.unread
                        });

                    }
                });

                callback(rooms);
            }
        });
}



const insertMessage = (msg: string, roomKey: string, user, callback: Function) => {
    const newMessage = database()
        .ref('/roomchats/' + roomKey + '/messages')
        .push();

    newMessage
        .set({
            content: msg,
            email: user.email,
            time: Date.now(),
            username: user.username,
            urlavatar: user.urlavatar
        }).then(() => {
            callback();
        });

    database()
        .ref("/roomchats/" + roomKey)
        .update({
            lastMessage: msg,
            time: Date.now(),
            unread: true
        })

}

const markAsReadMessage = (roomKey: string) => {
    database()
        .ref("/roomchats/" + roomKey)
        .update({
            unread: true
        })
}

export {
    checkExistingRoom,
    getUserInfo,
    createNewRoomChat,
    loadRoomChatContent,
    insertMessage,
    markAsReadMessage,
    getListRoomChat
};