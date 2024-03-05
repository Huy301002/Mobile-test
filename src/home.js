import {
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "./utils/IP";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Footer from "./footer/footer";
import DateTimePicker from '@react-native-community/datetimepicker';
const { height, width } = Dimensions.get('window');
const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const navigation = useNavigation();
  const flatlistRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  const iconColor = '#6c5ce7';
  const handleGetStore = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const instance = axios.create({
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const response = await instance.get(
        `${baseUrl}/subdivisions`
      );
      SetData(response.data.result);
    } catch (error) {
      console.log("response error", error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginRight: 25 }} >
          <Ionicons name="menu" size={30} color="#26AAA0" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });
  // Data for carousel
  const carouselData = [
    {
      id: "01",
      image: require("../assets/1.jpg"),
    },
    {
      id: "02",
      image: require("../assets/2.jpg"),
    },
    {
      id: "03",
      image: require("../assets/3.jpg"),
    },
  ];

  const handleGetVillas = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const instance = axios.create({
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const response = await instance.get(
        `${baseUrl}/villas`
      );
      SetVilla(response.data.result);
    } catch (error) {
      console.log("response error", error);
    }
  };
  const villas = handleGetVillas();
  const villasResult = villas.then((value) => {
    // console.log(value); 
    return value;
  })
  const [villa, SetVilla] = useState(villasResult);

  const handleRestaurantPress = () => {
    navigation.navigate('Subdivision');
  };

  const result = handleGetStore();
  const dataResult = result.then((value) => {
    // console.log(value); 
    return value;
  })
 
  const [data, SetData] = useState(dataResult);

  const handlePress = () => {
    navigation.navigate('product');
  };
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

  const renderItem = ({ item, index }) => {
   
    const villaName = item.villa_name || '';
    const address = item.address || '';
    const area = item.area || '';
  
  
    const lowerCaseSearchTerm = searchTerm ? searchTerm.toLowerCase() : '';
    const isMatch = (
      villaName.toLowerCase().includes(lowerCaseSearchTerm) ||
      address.toLowerCase().includes(lowerCaseSearchTerm) ||
      area.toLowerCase().includes(lowerCaseSearchTerm)
    );
  
    if (searchTerm && !isMatch) {
      return null;
    }
  
    return (
      <View>
        <Image
          source={item.image}
          style={{ height: 500, width: screenWidth }}
        />
      </View>
    );
  };
  


  // Handle Scroll
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    console.log({ scrollPosition });
    const index = scrollPosition / screenWidth;
    console.log({ index });
    setActiveIndex(index);
  };


  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      const dotStyle = activeIndex === index
        ? styles.activeDot
        : styles.inactiveDot;

      return (
        <View
          key={index}
          style={dotStyle}
        />
      );
    });
  }
  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>

      <View>
        <FlatList
          data={carouselData}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
        />
        <View style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: 10,
          height: '25%'
        }}></View>
        {/* Search Container */}
        <View style={styles.searchContainer}>
          {/* Heading */}
          <Text style={styles.heading}>Latest reviews. Lowest prices.</Text>

          {/* Search Input */}
          <View style={styles.inputContainer}>
  <Ionicons name="search" size={20} color="#26AAA0" />
  <TextInput
    style={styles.input}
    placeholder="Search"
    value={searchTerm}
    onChangeText={(text) => setSearchTerm(text)}
  />
</View>


         

<TouchableOpacity
  style={styles.button}
  onPress={handleSearch}
>
  <Text style={styles.buttonText}>Find Villa</Text>
