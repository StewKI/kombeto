import {useSearchTabStore} from "@/services/state/SearchTabState";
import {Box} from "@/components/ui/box";
import {Text} from "@/components/ui/text";
import {useEffect, useMemo} from "react";
import {Category} from "@/services/types";
import {categoryAll} from "@/components/models/category/CategoryList";
import {LinearGradient} from "expo-linear-gradient";
import {HStack} from "@/components/ui/hstack";
import {Button, ButtonText} from "@/components/ui/button";
import {EvilIcons} from "@expo/vector-icons";
import {Pressable} from "@/components/ui/pressable";
import {Pre} from "@expo/html-elements";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ColorUtil from "@/services/general/ColorUtil";
import {BackHandler} from "react-native";


function SearchTopBar() {
  
  const {selectedCategory, setSelectedCategory} = useSearchTabStore();
  
  const category: Category = useMemo<Category>(() => {
    if (!selectedCategory) {
      return  {
        id: -2,
        name: "",
        color: "#000000"
      }
    }
    if (selectedCategory === "all") {
      return categoryAll;
    }
    return selectedCategory;
    
  }, [selectedCategory]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      setSelectedCategory(undefined);
      return true;
    })
  }, []);
  
  
  return (
    <LinearGradient
      colors={[category.color, "#ffffff"]}  // left → right
      start={{ x: -0.6, y: 0 }}
      end={{ x: 1.5, y: 0 }}
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
      }}
    >
      <HStack className="items-center justify-between">
        <Pressable
          onPress={() => setSelectedCategory(undefined)}
        >
          {({pressed}) => (

            <EvilIcons name="arrow-left" size={46} color={pressed ? "gray" : "black"} />
          )}
        </Pressable>
        <Text
          size="xl"
          className="ml-2"
          style={{
            fontWeight: "600",
            flexGrow: 1,
            color: "#000000", // force dark text for readability
          }}
        >
          {category.name}
        </Text>
        <RightButton onClick={() => {}}>
          <FontAwesome name="search" size={20} color="black" />
        </RightButton>
        <RightButton onClick={() => {}}>
          <FontAwesome name="sort-amount-asc" size={20} color="black" />
        </RightButton>
      </HStack>
    </LinearGradient>
  )
}

export default SearchTopBar;


interface RightButtonProps{
  onClick: () => void;
  className?: string,
  children?: React.ReactNode;
}

function RightButton({onClick, children, className}: RightButtonProps) {
  
  return (
    <Pressable>
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