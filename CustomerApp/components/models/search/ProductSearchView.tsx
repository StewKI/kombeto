import {Category} from "@/services/types";
import {ScrollView} from "react-native";
import {useSearchStore} from "@/services/state/SearchState";
import ProductGrid from "@/components/models/product/ProductGrid";
import {HStack} from "@/components/ui/hstack";
import QueryBox from "@/components/models/search/QueryBox";
import {Button, ButtonText} from "@/components/ui/button";
import {VStack} from "@/components/ui/vstack";
import SearchTopBar from "@/components/models/search/SearchTopBar";
import {Box} from "@/components/ui/box";
import InfiniteProducts from "@/components/models/search/InfiniteProducts";

interface ProductSearchViewProps {
}

function ProductSearchView() {
  
  return (
    <VStack>
      <Box style={{height: 60}}>
        <SearchTopBar/>
      </Box>
      <InfiniteProducts/>
      {/*<QueryBox/>*/}
    </VStack>
  )
}

export default ProductSearchView;