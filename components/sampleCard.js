import React from 'react'
import { Text, View, Image , StyleSheet} from 'react-native'
import ReusableButton from './ReusableButton'

const SampleCard = (props) => {
return(
  <View>
    <Image></Image>
    <Text>{props.barName}</Text>
    <ReusableButton title="enter line"></ReusableButton>
  </View>
)
}

export default SampleCard;

StyleSheet.create({

})