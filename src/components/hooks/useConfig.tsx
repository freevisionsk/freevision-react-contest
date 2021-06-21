import * as React from 'react';

interface IAppConfig {
  apiUrl: string;
  showLangKeys: boolean;
}

type TConfigValueSetter = <T extends keyof IAppConfig>(key: T, value: IAppConfig[T]) => void;
type TConfigValueResetter = (key: keyof IAppConfig) => void;

export interface IAppConfigContext {
  config: IAppConfig;
  set: TConfigValueSetter;
  reset: TConfigValueResetter;
}

const getInitialConfig = (): IAppConfig => {
  // Build API URL from config and localstorage
  const configApiUrl = window.__env?.API_URL || '/graphql';
  const fullApiUrl = configApiUrl.startsWith('http') ? configApiUrl : window.location.origin + configApiUrl;
  const apiUrl = localStorage.getItem('api_url') || fullApiUrl;

  return {
    apiUrl,
    showLangKeys: !!localStorage.getItem('show_lang_keys'),
  };
};

export const AppConfigContext = React.createContext<IAppConfigContext>({} as IAppConfigContext);

export const AppConfigContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = React.useState(getInitialConfig());

  const handleSet: TConfigValueSetter = (key, value) => {
    // eslint-disable-next-line no-console
    console.log('[Config] set', key, value);
    switch (key) {
      case 'showLangKeys':
        if (value) {
          localStorage.setItem('show_lang_keys', '1');
        } else {
          localStorage.removeItem('show_lang_keys');
        }
        break;
      case 'apiUrl':
        localStorage.setItem('api_url', value as string);
        window.location.reload();
        return; // do not set config when reloading page
      default:
        break;
    }
    setConfig(getInitialConfig());
  };

  const handleReset: TConfigValueResetter = (key) => {
    // eslint-disable-next-line no-console
    console.log('[Config] reset', key);
    switch (key) {
      case 'showLangKeys':
        localStorage.removeItem('show_lang_keys');
        break;
      case 'apiUrl':
        localStorage.removeItem('api_url');
        window.location.reload();
        return; // do not set config when reloading page
      default:
        break;
    }
    setConfig(getInitialConfig());
  };

  const ctx = {
    config,
    set: handleSet,
    reset: handleReset,
  };

  return <AppConfigContext.Provider value={ctx}>{children}</AppConfigContext.Provider>;
};

export const useConfig = (): IAppConfigContext => React.useContext(AppConfigContext);

export const useConfigValue = function <T extends keyof IAppConfig>(key: T): IAppConfig[T] {
  const { config } = React.useContext(AppConfigContext);
  return config[key];
};
