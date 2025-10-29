import {Card} from "@/components/ui/card";
import {Heading} from "@/components/ui/heading";
import OneTimeCodeInput from "@/components/models/login/OneTimeCodeInput";
import {useState} from "react";
import {Button, ButtonText} from "@/components/ui/button";
import InlineLoader from "@/components/custom/loader/InlineLoader";
import LoginService from "@/services/security/LoginService";
import {Alert} from "@/components/ui/alert";
import {Text} from "@/components/ui/text";


interface OneTimeLoginFormProps {
  onLoggedIn: (code: string) => void;
}

function OneTimeLoginForm({onLoggedIn}: OneTimeLoginFormProps) {
  
  const [oneTimeCode, setOneTimeCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  
  const validate = (code: string) => code.length === 11;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const loginWithOneTime = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const code = await LoginService.LoginOneTime(oneTimeCode);
      
      if (code) {
        onLoggedIn(code);
      }
      else {
        setError("Kod nije validan");
      }
    }
    catch (e) {
      console.error(e);
      setError("Greška pri prijavi");
    }
    finally {
      setLoading(false);
    }
    
    
  }

  return (
    <Card className="gap-4">
      {error && <Alert><Text>{error}</Text></Alert>}
      <Heading>Unesite kod za prijavu koji ste dobili:</Heading>
      <OneTimeCodeInput onCodeChange={(oneTimeCode) => {
        setOneTimeCode(oneTimeCode);
        setIsCodeValid(validate(oneTimeCode));
      }}/>
      <Button onPress={() => loginWithOneTime()} disabled={loading || !isCodeValid} className="h-14">
        {loading ? (
          <InlineLoader/>
        ) : (
          <ButtonText>
            Prijavi se
          </ButtonText>
        )}
        
      </Button>
    </Card>
  )
}

export default OneTimeLoginForm;