</TouchableOpacity>


        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 40,

          }}
        >
          {renderDotIndicators()}
        </View>
        <View style={styles.destinationContainer}>
          <Text style={styles.subHeading}>Explore Destinations</Text>
          <TouchableOpacity onPress={() => navigation.navigate('product')}>
            <Text style={styles.subHeading1}>Show all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -20 }}>

          <View
            style={{
              height: height / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Animated.FlatList
              ref={ref}
              data={data}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrentIndex((x / (width - 50)).toFixed(0));
              }}
              horizontal
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={handlePress}>
                    <View>
                      <Animated.View
                        style={{
                          width: width - 50,
                          height: height / 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 25,
                          marginRight: 25,
                        }}>

                        <ImageBackground
                          source={{ uri: item.image }}
                          resizeMode="cover"
                          style={{
                            width: '100%',
                            height: '90%',
                            borderRadius: 10,
                          }}
                          imageStyle={{ borderRadius: 10 }}
                        >
                          <View style={{
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: 10,
                            height: '90%'
                          }}>
                            <Text style={styles.locationText}>{`${item.subdivision_name} `}</Text>
                            <Text style={styles.locationText1}>{`${item.quantityVilla} villas `}</Text>
                          </View>

                          <TouchableOpacity
                            disabled={true}
                            style={{
                              width: '100%',
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}></TouchableOpacity>
                        </ImageBackground>
                      </Animated.View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {currentIndex == 0 ? null : (
            <TouchableOpacity
              style={[styles.prevButton, currentIndex === 0 && styles.disabledButton]}
              onPress={() => {
                setCurrentIndex(currentIndex - 1);
                ref.current.scrollToIndex({
                  animated: true,
                  index: parseInt(currentIndex) - 1,
                });
              }}
            >
              <Ionicons name="chevron-back" size={30} color={currentIndex === 0 ? '#ccc' : "#26AAA0"} />
            </TouchableOpacity>
          )}
          {data.length - 1 == currentIndex ? null : (
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(currentIndex + 1);
                ref.current.scrollToIndex({
                  animated: true,
                  index: parseInt(currentIndex) + 1,
                });
              }}
              style={[styles.nextButton, currentIndex >= data.length - 1 && styles.disabledButton]}
            >
              <Ionicons name="chevron-forward" size={30} color={currentIndex >= data.length - 1 ? '#ccc' : "#26AAA0"} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.destinationContainer1}>
          <Text style={styles.subHeading2}>Travelers'Choice:Top Villas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('product')}>
            <Text style={styles.subHeading3}>Show all</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={villa}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleRestaurantPress}>
            <View style={styles.container1} >
              <View style={styles.cardContainer}>
                <Image source={require('../assets/9.jpg')} style={styles.imageStyle} />
                <View style={styles.infoStyle}>
                  <Text style={styles.categoryStyle}>{`${item.address} `}</Text>
                  <Text style={styles.titleStyle}>{`${item.villa_name} `}</Text>

                  <View style={styles.iconLabelStyle}>
                    <Text style={{ marginLeft: 5, }}>area: {`${item.area} `}</Text>

                  </View>
                  <View style={styles.iconLabelStyle}>
                    {/* <Icon name="clock-o" size={20} color="black" /> */}
                    <Text style={{ marginLeft: 5, }}>stiff price: {`${item.stiff_price} `}$</Text>
                  </View>

                  <View style={styles.iconLabelStyle}>
                    {/* <Icon name="clock-o" size={20} color="black" /> */}
                    <Text style={{ marginLeft: 5, }}>status: {`${item.status} `}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      // keyExtractor={(item) => item.id.toString()}
      // showsVerticalScrollIndicator={false}

      />
      <Footer />
    </ScrollView>

  );
};

export default HomeScreen;
const offset = 40;
const radius = 10;
const borderWidth = 1;
const borderColor = 'rgba(0, 0, 0, 0.1)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    height: 310,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText1: {
    color: '#26AAA0',
    fontSize: 20,
    fontWeight: 'bold',

  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    marginTop: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  destinationContainer: {
    padding: 20,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinationContainer1: {
    marginTop: -20,
    marginBottom: -20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeading: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeading1: {
    marginRight: 5,
    fontSize: 18,

  },
  subHeading2: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subHeading3: {
    marginRight: 5,
    fontSize: 18,

  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 10,
    height: 90,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    opacity: 1,
  },
  inactiveDot: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    opacity: 0.5,
  },
  searchContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginTop: -400,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 40,
    marginTop: 15,
  },
  roomGuestContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  dateInput: {
    flex: 1,
  },
  roomGuestInput: {
    flex: 1,
  },
  dash: {
    marginHorizontal: 20,
  },

  button: {
    backgroundColor: '#26AAA0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Style for pagination dots container
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -30, // Adjust as necessary
  },
  prevButton: {
    position: 'absolute',
    left: 1,
    top: 140,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  nextButton: {
    position: 'absolute',
    right: 1,
    top: 140,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  disabledButton: {
    opacity: 0.5,
  },
  locationText: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 150, // Điều chỉnh vị trí theo yêu cầu
    left: 0,
    right: 0,
    textAlign: 'center', // Canh giữa chữ theo chiều ngang
  },
  locationText1: {
    color: 'red',
    fontSize: 18,
    position: 'absolute',
    bottom: 120, // Điều chỉnh vị trí theo yêu cầu
    left: 0,
    right: 0,
    textAlign: 'center', // Canh giữa chữ theo chiều ngang
  },
  container1: {
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: '90%',
    height: 350,
    borderRadius: radius,
    borderWidth: borderWidth,
    borderColor: borderColor,
    overflow: 'hidden', // Để clip các phần viền ra khỏi card
  },
  imageStyle: {
    height: 150,
    width: '100%',
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
});