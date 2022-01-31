import React from 'react'
import { Text, View, Image , StyleSheet, Button} from 'react-native'
//import styles from '../screens/GoerHomeScreen/styles'
//import styles from '../screens/GoerHomeScreen/styles'
//import styles from '../screens/GoerHomeScreen/styles'
import ReusableButton from './ReusableButton'

const SampleCard = (props) => {
return(
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{props.barName}</Text>
      <View style = {styles.button}>
       <Button title="enter line" color="white"/>
       </View>
    </View>
  </View>
)
}

export default SampleCard;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 6,
    height: 150,
    flexDirection: 'row',
    backgroundColor: "#02075D"
    // flex: 1,
    // padding: 24,
  },
  textContainer: {
    position: "absolute",
    width: 250,
    height: 60,
    right: 25,
    top: 30,
    padding: 2,
    //backgroundColor: "#FFFFFF"
    // borderBottomLeftRadius : 10,
    // borderBottomRightRadius: 10
  },
  title: {
    color: "#FFFFFF",
    textAlign: "right",
    fontSize: 30,
    fontWeight: "bold"
  },
  button: {
    position: "absolute",
    right: 0,
    top: 50,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 3
  }
})