import {ReactNode, useMemo} from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BarButton from "@/components/custom/BarButton";
import {useSearchStore} from "@/services/state/SearchState";
import {Text} from "@/components/ui/text";


function SearchButton() {
  
  const {search, setShowSearchBox} = useSearchStore();
  
  const searchPreview = useMemo(() => {
    if (!search) return "";
    if (search.length < 7) return search;
    return search.substring(0, 5) + "...";
  }, [search])
  
  return (
    <BarButton onClick={() => {
      setShowSearchBox(true);
    }}>
      {search && (
        <Text className="italic mr-2">"{searchPreview}"</Text>
      )}
      <FontAwesome name="search" size={20} color="black" />
    </BarButton>
  )
}

export default SearchButton;