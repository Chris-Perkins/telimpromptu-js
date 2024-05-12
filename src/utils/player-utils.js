import { addDoc, query, where, doc, getDoc, getDocs, updateDoc, serverTimestamp } from 'firebase/firestore';
import { playerCollectionRef } from '../config/firebase';
import { getRoomDataFromRoomId } from './room-utils';
import { segments } from '../script-building/segments';

export async function savePlayerToDb(playerName, roomId) {
    try {
        // TODO: make availability check work
        const available = await isPlayerNameAvailable(playerName, roomId);
        if (available) {
            const docRef = await addDoc(playerCollectionRef, {
                playerName: playerName,
                roomId: roomId,
                isReady: false,
                role: null,
                topicVote: null,
                prompts: [],
                createdAt: new Date(),
                lastActive: new Date(),
            });
            return { success: true, playerId: docRef.id };
        } else {
            return { success: false, errorMessage: 'Name taken' };
        }
    } catch (error) {
        console.error('Error in player creation process: ', error);
        return { success: false, errorMessage: 'Failed to create player due to an error.' };
    }
}

export async function getPlayerDataFromPlayerId(playerId) {
    try {
        const docRef = doc(playerCollectionRef, playerId);
        const docSnapshot = await getDoc(docRef);
        return {
            id: docSnapshot.id,
            ...docSnapshot.data()
        };
    } catch (error) {
        console.error('Error getting player data from player ID:', error);
        return null;
    }
}

export async function getPlayerNameFromPlayerId(playerId) {
    try {
        const data = await getPlayerDataFromPlayerId(playerId);
        return data.playerName
    } catch (error) {
        console.error('Error getting name', error)
    }
}

export async function getRoomIdFromPlayerId(playerId) {
    try {
        const data = await getPlayerDataFromPlayerId(playerId);
        return data.roomId;
    } catch (error) {
        console.error(`Could not get room id from player id: ${playerId}`)
    }
}

export async function isAllTopicVotesIn(roomId) {
    const q = query(playerCollectionRef, where('roomId', '==', roomId), where('topicVote', '==', null));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
}

export async function setPromptAssignments(playerId, promptIds) {
    try {
        const docRef = playerCollectionRef.doc(playerId);
        await updateDoc(docRef, {prompts: promptIds})
        console.log(`Field "${promptIds}" added to player "${playerId}" successfully.`);
        return { success: true }
    } catch (error) {
        console.error("Error adding field to document: ", error);
        return { success: false }
    }
}

export async function playerSendHeartBeat(playerId) {
    const playerRef = doc(playerCollectionRef, playerId);
    const timestamp = serverTimestamp();

    try {
        await updateDoc(playerRef, {lastActive: timestamp});
    } catch (error) {
        console.error(error);
    }
}

export async function removePlayerFromRoom(playerId) {
    // TODO: implement this
    // TODO: check if the last player is leaving the room. If so, delete the room.
    const playerRef = doc(playerCollectionRef, playerId);
    //const docSnapshot = await getDoc(playerRef);

    try {
        await updateDoc(playerRef, { roomId: null});
    } catch(error) {
        console.error(error);
    }
}

export async function isPlayerNameAvailable(playerName, roomId) {
    try {
        const q = query(playerCollectionRef, where('roomId', '==', roomId));
        const querySnapshot = await getDocs(q);
        const isAvailable = !querySnapshot.docs.some(doc =>
            doc.data().playerName.toLowerCase() === playerName.toLowerCase());
        return isAvailable;
    } catch (error) {
        console.error('Error checking player name availability: ', error);
        return false;
    }
}

export async function getListOfPlayersFromRoomId(roomId) {
    const q = query(playerCollectionRef, where('roomId', '==', roomId));
    try {
        const querySnapshot = await getDocs(q);
        const players = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return players;
    } catch (error) {
        console.error('Error fetching players:', error);
        return [];
    }
}

export async function isHeadlineWriter(playerId) {
    try {
        const roomId = await getRoomIdFromPlayerId(playerId);
        const roomData = await getRoomDataFromRoomId(roomId);
        return roomData.headlineWriterId === playerId
    } catch (error) {
        console.error('Error in checking headline writer:', error);
        return false;
    }
}

export async function setPlayerPromptAssignments(playerId, promptIds) {
    console.log("hey alex");
    try {
        const docRef = doc(playerCollectionRef, playerId);
        await updateDoc(docRef, {prompts: promptIds});
        return { success: true };
    } catch (error) {
        console.error("Error adding value to map field: ", error);
        return { success: false };
    }
}

export async function getAvailablePromptsForPlayer(playerId) {
    try {
        const playerData = await getPlayerDataFromPlayerId(playerId);
        console.log('playerdata', playerData)
        console.log('players prompts are', playerData.prompts)
        // TODO: make this work w group prompts
        const promptIds = playerData.prompts;
        const allPrompts = segments.reduce((acc, segment) => [...acc, ...segment.prompts], []);
        return allPrompts.filter(prompt => promptIds.includes(prompt.id));
    } catch (error) {
        console.log(error)
    }
}