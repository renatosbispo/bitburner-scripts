import { NS } from '@ns';
import { withResponse } from 'helpers/exec-and-wait-response';
import { PortOpener } from 'types/server-cracking';
import { GetAllServersHostnamesResponse } from 'types/server-discovery';

export async function main(ns: NS): Promise<void> {
  const [uuid] = ns.args;

  await withResponse(uuid as string, async () => {
    const portOpeners = [
      PortOpener.BRUTE_SSH,
      PortOpener.FTP_CRACK,
      PortOpener.HTTP_WORM,
      PortOpener.RELAY_SMTP,
      PortOpener.SQL_INJECT,
    ];

    return portOpeners.filter((portOpener) =>
      ns.fileExists(portOpener, 'home')
    );
  });
}
