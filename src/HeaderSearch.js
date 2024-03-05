    import React from 'react';
    import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
    import Ionicons from 'react-native-vector-icons/Ionicons';
    import { useNavigation } from '@react-navigation/native';

    const CustomInput = ({ icon, ...rest }) => (
        <View style={styles.inputContainer}>

            <TextInput {...rest} style={styles.input} />
            <TouchableOpacity style={styles.iconContainer}  onPress={handleSearch}>
                <Ionicons name={icon} size={24} color="#999" />
            </TouchableOpacity>
        </View>
    );
    const handleSearch = async () => {
        try {
          const response = await instance.get(`${baseUrl}/search?term=${searchTerm}`);
          SetData(response.data.result);
          setSearchTerm('');
        } catch (error) {
          if (error.response) {
            
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            
            console.error("No response received:", error.request);
          } else {
           
            console.error("Error during request setup:", error.message);
          }
        }
        
      };
    const SearchHeader = () => {
        const navigation = useNavigation();
        
        const handleLogoPress = () => {
            navigation.navigate('HomeDrawer');
        };
        return (
            <View style={styles.header}>
            <TouchableOpacity onPress={handleLogoPress}>
                    <Image source={require('../assets/favicon copy.png')} style={styles.logo} />
                </TouchableOpacity>
                <CustomInput
                    placeholder="Search 'VietNam, Asia'"
                    placeholderTextColor="rgb(44, 44, 44)"
                    icon="search"
                    style={styles.input}
                    onChangeText={(text) => setSearchTerm(text)}
                />
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="menu" size={30} color="#26AAA0" />
                </TouchableOpacity>
            </View>
        );
    };

    const styles = StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
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
