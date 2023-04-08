import { setStorageItem } from 'utils/storage';

export async function withResponse(
  uuid: string,
  execScriptBody: () => Promise<unknown>
): Promise<void> {
  const scriptResponse = await execScriptBody();

  setStorageItem(uuid, scriptResponse);
}
