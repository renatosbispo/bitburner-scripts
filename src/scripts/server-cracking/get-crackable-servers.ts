import { NS } from '@ns';
import { withResponse } from 'helpers/exec-and-wait-response';
import { GetAllServersResponse } from 'types/server-discovery';

export async function main(ns: NS): Promise<void> {
  const [uuid, servers, availablePortOpenersQty] = ns.args;

  await withResponse(uuid as string, async () => {
    const parsedServers = JSON.parse(
      servers as string
    ) as GetAllServersResponse;

    return parsedServers.filter((server) => {
      return (
        !server.purchasedByPlayer &&
        !server.hasAdminRights &&
        (availablePortOpenersQty as number) >= server.numOpenPortsRequired
      );
    });
  });
}
