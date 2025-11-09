
import {Image} from "@/components/ui/image";
import {Product} from "@/services/types";


interface ProductImageProps {
  product: Product
}

function ProductImage({product}: ProductImageProps) {
  return (
    <Image
      source={product.imageUrl}
      alt={product.name}
      size="none"
      resizeMode="contain"
      borderRadius={5}
      className="aspect-[1/1] w-full max-w-[320px]"
    />
  )
}

export default ProductImage