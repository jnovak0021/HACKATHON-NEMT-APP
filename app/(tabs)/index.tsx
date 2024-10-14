import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Agencies from "@/components/Services";
import { useEffect, useState } from "react";
import listingsData from "@/assets/data/airbnb-listings.json";
import elderCareFacilities from "@/assets/data/elder-care-facilities.json";
import healthCareFacilities from "@/assets/data/health-care-facilities.json";

import ServicesMap from "@/components/ServicesMap";
import { createClient } from "@supabase/supabase-js";
import AgenciesBottomSheet from "@/components/ServicesBottomSheet";
import { getUser } from "@/utils/supabaseRequests";
import axios from "axios";
import base64 from "react-native-base64";
import { decode } from "base64-arraybuffer";
import { useAuth } from "@clerk/clerk-react";
import { ElderFacilities, Feature } from "@/interfaces/service";

// Example usage in your Page component
const Page = () => {
  const route = useRouter();
  const params = useLocalSearchParams();
  const { userId, getToken } = useAuth();

  const refresh = params?.refresh;
  const [category, setCategory] = useState<string | null>(null);

  const inputProjection =
    "+proj=lcc +lat_1=33.88333333333333 +lat_2=32.78333333333333 +lat_0=32.16666666666666 +lon_0=-116.25 +x_0=2000000.0001016 +y_0=500000.0001016001 +datum=NAD83 +units=us-ft +no_defs";
  // Define the projection for the output coordinates (WGS84)
  const outputProjection = "EPSG:4326";
  const normalizeElderCareFacility = (facility: any): Feature => ({
    geometry: {
      x: facility.geometry.x,
      y: facility.geometry.y,
    },
    attributes: {
      id: facility.attributes.facilitynumber,
      name: facility.attributes.facilityname,
      type: "Elder Care",
      address: facility.attributes.address,
      city: facility.attributes.city,
      state: facility.attributes.state,
      zip: facility.attributes.zip,
      phoneNumber: facility.attributes.facilityemail ?? undefined,
      capacity: facility.attributes.capacity ?? undefined,
      x: facility.geometry.x,
      y: facility.geometry.y,
    },
  });

  const normalizeHospital = (hospital: any): Feature => ({
    geometry: {
      x: hospital.geometry.x,
      y: hospital.geometry.y,
    },
    attributes: {
      id: hospital.attributes.oshpd_id,
      name: hospital.attributes.facility_name,
      type: "Hospital",
      address: hospital.attributes.address,
      city: hospital.attributes.city,
      state: hospital.attributes.state,
      zip: hospital.attributes.zip,
      phoneNumber: hospital.attributes.facility_email ?? undefined,
      capacity: hospital.attributes.capacity ?? undefined,
      x: hospital.geometry.x,
      y: hospital.geometry.y,
    },
  });
  const loadServices = () => {
    const elderCareFacilitiesData =
      elderCareFacilities.layers[0]?.features || [];
    const hospitalsData = healthCareFacilities.layers[0]?.features || [];

    const normalizedElderCareFacilities = elderCareFacilitiesData
      .map(normalizeElderCareFacility)
      .slice(0, 100); // limit to 100
    // limit to 100
    const normalizedHospitals = hospitalsData
      .map(normalizeHospital)
      .slice(0, 100);

    return [...normalizedElderCareFacilities, ...normalizedHospitals];
  };

  const [services, setServices] = useState<Feature[]>(loadServices());

  const [userDetails, setUserDetails] = useState<any>([]);
  const [loadingUser, setLoadingUser] = useState(true);

  const loadUser = async () => {
    try {
      const token = await getToken({ template: "supabase" });
      const user = await getUser({
        userId: userId ?? "",
        token: token ?? "",
      });
      setUserDetails(user);
      console.log("USER DETAILS_ ", user);
    } catch (error) {
      console.error("Error loading user details:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  const onDataChanged = (category: string) => {
    console.log("CHANGED_ ", category);
    setCategory(category);
  };
  // use effect that console.logs the services
  useEffect(() => {
    console.log("SERVICES_ ", services.length);
  }, [services]);

  return (
    <View style={{ flex: 1, marginTop: 65 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      ></Stack.Screen>
      <ServicesMap services={services} />
      <AgenciesBottomSheet
        services={services}
        category={category}
      ></AgenciesBottomSheet>
    </View>
  );
};

export default Page;
