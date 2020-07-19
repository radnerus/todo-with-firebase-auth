import { auth } from '..';
import { createUser } from './user';

const signUpUser = async (
  displayName: string,
  email: string,
  password: string
) => {
  try {
    const userCredentials = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(userCredentials.user);
    if (!userCredentials?.user) {
      return console.error('Error while creating user');
    }
    const user = await createUser(userCredentials.user, { displayName });
    console.log(user);
    return user;
  } catch (e) {
    alert(`Couldn't signup at the moment! Try again later`);
  }
};

const signIn = async (email: string, password: string) => {
  try {
    return await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error(`Error while signing in`, error);
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    console.error(e);
  }
};

export { signUpUser, signIn, logout };
