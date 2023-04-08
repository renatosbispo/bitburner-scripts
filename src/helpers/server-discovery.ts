import { NS, Server } from '@ns';

export function getAllServersHostnames(ns: NS): string[] {
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
}

export function getAllServers(ns: NS): Server[] {
  const serversHostnames = getAllServersHostnames(ns);

  return serversHostnames.map((serverHostname) => ns.getServer(serverHostname));
}
