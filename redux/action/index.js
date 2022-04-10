import { firebase } from '../../firebase';
import {USER_STATE_CHANGE, USER_LINE_INFO_STATE_CHANGE, USER_LINE_STATE_CHANGE, USER_SPOT_STATE_CHANGE, USER_FAVORITES_STATE_CHANGE, USER_VENUES_STATE_CHANGE, CLEAR_DATA} from '../constants'


export function fetchUser() {
    return((dispatch) => {
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot,error) => {
            if(snapshot.exists){
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            } else {
                console.log('does not exist')
            }
        })
    })
}

export function fetchFavorites() {
    let venues = [];
    let lines = [];
    return ((dispatch) => {
        firebase.firestore().collection('venues')
        .onSnapshot(collectionSnapshot => {
            collectionSnapshot
                .forEach(documentSnapshot => {
                    var venue = documentSnapshot.data();
                    venues.push(venue);
                });
        });
        firebase.firestore().collection('lines')
        .onSnapshot(snapshot => {
            snapshot.docs.forEach(doc=> {
                doc.ref.collection('lineUsers')
                .orderBy("time","asc")
                .onSnapshot((snapshot) => {
                    const size = snapshot.docs.length;
                    lines = venues.map(o => {
                        if (o.venueID === doc.id) {
                            o.open = true;
                            o.size = size;
                            return o;
                        } else {
                            o.open = false;
                            o.size = 0;
                            return o;
                        }
                    });
                    firebase.firestore().collection('following')
                    .doc(firebase.auth().currentUser.uid)
                    .collection('userFollowing')
                    .onSnapshot((snapshot) => {
                        let favorites = [];
                        const favoritesID = snapshot.docs.map(doc => {
                            const id = doc.id;
                            return id;
                        })
                        favoritesID.forEach(venueID => {
                            const obj = lines.find(o => o.venueID === venueID);
                            favorites.push(obj);
                        })
                        dispatch({type: USER_FAVORITES_STATE_CHANGE, favorites})
                    })
                });
            })
        })
    })
}
export function fetchLines(){
    let venues = [];
    var lines = [];
    return ((dispatch) => {
        firebase.firestore().collection('venues')
        .onSnapshot(collectionSnapshot => {
            collectionSnapshot
                .forEach(documentSnapshot => {
                    var venue = documentSnapshot.data();
                    venues.push(venue);
                });
        });
        firebase.firestore().collection('lines')
        .onSnapshot(snapshot => {
            snapshot.docs.forEach(doc=> {
                doc.ref.collection('lineUsers')
                .orderBy("time","asc")
                .onSnapshot((snapshot) => {
                    const size = snapshot.docs.length;
                    lines = venues.map(o => {
                        if (o.venueID === doc.id) {
                            o.open = true;
                            o.size = size;
                            return o;
                        } else {
                            o.open = false;
                            o.size = 0;
                            return o;
                        }
                    });
                    firebase.firestore().collection('following')
                    .doc(firebase.auth().currentUser.uid)
                    .collection('userFollowing')
                    .onSnapshot((snapshot) => {
                        const favoritesID = snapshot.docs.map(doc => {
                            const id = doc.id;
                            return id;
                        })
                        if (favoritesID.length == 0){
                            lines.forEach(line => line.favorite = false);
                        } else {
                            lines = lines.map(line => {
                                if(favoritesID.some(e => e == line.venueID)){
                                    line.favorite = true;
                                    return line;
                                } else {
                                    line.favorite = false;
                                    return line;
                                }
                            })
                        }
                        dispatch({type: USER_LINE_STATE_CHANGE, lines})
                    })
                });
        })
    })
})}

export function fetchVenues(){
    return ((dispatch) => {
        var venues = [];
        firebase.firestore().collection('venues')
        .get()
        .then(collectionSnapshot => {
            collectionSnapshot
                .forEach(documentSnapshot => {
                    var venue = documentSnapshot.data();
                    venues.push(venue);
                    dispatch({type: USER_VENUES_STATE_CHANGE, venues: venues})
                });
        });
    })
}

export function fetchLineInfo() {
    return ((dispatch) => {
        let data = {};
        firebase.firestore().collection('lines')
        .get()
        .then(snapshot => {
            snapshot.docs.forEach(doc=> {
                doc.ref.collection('lineUsers')
                .orderBy("time","asc")
                .onSnapshot((snapshot) => {
                    const size = snapshot.docs.length;
                    let userInfo = {};
                    let spot = 1;
                    snapshot.docs.forEach(doc => {
                        const id = doc.id;
                        if (doc.id == firebase.auth().currentUser.uid){
                            userInfo = {id, spot}
                        }
                        spot++;
                    })
                    const lineInfo = {
                        venueID: doc.id,
                        numberInLine: size,
                        spot: userInfo.spot,
                    }
                    dispatch({type: USER_LINE_INFO_STATE_CHANGE, lineInfo: lineInfo})
                })
            });
        })
    })
}
