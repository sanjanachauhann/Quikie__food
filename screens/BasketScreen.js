import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import ItemCard from "../components/ItemCard";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useAddress } from "../context/AddressContext";

const BasketScreen = () => {
  const navigation = useNavigation();
  const address = useAddress();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setgroupedItemsInBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setgroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "grainsboro" }}>
          <View
            style={{
              // backgroundColor: "purple",
              alignItems: "flex-start",
              padding: 5,
            }}
          >
            {/* header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",

                width: "100%",
              }}
            >
              <View
                style={{
                  alignItems: "center",

                  width: "90%",
                  marginTop: "10%",
                  paddingLeft: "10%",
                }}
              >
                <Text
                  style={{ color: "black", fontWeight: "bold", fontSize: 25 }}
                >
                  Order
                </Text>
                <Text>{restaurant.title}</Text>
              </View>
              <TouchableOpacity
                style={{ marginTop: 20, marginRight: 10 }}
                onPress={navigation.goBack}
              >
                <MaterialIcons name="cancel" size={24} color="orange" />
              </TouchableOpacity>
            </View>

            {/* Delivery address */}
            <View
              style={{
                backgroundColor: "white",
                // height: 50,
                justifyContent: "flex-start",
                // paddingHorizontal: 5,
                marginTop: "5%",
                width: "100%",
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text style={{ fontWeight: "500" }}>
                {" "}
                Deliver to this address :
              </Text>
              <View
                style={{
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  paddingVertical: 2,
                }}
              >
                <Entypo name="location-pin" size={24} color="black" />
                <View>
                  <Text
                    style={{
                      color: "gray",
                      fontSize: 13,
                      marginLeft: 5,
                      flexWrap: "wrap",
                      // maxWidth: "0%",
                    }}
                  >
                    {address.currentAddress.slice(0, 90)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* order items  */}
          <ScrollView style={{ backgroundColor: "white" }}>
            {/* item card  */}
            {Object.entries(groupedItemsInBasket).map(([key, items]) => (
              <View key={key}>
                <ItemCard items={items} />
              </View>
            ))}
          </ScrollView>
          {/* end  */}
          {/* total subtotal  */}
          <View
            style={{
              backgroundColor: "white",
              // marginTop: "90%",
              alignContent: "stretch",
              padding: 10,
              borderRadius: 10,
              marginHorizontal: 7,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 12, color: "gray" }}> Subtotal </Text>
              <Text style={{ fontSize: 12, color: "black" }}>
                Rs {basketTotal}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 12, color: "gray" }}>
                {" "}
                Delivery Fee{" "}
              </Text>
              <Text style={{ fontSize: 12, color: "black" }}>Rs 50 </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 12, color: "gray" }}> Order total </Text>
              <Text style={{ fontSize: 12, color: "black" }}>
                {"Rs  "}
                {basketTotal + 50}{" "}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              height: 60,
              marginHorizontal: 10,
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              alignItems: "center",
              marginTop: 5,
            }}
            onPress={() => navigation.navigate("PreparingOrderScreen")}
          >
            <View
              style={{
                backgroundColor: "darkorange",
                height: 35,
                width: 35,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>
                {items.length}
              </Text>
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Place Order{" "}
              <AntDesign name="arrowright" size={24} color="black" />
            </Text>

            <Text style={{ fontSize: 20, color: "white" }}>
              <FontAwesome name="rupee" size={21} color="white" />
              {basketTotal + 50}
            </Text>
          </TouchableOpacity>
          {/* </View> */}
          {/* end  */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BasketScreen;
