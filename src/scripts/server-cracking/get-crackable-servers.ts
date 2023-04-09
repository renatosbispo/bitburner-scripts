import { NS } from '@ns';
import { withResponse } from '/helpers/exec-and-wait-response';
import { GetAllServersResponse } from '/types/server-discovery';
import { ExtendedScriptArgs } from '/types/scripts';
import { GetCrackableServersArgs } from '/types/server-cracking';

export async function main(ns: NS): Promise<void> {
  const [uuid, servers, availablePortOpenersQty] =
    ns.args as ExtendedScriptArgs<GetCrackableServersArgs>;

  await withResponse(uuid as string, async () => {
    const parsedServers = JSON.parse(servers) as GetAllServersResponse;

    return parsedServers.filter((server) => {
      return (
        !server.purchasedByPlayer &&
        !server.hasAdminRights &&
        availablePortOpenersQty >= server.numOpenPortsRequired
      );
    });
  });
}
