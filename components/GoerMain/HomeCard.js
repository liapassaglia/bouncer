import React from 'react'
import { Text, View, Image , StyleSheet, Button, TouchableOpacity, Alert} from 'react-native'

import {firebase} from '../../firebase'
import { connect } from 'react-redux'

const HomeCard = (props) => {

  const leave = () => {
    firebase.firestore()
    .collection("lines")
    .doc(props.lineInfo.venueID)
    .collection('lineUsers')
    .doc(firebase.auth().currentUser.uid)
    .delete()

    firebase.firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .update({
      line: firebase.firestore.FieldValue.delete()
    })
  }

  const leaveLine = () => {
    Alert.alert(
      "Leave Line",
      "Are you sure you want to leave your spot in line?",
      [
        {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
        },
        { text: "OK", onPress: () => leave() }
      ]
    );
  }

  return (
    <View style={styles.container}>
    <View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:props.lineInfo.imageURL}}></Image>
      </View>
      <View style={styles.infoContainer}>
      </View>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}
      adjustsFontSizeToFit={true}
      numberOfLines={2}
      >{props.lineInfo.venueName}</Text>
    </View>
      <TouchableOpacity style = {styles.buttonInLine} onPress={() => leaveLine()}> 
        <Text style= {styles.buttonInLineText}>Leave Line</Text>
      </TouchableOpacity>
  </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  lineInfo: store.userState.lineInfo,
})

// const mapDispatchProps = (dispatch) => bindActionCreators({Favorite,Unfavorite}, dispatch);

export default connect(mapStateToProps,null)(HomeCard);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderWidth: 3,
    borderColor: '#9CA4BE',
    borderRadius: 6,
    height: 150,
    flexDirection: 'row',
    backgroundColor: '#000824'
    // flex: 1,
    // padding: 24,
  },
  imageContainer: {
    flexDirection: 'row',
    width: 150,
    height: 125,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
  },
  infoContainer:{
    flexDirection: 'row',
  },
  waitTime: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  info: {
    color: '#9CA4BE',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: undefined, 
    height: undefined,
    resizeMode: 'contain',
  },
  textContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 150,
    height: 75,
    padding: 2,
    justifyContent: 'center',
    // borderBottomLeftRadius : 10,
    // borderBottomRightRadius: 10
  },
  title: {
    color: "#FFFFFF",
    textAlign: "right",
    textAlignVertical: "center",
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  button: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 150,
    borderWidth: 3,
    borderColor: '#78C954',
    borderRadius: 5,
    padding: 7,
  },
  buttonText: {
    color: '#78C954',
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  },
  buttonInLine: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 150,
    borderWidth: 3,
    borderColor: '#FF5151',
    borderRadius: 5,
    padding: 7,
  },
  buttonInLineText: {
    color: '#FF5151',
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  }
 
})