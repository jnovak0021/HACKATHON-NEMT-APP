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
import { useAuth, useUser } from "@clerk/clerk-expo";

const Page = () => {
  const router = useRouter();
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {!isSignedIn ? (
          <View style={styles.loggedOutContainer}>
            <Text style={styles.loggedOutText}>You are logged out</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push("/(modals)/login")}
            >
              <Ionicons name="log-in" size={20} color={"#fff"} />
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.profileDetailsContainer}>
              <Text style={styles.welcomeText}>
                Welcome back, {user?.firstName}!
              </Text>
              <Text style={styles.descriptionText}>
                Manage your account settings, add family members, and more.
              </Text>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push("/settings")}
              >
                <Ionicons name="settings" size={20} color={Colors.primary} />
                <Text style={styles.profileButtonText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => signOut()}
              >
                <Ionicons name="log-out" size={20} color={Colors.primary} />
                <Text style={styles.profileButtonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => router.push("/add-family-member")}
              >
                <Ionicons name="add-circle" size={20} color={Colors.primary} />
                <Text style={styles.profileButtonText}>Add Family Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loggedOutContainer: {
    alignItems: "center",
  },
  loggedOutText: {
    fontSize: 20,
    fontFamily: "mon-sb",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "mon-sb",
    marginLeft: 10,
  },
  profileContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 12,
    padding: 20,
    position: "relative",
  },
  profileImageContainer: {
    position: "absolute",
    top: -50,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  profileDetailsContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: "mon-sb",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "mon",
    color: Colors.grey,
    marginBottom: 20,
    textAlign: "center",
  },
  profileButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    paddingHorizontal: "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: 300,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  profileButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "mon-sb",
    color: Colors.primary,
  },
});

export default Page;
