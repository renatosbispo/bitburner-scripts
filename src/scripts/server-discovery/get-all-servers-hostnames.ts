import { NS } from '@ns';
import { withResponse } from '/helpers/exec-and-wait-response';
import { ExtendedScriptArgs } from '/types/scripts';
import { GetAllServersHostnamesArgs } from '/types/server-discovery';

export async function main(ns: NS): Promise<void> {
  const [uuid] = ns.args as ExtendedScriptArgs<GetAllServersHostnamesArgs>;

  await withResponse(uuid as string, async () => {
    const serversHostnames = ns.getPurchasedServers();

    const getNeighborsHostnames = (
      thisServerHostname = 'home',
      parentServerHostname = ''
    ) => {
      const neighborsHostnames = ns.scan(thisServerHostname);

      neighborsHostnames.forEach((neighborHostname) => {
        if (neighborHostname === parentServerHostname) {
          return;
        }

        serversHostnames.push(neighborHostname);
        getNeighborsHostnames(neighborHostname, thisServerHostname);
      });
    };

    getNeighborsHostnames();

    return serversHostnames;
  });
}
