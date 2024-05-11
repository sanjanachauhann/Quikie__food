import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import {
  requestLocationPermission,
  getCurrentLocation,
} from "../locations/userlocation";
import SearchBarComponent from "../components/SearchBarComponent";
import { useAddress } from "../context/AddressContext";
import {
  HighestRatedRestaurants,
  NearbyRestaurants,
} from "../components/NearByRestaurant";
import FeaturedDishCard from "../components/FeaturedDishCard";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { updateAddress } = useAddress();
  const [address, setAddress] = useState("");
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const restaurants = NearbyRestaurants();
  const topRated = HighestRatedRestaurants();

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleGetCurrentLocation = async () => {
    try {
      const locationAddress = await getCurrentLocation();
      setAddress(locationAddress);
      updateAddress(locationAddress);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingTop: 4, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 3,
          alignItems: "center",
          backgroundColor: "white",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        {/* header */}
        <Image
          source={require("../assets/delivery.png")}
          style={{
            height: 50,
            width: 50,
            borderRadius: 40,
          }}
        ></Image>

        <View
          style={{ flex: 1, marginLeft: 5, justifyContent: "space-between" }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#A9A9A9", // Or any other shade of gray you prefer
              fontSize: 12,
            }}
          >
            {" "}
            Order now!
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20, // Adjust size as needed
              marginRight: 5, // Adjust margin as needed
              paddingRight: 3,
            }}
          >
            Current location
            <AntDesign
              name="down"
              size={15}
              color="orange"
              style={{ padding: 5 }}
            />
          </Text>
          {address && (
            <View style={{ margin: 2, flexDirection: "row" }}>
              <EvilIcons name="location" size={16} color="black" />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ maxWidth: "80%", color: "gray", fontSize: 11 }}
              >
                {address}
              </Text>
            </View>
          )}
        </View>
        <View style={{ marginRight: 15 }}>
          <AntDesign name="user" size={24} color="black" />
        </View>
      </View>

      {/* search */}
      <SearchBarComponent />

      {/* Body */}

      <ScrollView>
        {/* Categories */}
        <Categories />
        {/* Features */}
        <FeaturedRow
          title={"Offers near you"}
          description={"Free delivery on All orders!!"}
          list={restaurants}
        />
        <FeaturedRow
          title={"Top Rated"}
          description={"Highest rated restaurants near you"}
          list={topRated}
        />
        <FeaturedDishCard
          title={"Hot Picks for the Week!"}
          description={"Highest rated dishes and cuisines"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
