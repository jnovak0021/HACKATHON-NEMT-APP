import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";
import Colors from "@/constants/Colors";
import proj4 from "proj4";
import { ElderFacilities, Feature } from "@/interfaces/service";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  getMarkerColor,
  getMarkerIcon,
  ServiceType,
} from "@/utils/serviceGraphics";

const INITIAL_REGION = {
  latitude: 32.78825,
  longitude: -117.4324,
  latitudeDelta: 10,
  longitudeDelta: 10,
};

// Define the projection for the input coordinates (e.g., UTM Zone 33N)
const inputProjection =
  "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +datum=NAD83 +units=us-ft +no_defs";
const outputProjection = "EPSG:4326";

const ServicesMap = ({ services }: ElderFacilities) => {
  const router = useRouter();

  const onMarkerSelected = (service: Feature) => {
    // parse feature to json
    const serviceString = JSON.stringify(service);
    console.log(service);
    router.push({
      pathname: `/service/[id]`,
      params: { id: service.attributes.id, service: serviceString },
    });
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor={Colors.grey}
        clusterFontFamily="mon-sb"
      >
        {services.map((service: Feature, index: number) => {
          // Convert the coordinates and log the output
          const serviceType = service.attributes.type as ServiceType;
          const [longitude, latitude] = proj4(
            inputProjection,
            outputProjection,
            [service.geometry.x, service.geometry.y]
          );
          return (
            <Marker
              key={service.attributes.id}
              onPress={() => onMarkerSelected(service)}
              coordinate={{
                latitude,
                longitude,
              }}
              pinColor={getMarkerColor(serviceType)}
            >
              <View
                style={[
                  styles.marker,
                  { backgroundColor: getMarkerColor(serviceType) },
                ]}
              >
                <Text style={styles.markerText}>
                  {getMarkerIcon(serviceType, 16)}
                </Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clusterMarker: {
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
  clusterText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#000",
  },
  marker: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
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
    color: "#FFFFFF",
  },
});

export default ServicesMap;
