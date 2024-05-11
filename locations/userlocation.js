import * as Location from "expo-location";
import axios from "axios";
import { Alert } from "react-native";

export const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission to access location was denied");
    return;
  }
  // Permission granted, get current location
  getCurrentLocation();
};

export const getCurrentLocation = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    if (location.coords) {
      try {
        const address = await getAddressFromCoordinates(
          location.coords.latitude,
          location.coords.longitude
        );
        if (address) {
          return address;
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.error("Error getting location:", error);
  }
};

const getAddressFromCoordinates = async (latitude, longitude) => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response) {
      try {
        const formattedAddress = response.data.results[0].formatted_address;
        return formattedAddress;
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.error("Error getting address:", error);
    return null;
  }
};

export const getLocationCords = async () => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    if (location.coords) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    }
  } catch (error) {
    console.error("Error getting location:", error);
  }
};

export const getPhone = async (placeId) => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,opening_hours&key=${apiKey}`;
    const response = await axios.get(url);
    if (response) {
      try {
        const phoneNumber = response.data.result.formatted_phone_number;
        if (phoneNumber) return phoneNumber;
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.error("Error getting address:", error);
    return null;
  }
};
