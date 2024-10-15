import { defaultStyles } from "@/constants/Styles";
import {
  View,
  Text,
  StyleSheet,
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

interface Props {
  services: Feature[] | [];
  category: string | null;
  refresh: number;
}
const outputProjection = "EPSG:4326";
type ServiceType = "Hospital" | "Elder Care"; // Add more types as needed

const markerColors: Record<ServiceType, string> = {
  Hospital: Colors.hospitalColor,
  "Elder Care": Colors.elderCareColor,
  // Add more types and their corresponding colors here
};

const markerIcons: Record<ServiceType, JSX.Element> = {
  Hospital: <MaterialIcons name="local-hospital" size={40} color="white" />,
  "Elder Care": <MaterialIcons name="elderly" size={40} color="white" />,
  // Add more types and their corresponding icons here
};
const getMarkerColor = (service: Feature) => {
  return markerColors[service.attributes.type as ServiceType] || Colors.grey; // Fallback to a default color if type is not found
};

const getMarkerIcon = (service: Feature) => {
  return (
    markerIcons[service.attributes.type as ServiceType] || (
      <MaterialIcons name="help-outline" size={24} color="white" />
    )
  ); // Fallback to a default icon if type is not found
};

const Services = ({ services = [], category, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      console.log("REFRESH_");
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    console.log("RELOAD LISTINGS_  INTERNAL ");
    listRef.current?.scrollToOffset({ offset: 0, animated: true });

    setLoading(true);
    setLoading(false);
  }, [category]);

  const renderRow: ListRenderItem<Feature> = ({ item }) => {
    return (
      <Link href={`/service/${item.attributes.id}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            <View style={styles.iconContainer}>
              <View
                style={[
                  styles.iconBackground,
                  { backgroundColor: getMarkerColor(item) },
                ]}
              >
                {getMarkerIcon(item)}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.attributes.name}</Text>
                <Text style={styles.type}>{item.attributes.type}</Text>

                <View style={styles.locationContainer}>
                  <Ionicons name="location" size={16} style={styles.icon} />
                  <Text style={styles.address}>{item.attributes.address}</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={[defaultStyles.container]}>
      <BottomSheetFlatList
        ref={listRef}
        renderItem={renderRow}
        data={loading ? [] : services}
        ListHeaderComponent={
          <Text style={styles.info}>{services.length} services</Text>
        }
      ></BottomSheetFlatList>
    </View>
  );
};

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
    color: "black", // Ensure the text color is fully opaque
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
});

export default Services;
