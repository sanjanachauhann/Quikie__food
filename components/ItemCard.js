import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { removeFromBasket } from "../features/basketSlice";
import { useDispatch } from "react-redux";

const ItemCard = ({ items }) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: "center",
        marginHorizontal: 5,
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: "orange", fontWeight: "bold", fontSize: 20 }}>
        {items.length}
      </Text>

      <Image
        source={require("../assets/tandoori.jpeg")}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          paddingHorizontal: 5,
        }}
      ></Image>
      <View style={{ width: 70 }}>
        {items.length > 15 ? (
          <Text style={{ fontSize: 12 }}>{items[0].name.slice(0, 15)}... </Text>
        ) : (
          <Text style={{ fontSize: 12 }}>{items[0].name} </Text>
        )}
      </View>
      <Text style={{ fontSize: 12 }}> Rs: {items[0].price}</Text>
      <TouchableOpacity
        style={{ backgroundColor: "#F3F4F6", borderRadius: 5, padding: 2 }}
        onPress={() => dispatch(removeFromBasket({ id: items[0].id }))}
      >
        <Text style={{ fontWeight: 600, color: "orange" }}> Remove </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;
