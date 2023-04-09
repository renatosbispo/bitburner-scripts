import { NS } from '@ns';
import { withResponse } from '/helpers/exec-and-wait-response';
import { ExtendedScriptArgs } from '/types/scripts';
import { GetAvailablePortOpenersArgs, PortOpener } from '/types/server-cracking';

export async function main(ns: NS): Promise<void> {
  const [uuid] = ns.args as ExtendedScriptArgs<GetAvailablePortOpenersArgs>;

  await withResponse(uuid, async () => {
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
