import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { CartesianChart, Line } from "victory-native";
import { useFont } from "@shopify/react-native-skia";

interface RenderItemProps {
  description: string;
}

const RenderItem = (props: RenderItemProps) => {
  const { description } = props;
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);

  console.log(DATA);
  return (
    <View style={[defaultStyles.block, { marginTop: 20 }]}>
      {/* Chart */}
      <View style={{ height: 300 }}>
        <CartesianChart
          data={DATA} // 👈 specify your data
          xKey="day" // 👈 specify data key for x-axis
          yKeys={["lowTmp", "highTmp"]} // 👈 specify data keys used for y-axis
          axisOptions={{
            tickCount: 5,
            labelOffset: { x: -2, y: 0 },
            labelColor: Colors.gray,
            formatYLabel: (v) => `${v}`,
            formatXLabel: (ms) => ms.toString(),
            font,
          }}
        >
          {/* 👇 render function exposes various data, such as points. */}
          {({ points }) => (
            // 👇 and we'll use the Line component to render a line path.
            <Line points={points.highTmp} color="red" strokeWidth={3} />
          )}
        </CartesianChart>
        <Text style={defaultStyles.subtitle}>Overview</Text>
        <Text style={{ color: Colors.gray }}>{description}</Text>
      </View>
    </View>
  );
};

const DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i,
  lowTmp: 20 + 10 * Math.random(),
  highTmp: 40 + 30 * Math.random(),
}));

const styles = StyleSheet.create({});

export default RenderItem;
