import { NS } from '@ns';
import { withResponse } from 'helpers/exec-and-wait-response';
import { GetAllServersHostnamesResponse } from 'types/server-discovery';

export async function main(ns: NS): Promise<void> {
  const [uuid, serversHostnames] = ns.args;

  const parsedServersHostnames = JSON.parse(
    serversHostnames as string
  ) as GetAllServersHostnamesResponse;

  await withResponse(uuid as string, async () => {
    return parsedServersHostnames.map((serverHostname) =>
      ns.getServer(serverHostname)
    );
  });
}
