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
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeOutLeft, FadeInRight } from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Feature } from "@/interfaces/service";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import appointmentsData  from "@/assets/data/appointments.json"; // Adjust the path if necessary
// Define the structure of your appointment based on the JSON data
import { AppointmentData } from "@/interfaces/appointment";

const Appointment = ({ data }: { data: AppointmentData }) => {
    return (
       <TouchableOpacity>
        <Animated.View
            style={styles.listing}
            entering={FadeInRight}
                exiting={FadeOutLeft}>
        <View style={styles.row}>
            <View style= {styles.lefthalf}>
                <Text style={styles.name}>{data.providerName}</Text>
                <Text>{data.specialty}</Text>
                <Text>{data.hospitalName}</Text>

                <View style={styles.row}>
                    <Text>{data.date} @</Text>
                    <Text>{data.time}</Text>
                </View>
            </View>
            <View style={styles.righthalf}>
                <Text>Ride Booked: {data.rideBooked ? 'Yes' : 'No'}</Text>
                
            </View>
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

  /*
const AppointmentList = () => {
    const appointments: AppointmentData[] = [
        {
            id: '1',
            date: '2024-10-16',
            time: '10:30 AM',
            hospitalName: 'General Hospital',
            providerName: 'Dr. Smith',
            specialty: 'Cardiology',
            rideBooked: true,
            location: {
                address: '1234 Health St.',
                city: 'San Diego',
                state: 'CA',
                zip: '92101',
            },
        },
        {
            id: '2',
            date: '2024-10-18',
            time: '2:00 PM',
            hospitalName: 'City Medical Center',
            providerName: 'Dr. Johnson',
            specialty: 'Neurology',
            rideBooked: false,
            location: {
                address: '4321 Wellness Ave.',
                city: 'San Diego',
                state: 'CA',
                zip: '92102',
            },
        },
        // Add more appointments as needed
    ];
}
*/


const styles = StyleSheet.create({
    listing: {
      padding: 16,
      gap: 10,
      marginVertical: 16,
      backgroundColor: "rgba(128, 128, 128, 0.1)", // Semi-transparent background color
      borderRadius: 10,
      marginHorizontal: 8,
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
        flex: 1,               // Ensures the container takes up the full screen space
        padding: 16,           // Adds padding to create space around the edges
        backgroundColor: '#f5f5f5',  // Light background color to make the content stand out
        justifyContent: 'flex-start', // Starts content at the top
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
      fontSize: 16,
      fontFamily: "mon-sb",
      color: "#1E7C8C", // Ensure the text color is fully opaque
    },
    type: {
      fontSize: 16,
      fontFamily: "mon",
      color: "black", // Ensure the text color is fully opaque
    },
    address: {
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
        flexDirection: 'row',  // Aligns the Text components horizontally
        justifyContent: 'flex-start',  // Adds space between Date and Time
        alignItems: 'center',  // Centers the Text vertically
    },
    lefthalf: {
        flex: 1,     //take up half of width
        paddingRight: 8,
    },
    righthalf: {
        flex: 1,
        paddingLeft: 8,
    }
  });

export default AppointmentsList;
