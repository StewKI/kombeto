import React from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { Box } from "@/components/ui/box";

interface FullScreenLoaderProps {
  animation?: any;   // allows custom animation
}

export function FullScreenLoader({
                                   animation = require("@/assets/animations/loading.json"),
                                 }: FullScreenLoaderProps) {
  return (
    <Box style={styles.overlay}>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={styles.animation}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(255,255,255,0.9)", // semi-transparent backdrop
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  animation: {
    width: 120,
    height: 120,
  },
});
