import { store } from "./store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import BasketScreen from "./screens/BasketScreen";
import Menus from "./screens/Menus";
import SearchResults from "./components/SearchResults";
import { AddressProvider } from "./context/AddressContext";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import EndScreen from "./screens/EndScreen";
import DishScreen from "./screens/Dish";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <AddressProvider>
          {/* Wrap the Provider with AddressProvider */}
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Restaurant"
              component={RestaurantScreen}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="BasketScreen"
              component={BasketScreen}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="Menus"
              component={Menus}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="SearchResults"
              component={SearchResults}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="PreparingOrderScreen"
              component={PreparingOrderScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EndScreen"
              component={EndScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Dish"
              component={DishScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </AddressProvider>
      </Provider>
    </NavigationContainer>
  );
}
