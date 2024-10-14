import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Agencies from "@/components/Services";
import { useEffect, useState } from "react";
import listingsData from "@/assets/data/airbnb-listings.json";
import elderCareFacilities from "@/assets/data/elder-care-facilities.json";

import ServicesMap from "@/components/ServicesMap";
import { createClient } from "@supabase/supabase-js";
import AgenciesBottomSheet from "@/components/ServicesBottomSheet";
import { getUser } from "@/utils/supabaseRequests";
import axios from "axios";
import base64 from "react-native-base64";
import { decode } from "base64-arraybuffer";
import { useAuth } from "@clerk/clerk-react";

// Example usage in your Page component
const Page = () => {
  const route = useRouter();
  const params = useLocalSearchParams();
  const { userId, getToken } = useAuth();

  const refresh = params?.refresh;
  const [category, setCategory] = useState<string | null>(null);

  // get geojson data from the file
  const [services, setAgencies] = useState<any>(
    elderCareFacilities.layers[0]?.features || []
  );

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
        agencies={services}
        category={category}
      ></AgenciesBottomSheet>
    </View>
  );
};

export default Page;
