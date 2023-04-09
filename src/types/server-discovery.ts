import { Server } from '@ns';

export type GetAllServersArgs = [serversHostnames: string];

export type GetAllServersHostnamesArgs = [];

export type GetAllServersResponse = Server[];

export type GetAllServersHostnamesResponse = string[];
