import {Product} from "@/services/types";
import { Button, ButtonText } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Image } from "@/components/ui/image"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"

interface ProductCardProps {
  product: Product;
}

function ProductCard({product}: ProductCardProps) {
  return (
    <Card size="md" variant="elevated">
      <VStack space="md">
        <Image
          source={product.imageUrl}
          alt={product.name}
          size="none"
          borderRadius={2}
          className="aspect-[1/1] w-full max-w-[320px]"
        />
        <Heading size="md">{product.name}</Heading>
        <Text size="lg">
          RSD {product.price.toFixed(2)}
        </Text>
        <Button size="md" variant="solid">
          <ButtonText>Dodaj u korpu</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
}

export default ProductCard;