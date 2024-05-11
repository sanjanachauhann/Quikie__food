import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemswithId,
} from "../features/basketSlice";
import { useSelector, useDispatch } from "react-redux";

const TitleMenu = ({ id, imgurl, name, description, price, quantity }) => {
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
        backgroundColor: "white",
        marginBottom: 10,
        borderRadius: 5,
        marginBottom: 10,
      }}
    >
      {/* <View> */}
      <Image
        source={{ uri: imgurl }}
        style={{ height: 200, width: 150, borderRadius: 20 }}
      />
      {/* </View> */}
      <View
        style={{
          alignItems: "flex-start",
          marginLeft: 10,

          flex: 1,
        }}
      >
        <View
          style={{ backgroundColor: "#fdba74", padding: 5, borderRadius: 5 }}
        >
          <Text style={{ fontSize: 16, fontWeight: 600 }}>{name}</Text>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text style={{ color: "#78716c", fontSize: 12 }}>
            Quantity: {quantity}{" "}
          </Text>
          <Text style={{ color: "#78716c", fontSize: 12 }}>
            Price(Rs): {price}{" "}
          </Text>
          <Text style={{ color: "#78716c", fontSize: 12 }}>Description:</Text>
        </View>
        {/* Add buttons */}
      </View>
      <View
        style={{
          flexDirection: "column",
          marginVertical: 40,
          justifyContent: "space-evenly",
          marginRight: 15,
        }}
      >
        <TouchableOpacity onPress={handlePressAdd}>
          <AntDesign
            name="pluscircle"
            size={24}
            color={isPressed ? "orange" : "black"}
          />
        </TouchableOpacity>

        <Text> {items.length} </Text>

        <TouchableOpacity onPress={handlePressMinus}>
          <AntDesign
            name="minuscircle"
            size={24}
            color={isPressedMinus ? "orange" : "black"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TitleMenu;
