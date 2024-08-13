import Colors from "@/constants/Colors";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const categories = ["Overview", "News", "Orders", "Transactions"];

const RenderSectionHeader = () => {
  const [activeCategory, setActiveCategory] = useState("");

  const isActiveCategory = useCallback(
    (category: string) => {
      return activeCategory === category.toLowerCase();
    },
    [activeCategory]
  );

  return (
    <ScrollView
      contentContainerStyle={styles.listHeader}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => setActiveCategory(category.toLowerCase())}
          style={[
            styles.categoriesBtn,
            isActiveCategory(category) && styles.categoriesBtnActive,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              isActiveCategory(category) && styles.categoryTextActive,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  categoriesBtnActive: {
    backgroundColor: "#fff",
  },
  categoriesBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    color: "#000",
  },
});

export default RenderSectionHeader;
