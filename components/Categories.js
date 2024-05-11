import { ScrollView } from "react-native";
import React from "react";
import CategoriesCard from "./CategoriesCard";
import { foodItems } from "../data/featuredrow";

const Categories = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {foodItems.map((food) => (
        <CategoriesCard
          key={food.id}
          id={food.id}
          imgUrl={food.img}
          title={food.title}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
