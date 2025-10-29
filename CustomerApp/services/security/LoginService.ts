import ApiService from "@/services/ApiService";
import {getCredential, saveCredential, deleteCredential} from "@/services/security/SecureStorageService";
import {uuid} from "expo-modules-core";
import AuthService from "@/services/AuthService";


export default class LoginService {
  
  private static readonly KEY_SECURITY_CODE = "security_code";
  private static readonly KEY_DEVICE_ID = "device_id";
  
  public static async LoginOneTime(oneTimeCode: string) {
    type Res = {
      securityCode: string,
      valid: boolean,
    };
    
    const res = await ApiService.post<Res>("login/customer/first", {
      code: oneTimeCode
    });
    
    if (!res.valid) {
      return false;
    }
    
    return res.securityCode;
  }
  
  public static async SaveCredentials(securityCode: string) {
    await saveCredential(this.KEY_SECURITY_CODE, securityCode);
    await saveCredential(this.KEY_DEVICE_ID, uuid.v4());
    
    return true;
  }
  
  public static async Login() {
    
    const securityCode = await getCredential(this.KEY_SECURITY_CODE);
    const deviceId = await getCredential(this.KEY_DEVICE_ID);
    
    
    if (!securityCode || !deviceId) {
      return false;
    }
    
    type jwtDto = {
      token: string,
    }
    
    const dto = await ApiService.post<jwtDto>("login/customer", {
      securityCode: securityCode,
      deviceId: deviceId,
    });
    
    AuthService.SetToken(dto.token);
    
    return true;
  }
  
  public static async Logout() {
    await deleteCredential(this.KEY_SECURITY_CODE);
    await deleteCredential(this.KEY_DEVICE_ID);
  }
}