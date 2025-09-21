import {ProductWithDiscounts} from "@/services/types";
import {Grid, GridItem} from "@/components/ui/grid"
import ProductCard from "@/components/models/product/ProductCard";
import {ScrollView} from "react-native";

interface ProductListProps {
  products: ProductWithDiscounts[];
}

function ProductGrid({products}: ProductListProps) {
  return (
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

  )
}

export default ProductGrid;