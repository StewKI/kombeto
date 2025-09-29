import {Center} from "@/components/ui/center";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import {Card} from "@/components/ui/card";

interface TotalPriceViewProps {
  hasDiscount: boolean;
  discount: number;
  price: number;
  totalPrice: number;
}

function TotalPriceView({hasDiscount, discount, price, totalPrice}: TotalPriceViewProps) {

  return (
    <Card className="border-2 w-full">
      <Center>
        { hasDiscount && (
          <>
            <HStack className="align-middle mb-2">
              <Text size="lg">Vaš popust: </Text>
              <Text size="xl" bold>-{discount}%</Text>
            </HStack>
            <Text strikeThrough>{price.toFixed(2)} RSD</Text>
          </>
        )}
        <Text size="2xl" bold>{totalPrice.toFixed(2)} RSD</Text>
      </Center>
    </Card>
  )
}

export default TotalPriceView;