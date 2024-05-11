import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemswithId,
} from "../features/basketSlice";
import { useSelector, useDispatch } from "react-redux";

const DishCard = ({ id, name, description, price, imgurl, quantity }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isPressedMinus, setIsPressedMinus] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemswithId(state, id));

  const handlePressAdd = () => {
    setIsPressed(!isPressed);
    dispatch(addToBasket({ id, name, description, price }));
  };
  const handlePressMinus = () => {
    if (!items.length > 0) return;
    setIsPressedMinus(!isPressedMinus);
    dispatch(removeFromBasket({ id }));
  };
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        // backgroundColor: "pink",
        marginBottom: 10,
        borderRadius: 5,
        marginHorizontal: 5,
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
          // backgroundColor: "purple",
          width: "60%",
          padding: 4,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: 600 }}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "100%",
            paddingVertical: 5,
          }}
        >
          <Text style={{ fontSize: 13, color: "gray" }}>{description}</Text>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: "#475569" }}>Quantity: {quantity}</Text>
          <Text style={{ color: "#475569" }}>Price(Rs): {price} </Text>
        </View>
        {/* Add buttons */}

        <View style={{ flexDirection: "row", padding: 5 }}>
          <TouchableOpacity
            style={{ paddingRight: 6 }}
            onPress={handlePressAdd}
          >
            <AntDesign
              name="pluscircle"
              size={24}
              color={isPressed ? "orange" : "black"}
            />
          </TouchableOpacity>

          <Text> {items.length} </Text>

          <TouchableOpacity
            style={{ paddingLeft: 6 }}
            onPress={handlePressMinus}
            disabled={!items.length}
          >
            <AntDesign
              name="minuscircle"
              size={24}
              color={isPressedMinus ? "orange" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Image tag */}
      <View style={{ marginRight: 5 }}>
        <Image
          source={{ uri: imgurl }}
          style={{
            height: 200,
            width: 120,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default DishCard;
