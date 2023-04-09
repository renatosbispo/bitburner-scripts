import { NS } from '@ns';
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from 'utils/storage';

export async function execAndWaitResponse<
  Response,
  Args extends (string | number | boolean)[]
>(
  ns: NS,
  script: string,
  hostname: string,
  numThreads?: number | undefined,
  ...args: Args
): Promise<Response> {
  const uuid = crypto.randomUUID();

  ns.scp(script, hostname);

  ns.exec(script, hostname, numThreads, uuid, ...args);

  const delay = 100;
  const maxDelay = 10000;
  let response = null;
  let totalDelay = 0;

  while (response === null && totalDelay < maxDelay) {
    await ns.sleep(delay);

    response = getStorageItem<Response>(uuid);

    totalDelay += delay;
  }

  removeStorageItem(uuid);

  if (response === null && totalDelay >= maxDelay) {
    throw new Error(`No response received from script ${script}@${hostname}.`);
  }

  return response as Response;
}

export async function withResponse(
  uuid: string,
  execScriptBody: () => Promise<unknown>
): Promise<void> {
  const scriptResponse = await execScriptBody();

  setStorageItem(uuid, scriptResponse);
}
