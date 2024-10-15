import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
} from "react-native";
import { Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { Tabs, useLocalSearchParams, useNavigation } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/Styles";
import { Feature } from "@/interfaces/service";
import { User } from "@/interfaces/user";
import { useAuth } from "@clerk/clerk-react";
import proj4 from "proj4";

const IMG_HEIGHT = 400;
const { width } = Dimensions.get("window");

const inputProjection =
  "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +datum=NAD83 +units=us-ft +no_defs";
const outputProjection = "EPSG:4326";

const Page = () => {
  const params = useLocalSearchParams();
  const id = params.id as string;
  let service: Feature | null = null;

  try {
    service = JSON.parse(params.service as string) as Feature;
  } catch (error) {
    console.error("Failed to parse service parameter:", error);
  }

  const [userDetails, setUserDetails] = useState<User | null>(null);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const navigation = useNavigation();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const { signOut, isSignedIn, userId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);

  let latitude = 37.78825;
  let longitude = -122.4324;

  if (service) {
    [longitude, latitude] = proj4(inputProjection, outputProjection, [
      service.geometry.x,
      service.geometry.y,
    ]);
  }

  const INITIAL_REGION = {
    latitude,
    longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const shareListing = async () => {
    try {
      await Share.share({
        title: service?.attributes.name,
        url: "https://thadsandidge.com",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View
          style={[styles.header, headerAnimatedStyle]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons
              name="share-outline"
              size={22}
              color={"#000"}
              onPress={shareListing}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="heart-outline" size={24} color={"#000"}></Ionicons>
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}
      >
        <View style={styles.image}>
          <MapView
            animationEnabled={false}
            style={StyleSheet.absoluteFill}
            showsUserLocation
            showsMyLocationButton
            initialRegion={INITIAL_REGION}
            clusterColor={Colors.grey}
            clusterFontFamily="mon-sb"
          >
            {service && (
              <Marker
                key={service.attributes.id}
                coordinate={{
                  latitude,
                  longitude,
                }}
              />
            )}
          </MapView>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{service?.attributes.name}</Text>
          <Text style={styles.location}>in {service?.attributes.city}</Text>

          <View style={{ flexDirection: "row", gap: 4, paddingTop: 8 }}>
            {service?.attributes.phoneNumber && (
              <TouchableOpacity>
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Ionicons name="earth" size={18} />
                  <Text style={styles.ratings}>
                    {service?.attributes.phoneNumber}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.divider} />
          <View style={defaultStyles.container}></View>

          <Text style={styles.description}>Get the help you need here.</Text>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>Test</Text>
            <Text style={{ fontFamily: "mon" }}>applicants</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[defaultStyles.btn, { paddingHorizontal: 20 }]}
          >
            <Text style={defaultStyles.btnText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  marker: {
    padding: 5,
    borderRadius: 5,
  },
  markerText: {
    color: "white",
    fontFamily: "mon-sb",
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
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: "mon",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  locateBtn: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
});

export default Page;
