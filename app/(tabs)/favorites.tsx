import React from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";

import AppointmentsList from "@/components/Appointment"; // Importing Appointment component only
import appointments from "@/assets/data/appointments.json"; // Assuming appointments is a JSON array of AppointmentData

import { Tabs } from "expo-router";



const Page = () => {
  return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.infoContainer}>
            <Text style={styles.name}>Appointment Manager</Text>
            <Text style={styles.location}>
            Keep track of upcoming appointments and manage transportation to and from the appointment.
            </Text>
            <View style={styles.divider}></View>
    
        <ScrollView contentContainerStyle={styles.container}>
            <AppointmentsList/>
        </ScrollView>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    infoContainer: {
        padding: 24,
        backgroundColor: "#fff",
      },
      name: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: "mon-sb",
      },
      divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
      },
      location: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: "mon",
      },

});

export default Page;
