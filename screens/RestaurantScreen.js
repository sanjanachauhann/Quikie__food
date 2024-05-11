import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Fontisto, EvilIcons, Ionicons } from "@expo/vector-icons";
import DishCard from "../components/DishCard";
import Loader from "../components/Loader";
import { getAllMenu, getMenu } from "../lib/appwrite";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";
import BasketIcon from "../components/BasketIcon";

const RestaurantScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadMenu = async () => {
    setIsLoading(true);
    try {
      const menu = await getAllMenu();
      setMenuItems(menu);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setIsLoading(true);
    try {
      const menu = await getMenu(category);
      setMenuItems(menu);
    } catch (error) {
      Alert.alert(`Error fetching ${category} menu:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMenuItems = ({ item }) => (
    <DishCard
      id={item.$id}
      name={item.title}
      description={item.description}
      price={item.price}
      imgurl={item.image}
      quantity={item.quantity}
    />
  );

  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    latitude,
    longitude,
    refrenceID,
  } = route.params;

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        latitude,
        longitude,
        refrenceID,
      })
    );
  }, [dispatch]);
  return (
    <>
      {/* NAME AND RATING */}
      <BasketIcon />
      <View
        style={{
          backgroundColor: "white",
          padding: 2,
          marginHorizontal: 5,
        }}
      >
        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 1,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              backgroundColor: "orange",
              marginHorizontal: 10,
              alignItems: "center",
              marginTop: 25,
            }}
            onPress={handleBack}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color="black"
              style={{ marginTop: 6 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: "20%" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {title.length > 15
                ? `${title.slice(0, 15)}...`
                : title.charAt(0).toUpperCase() + title.slice(1)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 15,
              }}
            >
              {rating ? (
                <>
                  <Fontisto name="star" size={15} color="orange" />
                  <Text style={{ fontSize: 15, marginLeft: 5, color: "gray" }}>
                    {rating}
                  </Text>
                </>
              ) : (
                <>
                  <Fontisto name="star" size={15} color="#a3a3a3" />
                  <Text style={{ fontSize: 10, marginLeft: 5, color: "gray" }}>
                    No ratings available
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            paddingVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            marginHorizontal: 10,
          }}
        >
          <EvilIcons name="location" size={24} color="red" />
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              marginLeft: 5,
              flexWrap: "wrap",
              maxWidth: "90%",
            }}
          >
            {address.charAt(0).toUpperCase() + address.slice(1)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 10,
            marginTop: 10,
            paddingVertical: 5,
            height: 50,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          {/* Menu */}
          <View
            style={{
              height: 40,
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 7,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: 600 }}>Menu</Text>
          </View>
          <TouchableOpacity
            style={{
              borderColor: "#22c55e",
              padding: 6,
              borderRadius: 5,
              marginLeft: 10,
              borderWidth: 2,
              backgroundColor: "#86efac",
              height: 35,
              width: 45,
              alignItems: "center",
            }}
            onPress={() => handleCategorySelect("V")}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Veg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "#f43f5e",
              padding: 6,
              borderRadius: 5,
              marginLeft: 5,
              borderWidth: 2,
              backgroundColor: "#fb7185",
              height: 35,
              width: 80,
              alignItems: "center",
            }}
            onPress={() => handleCategorySelect("NV")}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Non-Veg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "#c084fc",
              padding: 6,
              borderRadius: 5,
              marginLeft: 5,
              borderWidth: 2,
              backgroundColor: "#d946ef",
              height: 35,
              width: 80,
              alignItems: "center",
            }}
            onPress={() => handleCategorySelect("D")}
          >
            <Text style={{ color: "white", fontSize: 14 }}>Deserts</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 10,
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <FlatList
              data={menuItems}
              keyExtractor={(item) => item.$id}
              renderItem={renderMenuItems}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default RestaurantScreen;
