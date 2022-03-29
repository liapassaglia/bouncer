import React from 'react'
import { Text, View, Image , StyleSheet, Button, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
//import styles from '../screens/GoerHomeScreen/styles'
//import styles from '../screens/GoerHomeScreen/styles'
//import styles from '../screens/GoerHomeScreen/styles'
import ReusableButton from './ReusableButton'

const Card = (props) => {
  if (props.numberInLine != 0){
  return(
    <View style={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri:props.imageUrl}}></Image>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.waitTime}>
            <Icon
            name='user-plus'
            type='font-awesome'
            color='#9CA4BE'
            />
            <Text style={styles.info}>{props.numberInLine}</Text>
          </View>
          <View style={styles.waitTime}>
            <Icon
            name='clock-o'
            type='font-awesome'
            color='#9CA4BE'
            />
            <Text style={styles.info}> ~{props.waitTime} min</Text>
          </View>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}
        adjustsFontSizeToFit={true}
        numberOfLines={2}
        >{props.venueName}</Text>
      </View>
        <TouchableOpacity style = {styles.button}>
          <Text style= {styles.buttonText}>Enter Line</Text>
        </TouchableOpacity>
    </View>
  )} 
  return (
    
    <View style={styles.container}>
    <View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:props.imageUrl}}></Image>
      </View>
      <View style={styles.infoContainer}>
      </View>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}
      adjustsFontSizeToFit={true}
      numberOfLines={2}
      >{props.venueName}</Text>
    </View>
      <TouchableOpacity style = {styles.buttonNoLine} disabled={true} > 
        <Text style= {styles.buttonNoLineText}>No Line</Text>
      </TouchableOpacity>
  </View>
  )
}

export default Card;

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
    height: 90,
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
  buttonNoLine: {
    position: "absolute",
    right: 10,
    bottom: 10,
    width: 150,
    borderWidth: 3,
    borderColor: '#9CA4BE',
    borderRadius: 5,
    padding: 7,
  },
  buttonNoLineText: {
    color: '#9CA4BE',
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center"
  }
 
})