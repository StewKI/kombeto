import {ProductSectionData} from "@/services/types";
import {VStack} from "@/components/ui/vstack";
import {Heading} from "@/components/ui/heading";
import ProductGrid from "@/components/models/product/ProductGrid";
import {Box} from "@/components/ui/box";
import {Card} from "@/components/ui/card";
import ProductHorizontalList from "@/components/models/product/ProductHorizontalList";

interface ProductSectionProps {
  data: ProductSectionData
}

function ProductSection({data}: ProductSectionProps) {
  
  return (
    <VStack className="mt-5">
      <Card className="rounded-none">
        <Heading>{data.name}</Heading>
      </Card>
      
      {data.displayType === "grid" && (
        <ProductGrid products={data.products}/>
      )}

      {data.displayType === "horizontal" && (
        <ProductHorizontalList products={data.products}/>
      )}
      
    </VStack>
  )
}

export default ProductSection;