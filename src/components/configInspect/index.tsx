import { useConfig } from '../hooks/useConfig';

const ConfigInspect = () => {
  const { config } = useConfig();
  return <pre style={{ textAlign: 'left', fontSize: 14 }}>{JSON.stringify(config, null, 2)}</pre>;
};

export default ConfigInspect;
