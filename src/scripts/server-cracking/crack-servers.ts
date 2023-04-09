import { NS } from '@ns';
import {
  CrackServersArgs,
  GetAvailablePortOpenersResponse,
  GetCrackableServersResponse,
  PortOpener,
} from '/types/server-cracking';

export async function main(ns: NS): Promise<void> {
  const [servers, availablePortOpeners] = ns.args as CrackServersArgs;

  const parsedServers = JSON.parse(servers) as GetCrackableServersResponse;
  const parsedAvailablePortOpeners = JSON.parse(
    availablePortOpeners
  ) as GetAvailablePortOpenersResponse;

  const portOpeners: Record<PortOpener, typeof ns.brutessh> = {
    'BruteSSH.exe': ns.brutessh,
    'FTPCrack.exe': ns.ftpcrack,
    'HTTPWorm.exe': ns.httpworm,
    'relaySMTP.exe': ns.relaysmtp,
    'SQLInject.exe': ns.sqlinject,
  };

  parsedServers.forEach((server) => {
    parsedAvailablePortOpeners.forEach((availablePortOpener) =>
      portOpeners[availablePortOpener](server.hostname)
    );

    ns.nuke(server.hostname);
  });
}
