import {Product} from "@/services/types";
import {Grid, GridItem} from "@/components/ui/grid"
import ProductCard from "@/components/models/product/ProductCard";
import {ScrollView} from "react-native";

interface ProductListProps {
  products: Product[];
}

function ProductList({products}: ProductListProps) {
  return (
    <ScrollView>
      <Grid
        className="gap-3 p-3"
        _extra={{
          className: "grid-cols-4"
        }}
      >
        {products.map((product) => (
          <GridItem
            key={product.id}
            _extra={{
              className: "col-span-2"
            }}
          >
            <ProductCard product={product}/>
          </GridItem>
        ))}

      </Grid>
    </ScrollView>
    
  )
}

export default ProductList;