import {
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  LogBox,
  TouchableOpacity,
  TextInput,
  Animated,
  Button,
  ImageBackground,
} from "react-native";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import RestaurantCard from "./component/card";
import Footer from "./footer/footer";
import TopNavigation from "./subdivision/TopNavigation";

const { height, width } = Dimensions.get("window");
const HomeScreen = async () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigation = useNavigation();
  const flatlistRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{ marginRight: 25 }}
        >
          <Ionicons name="menu" size={30} color="#26AAA0" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const response = await axios.get(
    "https://admin.reso.vn/api/v1/brand/B21E84CC-5BFF-408E-B38E-026AA996D251/stores?page=1&size=10",
    {}
  );
  console.log("response data", response.data);
  useEffect(async () => {
    // try {
    //   console.log("info", username + password);
    //   const response = await axios.get(
    //     "https://admin.reso.vn/api/v1/brand/B21E84CC-5BFF-408E-B38E-026AA996D251/stores?page=1&size=10",
    //     {}
    //   );
    //   console.log("response data", response.data);
    // } catch (error) {
    //   console.log("response data", error);
    // }
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

  const [restaurants, setRestaurants] = useState([
    {
      name: "Small Metal Ball",
      categories: "8424 Padberg Flats",
      deliveryTime: "$ 316.00/Night - FreeCancellation",
      distance: "Bad(12)",
      image: require("../assets/9.jpg"),
      id: 1,
    },
    {
      name: "Small Soft Ball",
      categories: "43299 Murazik Extension",
      deliveryTime: "$ 245.00/Night - FreeCancellation",
      distance: "Average(11)",
      image: require("../assets/10.jpg"),
      id: 2,
    },
    {
      name: "Incredible Wooden Ball",
      categories: "73311 Freida Point",
      deliveryTime: "$ 662.00/Night - FreeCancellation",
      distance: "Average(8)",
      image: require("../assets/11.jpg"),
      id: 3,
    },
    {
      name: "Handcrafted Wooden Towels",
      categories: "303 Volkman Lakes",
      deliveryTime: "$ 170.00/Night - FreeCancellation",
      distance: "Good(5)",
      image: require("../assets/12.jpg"),
      id: 4,
    },
    {
      name: "Handmade Wooden Mouse",
      categories: "52623 Donnie Roads",
      deliveryTime: "$ 223.00/Night - FreeCancellation",
      distance: "Good(14)",
      image: require("../assets/13.jpg"),
      id: 5,
    },
  ]);

  const handleRestaurantPress = () => {
    navigation.navigate("Subdivision"); // Chuyển hướng đến trang 'subdivision'
  };

  const [data, SetData] = useState([
    {
      id: "barcelona",
      image:
        "http://s3.amazonaws.com/redqteam.com/tripfinder-images/barcelona.jpg",
      name: "Barcelona",
      villas: 45667,
    },
    {
      id: "newyork",
      image:
        "http://s3.amazonaws.com/redqteam.com/tripfinder-images/newyork.jpg",
      name: "New York",
      villas: 19236,
    },
    {
      id: "london",
      image:
        "http://s3.amazonaws.com/redqteam.com/tripfinder-images/london.jpg",
      name: "London",
      villas: 54129,
    },
    {
      id: "sydney",
      image:
        "http://s3.amazonaws.com/redqteam.com/tripfinder-images/sydney.jpg",
      name: "Sydney",
      villas: 72770,
    },
  ]);
  const handlePress = () => {
    navigation.navigate("product");
  };
  //  Display Images // UI
  const renderItem = ({ item, index }) => {
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
      // Determine the style for the active and inactive dots
      const dotStyle =
        activeIndex === index ? styles.activeDot : styles.inactiveDot;

      return <View key={index} style={dotStyle} />;
    });
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
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: 10,
            height: "25%",
          }}
        ></View>
        {/* Search Container */}
        <View style={styles.searchContainer}>
          {/* Heading */}
          <Text style={styles.heading}>Latest reviews. Lowest prices.</Text>

          {/* Search Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="search" size={20} color="#26AAA0" />
            <TextInput
              style={styles.input}
              placeholder="Search 'Thailand, Asia'"
            />
          </View>

          {/* Date Range Input */}
          <View style={styles.dateRangeContainer}>
            <Ionicons name="calendar" size={20} color="#26AAA0" />
            <TextInput
              style={[styles.input, styles.dateInput]}
              placeholder="02/05/2024 - 02/09/2024"
              // onChangeText={(text) => setStartDate(text)}
              // value={startDate}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Find Hotels</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate("product")}>
            <Text style={styles.subHeading1}>Show all</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: -20,
          }}
        >
          <View
            style={{
              height: height / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.FlatList
              ref={ref}
              data={data}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={(e) => {
                const x = e.nativeEvent.contentOffset.x;
                console.log(x / width - 50);
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
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 25,
                          marginRight: 25,
                        }}
                      >
                        <ImageBackground
                          source={{ uri: item.image }}
                          resizeMode="cover"
                          style={{
                            width: "100%",
                            height: "90%",
                            borderRadius: 10,
                          }}
                          imageStyle={{ borderRadius: 10 }}
                        >
                          <View
                            style={{
                              ...StyleSheet.absoluteFillObject,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              borderRadius: 10,
                              height: "90%",
                            }}
                          >
                            <Text
                              style={styles.locationText}
                            >{`${item.name} `}</Text>
                            <Text
                              style={styles.locationText1}
                            >{`${item.villas} villas `}</Text>
                          </View>

                          <TouchableOpacity
                            disabled={true}
                            style={{
                              width: "100%",
                              height: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          ></TouchableOpacity>
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
              style={[
                styles.prevButton,
                currentIndex === 0 && styles.disabledButton,
              ]}
              onPress={() => {
                setCurrentIndex(currentIndex - 1);
                ref.current.scrollToIndex({
                  animated: true,
                  index: parseInt(currentIndex) - 1,
                });
              }}
            >
              <Ionicons
                name="chevron-back"
                size={30}
                color={currentIndex === 0 ? "#ccc" : "#26AAA0"}
              />
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
              style={[
                styles.nextButton,
                currentIndex >= data.length - 1 && styles.disabledButton,
              ]}
            >
              <Ionicons
                name="chevron-forward"
                size={30}
                color={currentIndex >= data.length - 1 ? "#ccc" : "#26AAA0"}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.destinationContainer1}>
          <Text style={styles.subHeading2}>Travelers'Choice:Top hotels</Text>
          <TouchableOpacity onPress={() => navigation.navigate("product")}>
            <Text style={styles.subHeading3}>Show all</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={handleRestaurantPress}>
            <RestaurantCard info={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
      <Footer />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    height: 310,
    justifyContent: "center",
    alignItems: "center",
  },
  linkText1: {
    color: "#26AAA0",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "100%",
    padding: 10,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  destinationContainer: {
    padding: 20,
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  destinationContainer1: {
    marginTop: -20,
    marginBottom: -20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subHeading: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  subHeading1: {
    marginRight: 5,
    fontSize: 18,
  },
  subHeading2: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  subHeading3: {
    marginRight: 5,
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 10,
    height: 90,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
    width: 20,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    opacity: 1,
  },
  inactiveDot: {
    backgroundColor: "#FFFFFF",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    opacity: 0.5,
  },
  searchContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    padding: 15,
    marginTop: -400,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dateRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  roomGuestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#ddd",
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
    marginHorizontal: 10,
  },

  button: {
    backgroundColor: "#26AAA0",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  // Style for pagination dots container
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -30, // Adjust as necessary
  },
  prevButton: {
    position: "absolute",
    left: 1,
    top: 140,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
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
    position: "absolute",
    right: 1,
    top: 140,
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
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
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    bottom: 150, // Điều chỉnh vị trí theo yêu cầu
    left: 0,
    right: 0,
    textAlign: "center", // Canh giữa chữ theo chiều ngang
  },
  locationText1: {
    color: "white",
    fontSize: 18,
    position: "absolute",
    bottom: 120, // Điều chỉnh vị trí theo yêu cầu
    left: 0,
    right: 0,
    textAlign: "center", // Canh giữa chữ theo chiều ngang
  },
});