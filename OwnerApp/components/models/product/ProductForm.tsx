
import {VStack} from "@/components/ui/vstack";
import {HStack} from "@/components/ui/hstack";
import {Text} from "@/components/ui/text";
import InputFieldLabel from "@/components/custom/InputFieldLabel";
import {QuantityInputSimple} from "@/components/custom/QuantityInput";
import ValidationService from "@/services/models/validation/ValidationService";
import {Alert} from "@/components/ui/alert";
import {Box} from "@/components/ui/box";
import {Button, ButtonText} from "@/components/ui/button";
import {Customer, Product} from "@/services/types";
import {Card} from "@/components/ui/card";
import LoginInfo from "@/components/models/customer/LoginInfo";
import {useState} from "react";
import VariationsInput from "@/components/models/product/inputs/VariationsInput";
import PriceInput from "@/components/models/product/inputs/PriceInput";
import ImagePickerField from "@/components/models/product/inputs/ImagePickerField";
import CategoryMultiSelect from "@/components/models/product/inputs/CategoryMultiSelect";
import {useCategoriesStore} from "@/services/state/CategoriesState";

interface ProductFormProps {
  product?: Product;
  onSubmit: (name: string, variations: string, basePrice: number, imageUrl: string, categories: number[]) => void;
  btnText?: string;
}

function ProductForm({onSubmit, btnText = undefined, product = undefined}: ProductFormProps) {
  
  console.log(product);
  
  const {allCategories} = useCategoriesStore();

  const [name, setName] = useState(product?.name ?? "");
  const [variations, setVariations] = useState(product?.variations ?? "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [basePrice, setBasePrice] = useState(product?.basePrice ?? 0);
  const [categories, setCategories] = useState<number[]>(product?.categories ?? []);

  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const newErrors: string[] = [];

    if (name.length == 0) newErrors.push("Ime je obavezno polje");

    if (basePrice <= 0) newErrors.push("Cena mora biti veća od 0");

    if (imageUrl.length == 0) newErrors.push("Slika je obavezna");
    
    if (categories.length == 0) newErrors.push("Bar jedna kategorija je obavezna");
    
    setErrors(newErrors)

    return newErrors.length === 0;
  }

  const submit = () => {
    if (!validate()) return;

    onSubmit(name, variations, basePrice, imageUrl, categories);
  }

  return (
    <>
      <VStack className="p-8 gap-5">

        {errors.length > 0 && (
          <VStack className="gap-1">
            {errors.map((e) => (
              <Alert key={e} action="error" variant="filled">
                <Text>{e}</Text>
              </Alert>
            ))}
          </VStack>
        )}

        <ImagePickerField value={imageUrl} onChange={(val) => setImageUrl(val)} />

        <InputFieldLabel label="Ime" value={name} onChange={(val) => setName(val)}/>
        
        <HStack>
          <Text size="xl" bold className="align-middle">Osnovna cena:</Text>
          <PriceInput value={basePrice} onChange={(val) => setBasePrice(val)}/>
        </HStack>

        <VariationsInput value={variations} onChange={(newValue) => setVariations(newValue)}/>
        
        <CategoryMultiSelect categories={allCategories} selectedIds={categories} onChange={(cats) => setCategories(cats)}/>



        <Box>
          <Button className="h-16" onPress={submit}>
            <ButtonText>{btnText ?? "Dodaj"}</ButtonText>
          </Button>
        </Box>



      </VStack>
    </>
  )
}

export default ProductForm;