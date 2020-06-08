import React from "react";
import { ScrollView} from "react-native";
import OfferCard from "../../components/OfferCard";

export default function OffersScreen() {

  return (
    <ScrollView style={{marginTop: 30}}>
      <OfferCard/>
    </ScrollView>
  )

}
