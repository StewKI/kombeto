import * as SecureStore from 'expo-secure-store';

export async function saveCredential(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getCredential(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key);
}

export async function deleteCredential(key: string) {
  await SecureStore.deleteItemAsync(key);
}