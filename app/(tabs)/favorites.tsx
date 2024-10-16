import React from "react";
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppointmentsList from "@/components/Appointment"; // Importing Appointment component only
import appointments from "@/assets/data/appointments.json"; // Assuming appointments is a JSON array of AppointmentData

import { Tabs } from "expo-router";



const Page = () => {
  return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Appointments</Text>
            <AppointmentsList/>
        </ScrollView>
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
});

export default Page;
