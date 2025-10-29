import {Text} from "@/components/ui/text";
import {Input, InputField} from "@/components/ui/input";
import {useState, useCallback} from 'react';

interface OneTimeCodeInputProps {
  onCodeChange: (oneTimeCode: string) => void;
}

function OneTimeCodeInput({onCodeChange}: OneTimeCodeInputProps) {
  const [code, setCode] = useState('');

  const formatCode = useCallback((value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/(\d{0,3})(\d{0,3})(\d{0,3})/);

    if (!groups) return '';

    let formatted = groups
      .slice(1)
      .filter(group => group !== '')
      .join('-');

    return formatted;
  }, []);

  const handleChange = (value: string) => {
    const formatted = formatCode(value);
    if (formatted.replace(/-/g, '').length <= 9) {
      setCode(formatted);
      onCodeChange(formatted);
    }
  };

  return (
    <>
      <Input
        size={"xl"}
      >
        <InputField
          value={code}
          onChangeText={handleChange}
          placeholder="000-000-000"
          keyboardType="numeric"
          maxLength={11}
        />
      </Input>
    </>
  )
}

export default OneTimeCodeInput;