import { GetAllServersResponse } from 'types/server-discovery';

export enum PortOpener {
  BRUTE_SSH = 'BruteSSH.exe',
  FTP_CRACK = 'FTPCrack.exe',
  HTTP_WORM = 'HTTPWorm.exe',
  RELAY_SMTP = 'relaySMTP.exe',
  SQL_INJECT = 'SQLInject.exe',
}

export type GetAvailablePortOpenersResponse = PortOpener[];

export type GetCrackableServersResponse = GetAllServersResponse;
