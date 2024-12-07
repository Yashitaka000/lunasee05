import { db } from '../firebase/config';
import { collection, doc, setDoc, getDocs, Timestamp, query, deleteDoc } from 'firebase/firestore';
import { User } from '../types';

export async function saveUser(userId: string, userData: User) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const trackedUsersRef = doc(collection(userDocRef, 'trackedUsers'), userData.id);
    
    // Firestoreに保存する前にデータを変換
    const firestoreData = {
      ...userData,
      lastPeriodStart: Timestamp.fromDate(userData.lastPeriodStart),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(trackedUsersRef, firestoreData);
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

export async function getTrackedUsers(userId: string): Promise<User[]> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const trackedUsersRef = collection(userDocRef, 'trackedUsers');
    const q = query(trackedUsersRef);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        lastPeriodStart: data.lastPeriodStart.toDate(),
      } as User;
    });
  } catch (error) {
    console.error('Error getting tracked users:', error);
    throw error;
  }
}

export async function deleteUser(userId: string, trackedUserId: string) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const trackedUserRef = doc(collection(userDocRef, 'trackedUsers'), trackedUserId);
    await deleteDoc(trackedUserRef);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}