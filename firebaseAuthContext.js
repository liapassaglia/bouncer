import * as React from 'react'
import {firebase} from './firebase'

var User = firebase.User;
var ContextState = {user: User};

const FirebaseAuthContext = React.createContext(ContextState);
const FirebaseAuthProvider= ({children}) => {
    const [user,setUser] = React.useState();
    const value = {user};
    React.useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
        return unsubscribe;
    },[]);
    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    )
}
function useFirebaseAuth() {
    const context = React.useContext(FirebaseAuthContext);
    if (context === undefined) {
        console.log( "useFirebaseAuth must be used within a FirebaseAuthProvider");
    }
    return context.user;
}

export {FirebaseAuthProvider, useFirebaseAuth};