import {Button} from "@/components/ui/button";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface XButtonProps {
  onClick: () => void;
}

function XButton({onClick}: XButtonProps) {
  return (
    <Button
      variant={"outline"}
      className="rounded-full"
      style={{borderColor: "black"}}
      onPress={() => onClick()}
    >
      <FontAwesome name="times" size={26} color="black"/>
    </Button>
  )
}

export default XButton