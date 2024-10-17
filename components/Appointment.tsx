import { defaultStyles } from "@/constants/Styles";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeOutLeft, FadeInRight } from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Feature } from "@/interfaces/service";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import appointmentsData from "@/assets/data/appointments.json"; // Adjust the path if necessary
// Define the structure of your appointment based on the JSON data
import { AppointmentData } from "@/interfaces/appointment";
import { Stack, useRouter, Href } from "expo-router";

const Appointment = ({ data }: { data: AppointmentData }) => {
  const router = useRouter();

  const handlePress = () => {
    const href: Href = { pathname: "/(modals)/insurance" };
    router.push(href);
    console.log("Appointment clicked");
  };
  return (
    <TouchableOpacity>
      <Animated.View
        style={styles.listing}
        entering={FadeInRight}
        exiting={FadeOutLeft}
      >
        <View style={styles.row}>
          <View>
            <Text style={styles.name}>{data.providerName}</Text>
            <Text style={styles.type}>{data.specialty}</Text>
            <Text style={styles.address}>{data.hospitalName}</Text>

            <View style={styles.row}>
              <Text style={styles.address}>{data.date} @ </Text>
              <Text style={styles.address}>{data.time}</Text>
            </View>
          </View>
        </View>

        {/* Moved Ride Status above the scheduleContainer */}
        <View style={styles.rideStatusContainer}>
          {data.rideBooked ? (
            <Text
              style={[
                styles.appointmentLocation,
                { fontSize: 18 },
                { color: "green" },]}>
              Ride Scheduled{" "}
              <Ionicons name="checkmark-circle" size={16} color={"green"} />
            </Text>
          ) : (
            <Text
              style={[
                styles.appointmentLocation,
                { fontSize: 18 },
                { color: "red" },
              ]}
            >
              No Ride Scheduled{" "}
              <Ionicons name="warning-outline" size={16} color={"red"} />
            </Text>
          )}
        </View>

        {/* Full width scheduleContainer for the button */}
        <View>
          <TouchableOpacity
            onPress={handlePress}
            style={[
              styles.scheduleRideButtonFullWidth,
              {
                backgroundColor: data.rideBooked ? "#bbb" : Colors.primary,
              },
            ]}
            
          >
            <Text style={[styles.scheduleRideButtonText,
                      {color: data.rideBooked ? "#aaa" : "white"}, // Conditionally change the text color



            ]}>
              {data.rideBooked ? "Reschedule Ride" : "Schedule Ride"}
            </Text>
            <Ionicons name="car" size={20} color={"#fff"} style={{color: data.rideBooked ? "#aaa" : "white"}} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
// Type the JSON data with the AppointmentData interface
const AppointmentsList = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {appointmentsData.appointments.map((appointment: AppointmentData) => (
        <Appointment key={appointment.id} data={appointment} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
    backgroundColor: "white", // Semi-transparent background color
    borderRadius: 10,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  iconContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  iconBackground: {
    width: 60,
    height: 60,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1, // Ensures the container takes up the full screen space
    padding: 16, // Adds padding to create space around the edges
    backgroundColor: "#f5f5f5", // Light background color to make the content stand out
    justifyContent: "flex-start", // Starts content at the top
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    // more spacing between top and bottom of items
    rowGap: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    fontSize: 20,
    fontFamily: "mon-sb",
    color: Colors.primary, // Ensure the text color is fully opaque
  },
  type: {
    fontSize: 18,
    fontFamily: "mon",
    color: "black", // Ensure the text color is fully opaque
  },
  address: {
    fontSize: 16,
    fontFamily: "mon",
    color: "black", // Ensure the text color is fully opaque
  },
  icon: {
    color: "black", // Ensure the icon color is fully opaque
  },
  info: {
    textAlign: "center",
    fontFamily: "mon-sb",
    fontSize: 16,
    marginTop: 4,
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
  row: {
    flexDirection: "row", // Aligns the Text components horizontally
    justifyContent: "flex-start", // Adds space between Date and Time
    alignItems: "center", // Centers the Text vertically
  },
  lefthalf: {
    flex: 1, //take up half of width
    paddingRight: 8,
  },
  righthalf: {
    flex: 1,
    paddingLeft: 8,
  },
  appointmentLocation: {
    fontSize: 14,
    fontFamily: "mon",
    color: Colors.grey,
    marginBottom: 8,
  },
  rideStatusContainer: {
    marginBottom: 0, // Space between the status and the scheduleContainer
  },
  scheduleContainer: {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    padding: 16,
    borderRadius: 10,
    alignItems: "center", // Center align everything horizontally
    justifyContent: "center", // Center align everything vertically
    marginTop: 8, // Adds space above the container
  },
  scheduleRideButtonFullWidth: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%", // Full width for the button
  },
  scheduleRideButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default AppointmentsList;
