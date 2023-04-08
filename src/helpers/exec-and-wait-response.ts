import { NS } from '@ns';
import { getStorageItem, removeStorageItem, setStorageItem } from 'utils/storage';

export async function execAndWaitResponse<T>(
  ns: NS,
  script: string,
  hostname: string,
  numThreads?: number | undefined,
  ...args: (string | number | boolean)[]
): Promise<T> {
  const uuid = crypto.randomUUID();

  ns.scp(script, hostname);

  ns.exec(script, hostname, numThreads, uuid, ...args);

  const delay = 100;
  const maxDelay = 10000;
  let response = null;
  let totalDelay = 0;

  while (response === null && totalDelay < maxDelay) {
    await ns.sleep(delay);

    response = getStorageItem<T>(uuid);

    totalDelay += delay;
  }

  removeStorageItem(uuid);

  if (response === null && totalDelay >= maxDelay) {
    throw new Error(
      `No response received from script ${script}@${hostname}.`
    );
  }

  return response as T;
}

export async function withResponse(
  uuid: string,
  execScriptBody: () => Promise<unknown>
): Promise<void> {
  const scriptResponse = await execScriptBody();

  setStorageItem(uuid, scriptResponse);
}
