import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { resetRestaurant, selectRestaurant } from "../features/restaurantSlice";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { emptyBasket } from "../features/basketSlice";

const EndScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  useEffect(() => {
    ``;
    const disableBackHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.navigate("BasketScreen"); // Navigate to BasketScreen
        return true; // Returning true prevents default back navigation
      }
    );

    return () => {
      disableBackHandler.remove(); // Cleanup function to remove event listener
    };
  }, [navigation]);

  const handleDone = () => {
    dispatch(emptyBasket()); // Dispatch emptyBasket action to reset the basket
    dispatch(resetRestaurant());
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fb923c" }}>
      <SafeAreaView>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 50,
            marginHorizontal: 20,
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            // style={{ marginTop: 50, marginLeft: 30 }}
            onPress={() => navigation.navigate("BasketScreen")}
          >
            <MaterialIcons name="cancel" size={30} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 17, color: "white", fontWeight: 300 }}>
            Order help
          </Text>
        </View>

        {/* view2 */}
        <View
          style={{
            marginHorizontal: 5,
            marginTop: 2,
            padding: 20,
            zIndex: 50,
            backgroundColor: "black",
            borderRadius: 10,
            // flexDirection: "row",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                Estimated Arrival Time
              </Text>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "white" }}
              >
                40-45 Minutes
              </Text>
            </View>
            <Animatable.Image
              source={require("../assets/animated.gif")}
              animation="slideInUp"
              iterationCount={1}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          </View>
          <Progress.Bar size={30} indeterminate={true} color="#f97316" />
          <View style={{ marginTop: 10 }}>
            {restaurant.title ? (
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                Your order at {restaurant.title} is being prepared!
              </Text>
            ) : (
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
              >
                Your order is being prepared!
              </Text>
            )}
          </View>
        </View>
      </SafeAreaView>
      <MapView
        initialRegion={{
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{ flex: 1, marginTop: 10, zIndex: 0 }}
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
          }}
          title={restaurant.title}
          identifier="origin"
          pinColor="orange"
        />
      </MapView>
      <SafeAreaView>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            height: 60,
            borderRadius: 5,
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleDone()}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Done! <AntDesign name="arrowright" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default EndScreen;
