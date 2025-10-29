import {Button, ButtonText} from "@/components/ui/button";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import {FullScreenLoader} from "@/components/custom/loader/FullScreenLoader";
import OneTimeCodeInput from "@/components/models/login/OneTimeCodeInput";
import OneTimeLoginForm from "@/components/models/login/OneTimeLoginForm";
import {Alert} from "@/components/ui/alert";
import {Text} from "@/components/ui/text";
import LoginService from "@/services/security/LoginService";
import {VStack} from "@/components/ui/vstack";
import {Center} from "@/components/ui/center";
import CustomerBackend from "@/services/models/customer/CustomerBackend";
import {useCustomerStore} from "@/services/state/CustomerState";
import {Heading} from "@/components/ui/heading";
import {Box} from "@/components/ui/box";
import KeyboardAware from "@/components/custom/KeyboardAware";


function LoginPage() {
  
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  const [isCodeMissing, setIsCodeMissing] = useState<boolean>(false)
  
  const {setCustomer} = useCustomerStore();

  useEffect(() => {
    login();
  }, []);
  
  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await LoginService.Login();
      
      if (!result) {
        setIsCodeMissing(true);
        return;
      }
      
      await onFinishedLogin();
    }
    catch (e) {
      console.error(e);
      setError("Greška pri prijavljivanju");
    }
    finally {
      setLoading(false);
    }
  }
  
  const onFirstLogin = async (code: string) => {
    setIsCodeMissing(false);
    await LoginService.SaveCredentials(code);
    login();
  }
  
  const onFinishedLogin = async () => {
    
    const customer = await CustomerBackend.GetProfile();
    setCustomer(customer);
    
    router.replace("/(tabs)");
  }
  
  if (loading) {
    return (
      <FullScreenLoader/>
    )
  }
  
  if (isCodeMissing) {
    return (
      <KeyboardAware>
        <VStack className="p-5 justify-center h-full gap-5">
          <Text className="text-center" size="3xl">Dobrodošli u</Text>
          <Heading className="text-center" size="3xl">Kombeto</Heading>
          <Text className="text-center" size="3xl">aplikaciju</Text>
          <Box className="h-12"></Box>
          <OneTimeLoginForm onLoggedIn={(code) => onFirstLogin(code)}/>
        </VStack>
      </KeyboardAware>
    )
  }
  
  return (
    <>
      {error && (
        <VStack className="h-full justify-center">
          <Center className="gap-4">

            <Alert><Text className={"color-red-500"} size={"xl"}>{error} :(</Text></Alert>
            
            <Button className="h-16" onPress={() => login()}>
              <ButtonText>
                Pokušaj ponovo
              </ButtonText>
            </Button>
            
          </Center>
          
        </VStack>
      )}
    </>
  )
}

export default LoginPage;