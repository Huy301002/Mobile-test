import React,{useState} from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// import Sidebar from './sidebar'; 

const CustomInput = ({ icon, ...rest }) => (
    <View style={styles.inputContainer}>

        <TextInput {...rest} style={styles.input} />
        <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name={icon} size={24} color="#999" />
        </TouchableOpacity>
    </View>
);

const SearchHeader = () => {
    const handleLogoPress = () => {
        navigation.navigate('HomeDrawer');
    };

    const navigation = useNavigation();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleLogoPress}>
                {/* <Image source={require('../assets/favicon copy.png')} style={styles.logo} /> */}
            </TouchableOpacity>
            <CustomInput
                placeholder="Search 'VietNam, Asia'"
                placeholderTextColor="rgb(44, 44, 44)"
                icon="search"
                style={styles.input}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        height: 120,
        paddingTop: 30,

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(237, 237, 237)',
        borderWidth: 1,
        borderColor: 'rgb(235, 235, 235)',
        borderRadius: 5,
        width: 250,
        height: 50,
        marginLeft: 5,
    },
    logo: {
        width: 24,
        height: 27,
        marginLeft: 10,
    },
    input: {
        fontSize: 18,
        paddingHorizontal: 10,
        flex: 1,
        color: 'rgb(44, 44, 44)',
       
    },
    iconContainer: {
        padding: 10,
    },
    menuButton: {
        marginRight: 2,
    },
});

export default SearchHeader;
