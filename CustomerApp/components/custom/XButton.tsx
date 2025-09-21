import {Button} from "@/components/ui/button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Pressable} from "@/components/ui/pressable";
import {Card} from "@/components/ui/card";

interface XButtonProps {
  onClick: () => void;
}

function XButton({onClick}: XButtonProps) {
  return (
    <Pressable
      onPress={() => onClick()}
    >
      {({ pressed }) => (
        <Card
          size={"sm"}
          variant={"outline"}
          className="rounded-full"
          style={{
            borderColor: pressed ? "red" : "black"
          }}
        >
          <FontAwesome name="times" size={26} color={pressed ? "red" : "black"}/>
        </Card>
      )}
      
    </Pressable>
  )
}

export default XButton