import React, {useEffect, useState} from 'react'
import { RefreshControl, FlatList, Image, TextInput, View, SafeAreaView, StyleSheet } from 'react-native'
import Card from './Card'
import { connect, useSelector} from 'react-redux'
import { firebase } from '../../firebase';


function ExploreScreen(props) { 
        const reduxState = useSelector(state => state.userState.lines)
        const [lines, setLines] = useState(props.lines)
        const [search, setSearch] = useState('');
        const [filteredData, setFilteredData] = useState(props.lines);
        useEffect(() => {
            if (lines != reduxState){
                setLines(reduxState);
            }
            console.log(reduxState)
        })

        const handleSearch = (text) => {
            const formattedSearch = text.toUpperCase();
            if (formattedSearch) {
                const newFilteredData = filteredData.filter((venue) => venue.venueName.toUpperCase().includes(formattedSearch));
                setFilteredData(newFilteredData);
                setSearch(text);
                console.log(filteredData)
            }
            else {
                setSearch('');
                setFilteredData(lines);
            }
        };

        const [refreshing, setIsFetching] = React.useState(false);

        const fetchData = () => {
            //props.dispatch(getAllTopicAction(userParamData));
            setIsFetching(false);
          };
          
          const onRefresh = () => {
            setIsFetching(true);
            fetchData();
          };
          

        return (
            <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                            style={styles.logo}
                            source={require('../../assets/bouncer-logo.png')}
                        />
                </View>
                <TextInput
                    style={styles.searchbar}
                    onChangeText={(text) => handleSearch(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    placeholder="Search venue lines"
                />
                <FlatList
                        data={filteredData}
                        extraData={reduxState}
                        renderItem={({item})=>{
                            return(
                                <Card 
                                    venueID={item.venueID}
                                    venueName={item.venueName}
                                    venueOpen={item.open}
                                    numberInLine={item.size}
                                    imageUrl={item.imageURL}
                                    favorite={item.favorite}
                                ></Card>
                            )
                        }}
                        keyExtractor={item=>item.venueID}

                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              
                />
            </View>
            </SafeAreaView>
    )
}

const mapStateToProps = (store) => ({
    venues: store.userState.venues,
    lines: store.userState.lines,
    favorites: store.userState.favorites,
})

export default connect(mapStateToProps,null)(ExploreScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000824'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logo: {
        width: 80,
        height: 80,
    },
    text: {
        color: '#ffffff'
    },
    searchbar: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#9CA4BE',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
    }
})