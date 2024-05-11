import { getLocationCords } from "../locations/userlocation";
import { useState, useEffect } from "react";
import axios from "axios";

export const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    getLocationCords()
      .then((location) => {
        setSearchQuery({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch((error) => {
        console.error("Error getting current location:", error);
      });
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      const location = `${searchQuery.latitude},${searchQuery.longitude}`;
      const radius = 500;
      const type = "restaurant";
      const limit = 10; // Limiting the results to 10 restaurants
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}&limit=${limit}`;

      try {
        const response = await axios.get(url);
        setRestaurants(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchQuery.latitude !== null && searchQuery.longitude !== null) {
      fetchRestaurants();
    }
  }, [searchQuery]);

  return restaurants;
};

export const HighestRatedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  const [searchQuery, setSearchQuery] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    getLocationCords()
      .then((location) => {
        setSearchQuery({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch((error) => {
        console.error("Error getting current location:", error);
      });
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      const location = `${searchQuery.latitude},${searchQuery.longitude}`;
      const radius = 500;
      const type = "restaurant";
      const limit = 10;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}&limit=${limit}`;

      try {
        const response = await axios.get(url);
        // Sort restaurants by rating from highest to lowest
        const sortedRestaurants = response.data.results.sort(
          (a, b) => b.rating - a.rating
        );
        setRestaurants(sortedRestaurants);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchQuery.latitude !== null && searchQuery.longitude !== null) {
      fetchRestaurants();
    }
  }, [searchQuery]);

  return restaurants;
};
