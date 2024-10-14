import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { defaultStyles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";
import Colors from "@/constants/Colors";
import { Feature, Geometry } from "@/interfaces/service"; // Import the GeoJSON interfaces

interface Props {
  services: Feature[]; // Use the Feature array as the type for services
}

const INITIAL_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ServicesMap = ({ services }: Props) => {
  const router = useRouter();

  const onMarkerSelected = (agency: Feature) => {
    router.push(`/service/${agency.properties.objectid}`); // Use the unique objectid from properties
  };
  if (!services || services.length === 0) {
    return <Text>No services available</Text>;
  }

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;
    const points = properties.point_count;

    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
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
        {services.map((agency: Feature) => (
          <Marker
            key={agency.properties.objectid}
            onPress={() => onMarkerSelected(agency)}
            coordinate={{
              latitude: agency.geometry.coordinates[1], // Latitude is the second coordinate in GeoJSON
              longitude: agency.geometry.coordinates[0], // Longitude is the first coordinate in GeoJSON
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>
                {agency.properties.facilityname}
              </Text>
            </View>
          </Marker>
        ))}
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
