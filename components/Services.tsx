import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ListRenderItem,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { FlashList } from "@shopify/flash-list";
import { defaultStyles } from "@/constants/Styles";
import { useState } from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeOutLeft, FadeInRight } from "react-native-reanimated";
import { useAuth } from "@clerk/clerk-react";
import { createClient } from "@supabase/supabase-js";
import Colors from "@/constants/Colors";
import { ElderFacilities, Feature } from "@/interfaces/service";

import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";

interface Props {
  services: Feature[] | [];
  category: string | null;
  refresh: number;
}
const Services = ({ services = [], category, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<Record<string, string>>({});
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  // Inside your component

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
      <Link href={`/service/${item.attributes.objectid}`} asChild>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}
          >
            {/* <Image source={{ uri: item.attributes.complaintinfo }} style={styles.image} /> */}

            <TouchableOpacity
              style={{ position: "absolute", top: 30, right: 30 }}
            >
              <Ionicons
                name="heart-outline"
                size={24}
                color={"#000"}
              ></Ionicons>
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>
                {item.attributes.facilityname}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Ionicons name="location" size={16}></Ionicons>
              <Text style={{ fontFamily: "mon" }}>
                {item.attributes.facilityaddress}
              </Text>
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
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
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
