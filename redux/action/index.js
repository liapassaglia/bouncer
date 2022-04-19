import { firebase } from '../../firebase';
import {USER_STATE_CHANGE, VENUE_STATE_CHANGE, USER_LINE_INFO_STATE_CHANGE, USER_LINE_STATE_CHANGE, USER_SPOT_STATE_CHANGE, USER_FAVORITES_STATE_CHANGE, USER_VENUES_STATE_CHANGE, CLEAR_DATA} from '../constants'


export function fetchUser() {
    return((dispatch) => {
        firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot,error) => {
            if(snapshot.exists){
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
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
                dispatch({type: VENUE_STATE_CHANGE, currentVenue: snapshot.data()})
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
                dispatch(fetchLines());
            })
        })
    })
}

export function fetchLines(){
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
        firebase.firestore().collection('following')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(docSnap => {
            docSnap.ref.collection('userFollowing')
            .onSnapshot((snapshot) => {
                // favoritesID = all venues user is following
                snapshot.docs.map(doc => {
                    // find index of line info
                    const index = lines.findIndex(f => f.venueID == doc.ref.id)
                    if (index != -1){
                        lines[index].favorite = true;
                    }
                    return;
                })
            })
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
                    console.log('testing')
                    dispatch({type: USER_LINE_STATE_CHANGE, lines})
                });
        })
    })
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
    let venues = [];
    return ((dispatch, getState) => {
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
                const venueIndex= venues.findIndex(f => f.venueID == doc.id)
                if(venueIndex == -1){
                    return;
                }
                const venue = venues[venueIndex]
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
                        venueName: venue.venueName,
                        imageURL: venue.imageURL
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