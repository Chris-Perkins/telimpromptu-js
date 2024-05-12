import { addDoc, query, where, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { roomsCollectionRef } from '../config/firebase';
import { playerCollectionRef } from '../config/firebase';

// To get data from firestore: docRef -> docSnapshot -> data

export async function saveRoomToDb(roomName, password) {
    try {
        const docRef = await addDoc(roomsCollectionRef, {
            roomName: roomName,
            password: password,  
            headlineWriterId: null,
            headline: null,
            isJoinable: true,
            hostPlayerId: null,
            topic: null,
            currentPage: null, // TODO: use this to track where players are. will be useful for rejoining the room
            gamesPlayed: 0, // TODO: use this for handling a "play new game" feature
            createdAt: new Date() 
        });
        return { success: true, roomId: docRef.id }
    } catch (error) {
        console.error(`Could not save room with name ${roomName}`, error)
        return { success: false }
    }
}

export async function getRoomDataFromRoomId(roomId) {
    try {
        const docRef = doc(roomsCollectionRef, roomId);
        console.log("hey", roomId);
        const docSnapshot = await getDoc(docRef);
        return {
            id: docSnapshot.id,
            ...docSnapshot.data()
        };
    } catch (error) {
        console.error('Error getting room data from room ID:', error);
        return null;
    }
}

export async function assignHostToRoom(roomId, playerId) {
    const roomDocRef = doc(roomsCollectionRef, roomId);
    try {
        await updateDoc(roomDocRef, {
            hostPlayerId: playerId
        });
        return { success: true, message: 'Host assigned successfully' };
    } catch (error) {
        console.error(`Could not assign host to room with id ${roomId}}`, error)
        return { success: false, message: 'Could not assign host' }
    }
}

// TODO: Change from passwords to access tokens. Share links to join with token in url
// something like const accessToken = uuidv4(); and const roomLink = `https:/telimpromptu.com/join?token=${accessToken}`;
// then use a useEffect hook to get the url params and authenticate 
export async function isRoomPasswordCorrect(roomId, password) {
    try {
        const data = await getRoomDataFromRoomId(roomId);
        return data.password === password;
    } catch (error) {
        console.error(`Could not check password for room with id ${roomId}}`, error)
        return false; 
    }
}

export async function isRoomNameAvailable(roomName) {
    try {
        const q = query(roomsCollectionRef, where('roomName', '==', roomName));
        const docSnapshot = await getDocs(q)
        return docSnapshot.empty;
    } catch (error) {
        console.error(`Could not check availability of room name ${roomName}}`, error)
        return false;
    }
}

export async function getRoomNameById(roomId) {
    try {
        const data = await getRoomDataFromRoomId(roomId);
        return data.roomName; 
    } catch (error) {
        console.error(`Could not get room name from room id ${roomId}}`, error)
    }
}

export async function isRoomJoinable(roomId) {
    try {
        const data = await getRoomDataFromRoomId(roomId);
        return data.isJoinable; 
    } catch (error) {
        console.error(`Could not get room join status from room id ${roomId}}`, error)
    }
}

export async function setIsRoomJoinable(roomId, bool) {
    const roomDocRef = doc(roomsCollectionRef, roomId);
    await updateDoc(roomDocRef, { isJoinable: bool });
}

export async function setRoomHeadline(roomId, headline) {
    const roomDocRef = doc(roomsCollectionRef, roomId);
    await updateDoc(roomDocRef, { headline: headline });
}

export async function setRoomTopic(roomId, topic) {
    const roomDocRef = doc(roomsCollectionRef, roomId);
    await updateDoc(roomDocRef, {topic: topic});
}

export async function updateRoomProperty(roomId, propertyName, propertyValue) {
    const roomDocRef = doc(roomsCollectionRef, roomId);
    try {
        await updateDoc(roomDocRef, { [propertyName]: propertyValue });
        console.log('Document successfully updated');
    } catch (error) {
        console.error('Error updating document: ', error);
    }
}


export async function getPlayersInRoom(roomId) {
    try {
        const roomPlayersQuery = query(playerCollectionRef, where('roomId', '==', roomId));
        const querySnapshot = await getDocs(roomPlayersQuery);
        const players = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return players;
    } catch (error) {
        console.error(`Error getting players from room ID ${roomId}:`, error);
        return {}
    }
}