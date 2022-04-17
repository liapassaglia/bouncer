import { firebase } from '../../firebase';
import {USER_STATE_CHANGE, VENUE_STATE_CHANGE, USER_LINE_INFO_STATE_CHANGE, USER_LINE_STATE_CHANGE, USER_SPOT_STATE_CHANGE, USER_FAVORITES_STATE_CHANGE, USER_VENUES_STATE_CHANGE, CLEAR_DATA} from '../constants'


export function fetchUser() {
    return((dispatch) => {
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot,error) => {
            if(snapshot.exists){
                console.log(snapshot.data())
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            } else {
                console.log('does not exist')
            }
        })
    })
}

export function fetchVenue() {
    return((dispatch) => {
        firebase.firestore()
        .collection('venues')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot,error) => {
            if(snapshot.exists){
                console.log(snapshot.data())
                dispatch({type: VENUE_STATE_CHANGE, currentVenue: snapshot.data()})
            } else {
                console.log('does not exist')
            }
        })
    })
}

export function fetchFavorites() {
    let lines = [];
    let favorites = [];
    return ((dispatch) => {
        firebase.firestore().collection('venues')
        .onSnapshot(collectionSnapshot => {
            collectionSnapshot
                .forEach(documentSnapshot => {
                    var venue = documentSnapshot.data();
                    var index = lines.findIndex(f => f.venueID == venue.venueID)
                    if (index == -1){
                        lines.push(venue)
                    }
                });
        });
        firebase.firestore()
        .collection('venues')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot,error) => {
            if(snapshot.exists){
                var index = lines.findIndex(f => f.venueID == snapshot.id)
                if (index != -1){
                    lines[index].open = true;
                }
            }
        })
        firebase.firestore().collection('lines')
        .onSnapshot(snapshot => {
            snapshot.docs.forEach(doc=> {
                var index = lines.findIndex(f => f.venueID == doc.id)
                if (index != -1){
                    lines[index].open = true;
                }
                doc.ref.collection('lineUsers')
                .orderBy("time","asc")
                .onSnapshot((snapshot) => {
                    const size = snapshot.docs.length;
                    index = lines.findIndex(f => f.venueID == doc.id)
                    if (index != -1){
                        lines[index].size = size;
                    }
                });
        })
        })
        firebase.firestore().collection('following')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(docSnap => {
            docSnap.ref.collection('userFollowing')
            .onSnapshot((snapshot) => {
                // favoritesID = all venues user is following
                favorites = snapshot.docs.map(doc => {
                    // find index of line info
                    const index = lines.findIndex(f => f.venueID == doc.id)
                    const id = doc.id;
                    console.log(index)
                    if (index != -1){
                        return lines[index]
                    }
                    return;
                })
                dispatch({type: USER_FAVORITES_STATE_CHANGE, favorites})
            })
        })
    })
}

export function fetchLines(){
    let favorites = [];
    let lines = [];
    return ((dispatch) => {
        firebase.firestore().collection('venues')
        .onSnapshot(collectionSnapshot => {
            collectionSnapshot
                .forEach(documentSnapshot => {
                    var venue = documentSnapshot.data();
                    var index = lines.findIndex(f => f.venueID == venue.venueID)
                    if (index == -1){
                        lines.push(venue)
                    }
                });
        });
        firebase.firestore()
        .collection('venues')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot,error) => {
            if(snapshot.exists){
                var index = lines.findIndex(f => f.venueID == snapshot.id)
                if (index != -1){
                    lines[index].open = true;
                }
            }
        })
        firebase.firestore().collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .onSnapshot((snapshot) => {
                favorites = [];
                // favoritesID = all venues user is following
                favorites = snapshot.docs.map(doc => {
                    // find index of line info
                    const index = lines.findIndex(f => f.venueID == doc.id)
                    if (index != -1){
                        return lines[index]
                    }
                    return;
                })
                lines.forEach(line => {
                    line.favorite = false;
                })
                favorites.forEach(favorite => {
                    const index = lines.findIndex(f => f.venueID == favorite.venueID)
                    if (index != -1){
                        lines[index].favorite = true;
                    }
                })
                dispatch({type: USER_LINE_STATE_CHANGE, lines: lines})
        })
        firebase.firestore().collection('lines')
        .onSnapshot(snapshot => {
            snapshot.docs.forEach(doc=> {
                var index = lines.findIndex(f => f.venueID == doc.id)
                if (index != -1){
                    lines[index].open = true;
                }
                doc.ref.collection('lineUsers')
                .orderBy("time","asc")
                .onSnapshot((snapshot) => {
                    const size = snapshot.docs.length;
                    index = lines.findIndex(f => f.venueID == doc.id)
                    if (index != -1){
                        lines[index].size = size;
                    }
                });
        })
        })
        dispatch({type: USER_LINE_STATE_CHANGE, lines})
    })
}

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

export function clearData() {
    return ((dispatch) => {
        dispatch({ type: CLEAR_DATA })
    })
}

export function reload() {
    return ((dispatch) => {
        dispatch(clearData())
        dispatch(fetchUser())
        dispatch(fetchVenue())
        dispatch(fetchVenues())
        dispatch(fetchFavorites())
        dispatch(fetchLines())
        dispatch(fetchLineInfo())
    })
}