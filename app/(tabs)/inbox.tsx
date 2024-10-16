import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import MomImage from "@/assets/images/mom-image.png";
import { Linking } from "react-native";

const Page = () => {
  const router = useRouter();

  const handleSendText = () => {
    const phoneNumber = "9078309507"; // Replace with the actual phone number
    const message =
      "Hey Mom, don't forget you have a checkup coming up the 23rd of October at 2:00 PM. Do you need me to do anything to make sure you make it on okay?"; // Replace with your message
    const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch((err) =>
      console.error("Error opening SMS app", err)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Family Manager</Text>
        <Text style={styles.location}>
          Check up on your loved ones and ensure they have transportation to
          their next appointment.
        </Text>
        <View style={styles.divider}></View>

        <View style={styles.appointmentContainer}>
          <View style={styles.appointmentHeader}>
            <Image
              source={require("@/assets/images/mom-image.png")}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.profileName}>Christa Sandidge</Text>
              <Text style={styles.profileRelation}>Mother</Text>
            </View>
          </View>
          <Text style={styles.upcomingAppointments}>
            Mom's Upcoming Appointments:
          </Text>

          <View style={styles.appointmentSection}>
            <Text style={styles.appointmentDetails}>
              Physiotherapy on 23th Oct at 2:00 PM
            </Text>
            <Text style={styles.appointmentLocation}>
              <Ionicons name="location" size={16} style={styles.icon} /> 456
              Therapy Ave, Rehab Town
            </Text>
            <Text style={[styles.appointmentLocation, { color: "green" }]}>
              Ride Scheduled @ 1:30 PM{" "}
            </Text>

            <TouchableOpacity
              style={styles.rideScheduledButton}
              onPress={handleSendText}
            >
              <Text style={styles.rideScheduledButtonText}>
                Send Reminder Text
              </Text>
              <Ionicons name="chatbox" size={20} color={"#fff"}></Ionicons>
            </TouchableOpacity>
          </View>
          <View style={styles.appointmentSection}>
            <Text style={styles.appointmentDetails}>
              Checkup on 25th Oct at 10:00 AM
            </Text>
            <Text style={styles.appointmentLocation}>
              <Ionicons name="location" size={16} style={styles.icon} /> 123
              Health St, Wellness City
            </Text>
            <Text style={[styles.appointmentLocation, { color: "red" }]}>
              No Ride Scheduled{" "}
              <Ionicons
                name="warning-outline"
                size={16}
                color={"red"}
              ></Ionicons>
            </Text>
            <TouchableOpacity
              style={styles.scheduleRideButton}
              onPress={handleSendText}
            >
              <Text style={styles.scheduleRideButtonText}>Schedule Ride</Text>
              <Ionicons name="car" size={20} color={"#fff"}></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.absoluteView}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push("/(modals)/general")}
        >
          <Text
            style={{
              fontFamily: "mon-sb",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Add Family Member
          </Text>
          <Ionicons name="add-circle" size={20} color={"#fff"}></Ionicons>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  icon: {
    marginTop: 5,
    color: Colors.grey, // Ensure the icon color is fully opaque
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
  absoluteView: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 14,
    paddingHorizontal: 24,
    height: 50,
    borderRadius: 20,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
    gap: 8,
  },
  location: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  appointmentContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginTop: 2,
  },
  appointmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  profileRelation: {
    fontSize: 14,
    color: Colors.grey,
  },
  upcomingAppointments: {
    fontSize: 16,
    fontFamily: "mon-sb",
    marginBottom: 8,
  },
  appointmentSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  appointmentDetails: {
    fontSize: 14,
    fontFamily: "mon",
    marginBottom: 4,
  },
  appointmentLocation: {
    fontSize: 14,
    fontFamily: "mon",
    color: Colors.grey,
    marginBottom: 8,
  },
  scheduleRideButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  scheduleRideButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  rideScheduledButton: {
    backgroundColor: Colors.hospitalColor,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  rideScheduledButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});

export default Page;
