import React from "react";
import { FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleCard from "../components/TitleCard";
import TitleMenu from "../components/TitleMenu";
import useAppwrite from "../lib/useAppwrite";
import { getAllMenuItems } from "../lib/appwrite";
import Loader from "../components/Loader";
import BasketIcon from "../components/BasketIcon";

const Menus = () => {
  const route = useRoute();
  const { id, imgUrl, title } = route.params;
  const { data: menuItems, isLoading } = useAppwrite(getAllMenuItems, {
    title,
  });

  const renderMenuItem = ({ item }) => (
    <TitleMenu
      id={item.$id}
      name={item.title}
      description={item.description}
      price={item.price}
      quantity={item.quantity}
      imgurl={item.Image}
    />
  );

  return (
    <>
      <BasketIcon />
      <SafeAreaView style={{ flex: 1 }}>
        <TitleCard id={id} imgUrl={imgUrl} title={title} />
        {isLoading ? (
          <Loader />
        ) : menuItems.length > 0 ? (
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.$id}
            renderItem={renderMenuItem}
          />
        ) : (
          <Loader />
        )}
      </SafeAreaView>
    </>
  );
};

export default Menus;
