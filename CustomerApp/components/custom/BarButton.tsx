import { Pressable } from "../ui/pressable";
import {Box} from "@/components/ui/box";


interface BarButtonProps {
  onClick: () => void;
  className?: string,
  children?: React.ReactNode;
}

function BarButton({onClick, children, className}: BarButtonProps) {

  return (
    <Pressable onPress={onClick}>
      {({pressed}) => (
        <Box
          className="px-4 h-12 rounded-lg items-center flex-row ml-2"
          style={{
            backgroundColor: pressed? "gray" : "white",
            borderWidth: 1
          }}
        >
          {children}
        </Box>
      )}
    </Pressable>
  )
}

export default BarButton