import {KeyboardAvoidingView, Platform} from "react-native";

interface KeyboardAwareProps {
  children: React.ReactNode;
}

function KeyboardAware({children}: KeyboardAwareProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // adjust if header/nav overlaps
    >
      {children}
    </KeyboardAvoidingView>
  )
}

export default KeyboardAware