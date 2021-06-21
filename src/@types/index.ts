interface IConfig {
  API_URL?: string;
}

export interface IGlobal extends NodeJS.Global {}

declare global {
  interface Window {
    __env?: IConfig;
  }
}
