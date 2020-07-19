import { userCollection } from '..';
import { User as FirebaseUser, firestore } from 'firebase';

interface AdditionalProps {
  displayName?: string;
}

let userDocument: firestore.DocumentReference | null;

const createUser = async (
  user: FirebaseUser,
  additionalProps: AdditionalProps
) => {
  const userRef = userCollection.doc(`${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    try {
      const { email, displayName, photoURL } = user;
      const userObj = {
        email,
        photoURL,
        displayName,
        ...additionalProps
      };
      await userRef.set(userObj);
      return userObj;
    } catch (error) {
      console.error(`Error while creating document`, error);
    }
  }

  return getUser(user.uid);
};

const getUser = async (uid: string) => {
  try {
    const userDocument = await getUserDocumentData(uid);
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {}
};

const getUserDocumentData = async (uid: string) => {
  return await getUserDocument(uid).get();
};
function getUserDocument(uid: string) {
  if (!userDocument) {
    userDocument = userCollection.doc(uid);
  }
  return userDocument;
}

const resetUser = () => {
  userDocument = null;
};

export { createUser, getUser, getUserDocument, userDocument, resetUser };
