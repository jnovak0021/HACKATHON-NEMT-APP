import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";
import Colors from "@/constants/Colors";
import proj4 from "proj4";

interface Geometry {
  x: number;
  y: number;
}

interface Attributes {
  objectid: number;
  facilityname: string;
  // Add other attributes as needed
}

interface Feature {
  geometry: Geometry;
  attributes: Attributes;
}

interface Layer {
  id: number;
  features: Feature[];
}

interface Props {
  services: Feature[]; // Use the Feature array as the type for services
}

const INITIAL_REGION = {
  latitude: 32.78825,
  longitude: -117.4324,
  latitudeDelta: 9,
  longitudeDelta: 9,
};
// Define the projection for the input coordinates (e.g., UTM Zone 33N)
const inputProjection =
  "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +datum=NAD83 +units=us-ft +no_defs";
// Define the projection for the output coordinates (WGS84)
const outputProjection = "EPSG:4326";
const ServicesMap = ({ services }: Props) => {
  const router = useRouter();
  console.log(services.length);
  // log shape of services
  console.log(services[0]);

  const onMarkerSelected = (agency: Feature) => {
    router.push(`/service/${agency.attributes.objectid}`); // Use the unique objectid from attributes
  };

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.x,
          latitude: geometry.y,
        }}
      >
        <View style={styles.marker}>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "mon-sb",
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        animationEnabled={false}
        style={StyleSheet.absoluteFill}
        showsUserLocation
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor={Colors.primary}
        clusterFontFamily="mon-sb"
      >
        {services.map((service: Feature) => {
          // Convert the coordinates
          const [longitude, latitude] = proj4(
            inputProjection,
            outputProjection,
            [service.geometry.x, service.geometry.y]
          );
          return (
            <Marker
              key={service.attributes.objectid}
              onPress={() => onMarkerSelected(service)}
              coordinate={{
                latitude, // Converted latitude
                longitude, // Converted longitude
              }}
            >
              <View style={styles.marker}>
                <Text style={styles.markerText}>
                  {service.attributes.facilityname}
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

export default ServicesMap;
