import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import FeaturedDishes from "./FeaturedDishes";
import { getAllMenu } from "../lib/appwrite";

const FeaturedDishCard = ({ title, description }) => {
  const [menuItems, setMenuItems] = useState([]);

  const loadMenu = async () => {
    try {
      const menu = await getAllMenu();
      setMenuItems(menu);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
      <Text style={{ color: "gray", fontSize: 12, marginHorizontal: 10 }}>
        {description}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: 9 }}
      >
        {menuItems.map((dish, index) => (
          <FeaturedDishes
            key={index}
            title={dish.title}
            rating={dish.rating}
            description={dish.description}
            image={dish.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedDishCard;
