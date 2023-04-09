import { NS } from '@ns';
import { withResponse } from '/helpers/exec-and-wait-response';
import {
  GetAllServersArgs,
  GetAllServersHostnamesResponse,
} from '/types/server-discovery';
import { ExtendedScriptArgs } from '/types/scripts';

export async function main(ns: NS): Promise<void> {
  const [uuid, serversHostnames] =
    ns.args as ExtendedScriptArgs<GetAllServersArgs>;

  const parsedServersHostnames = JSON.parse(
    serversHostnames as string
  ) as GetAllServersHostnamesResponse;

  await withResponse(uuid as string, async () => {
    return parsedServersHostnames.map((serverHostname) =>
      ns.getServer(serverHostname)
    );
  });
}
