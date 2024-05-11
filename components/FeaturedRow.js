import { View, Text, ScrollView } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import RestaurantCard from "./RestaurantCard";

const FeaturedRow = ({ title, description, list }) => {
  const restaurants = list;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            alignContent: "flex-end",
            marginHorizontal: 10,
            backgroundColor: "#fdba74",
            height: 40,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>{title}</Text>
        </View>

        <AntDesign
          name="arrowright"
          size={24}
          color="orange"
          style={{ marginLeft: 10, marginTop: 10 }}
        />
      </View>
      <Text
        style={{
          color: "gray",
          fontSize: 12,
          marginHorizontal: 15,
          marginTop: 5,
        }}
      >
        {description}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: 9 }}
      >
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            id={restaurant.id}
            imgUrl={restaurant.photos}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type}
            address={restaurant.vicinity}
            refrenceID={restaurant.reference}
            latitude={restaurant.geometry.location.lat}
            longitude={restaurant.geometry.location.lng}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
