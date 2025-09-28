import {Box} from "@/components/ui/box";
import LottieView from "lottie-react-native";
import React, {useMemo} from "react";

interface InlineLoaderProps {
  size?: "sm" | "md" | "lg";
  animation?: any;   // allows custom animation
}

function InlineLoader({
                        size,
                        animation = require("@/assets/animations/loading.json"),
                      }: InlineLoaderProps) {
  
  const pxSize = useMemo(() => {
    if (size === 'lg') return 120;
    if (size === 'md') return 90;
    if (size === 'sm') return 60;
    return 90;
  }, [size])
  
  return (
    <Box>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={{
          width: pxSize,
          height: pxSize
        }}
      />
    </Box>
  )
}

export default InlineLoader;