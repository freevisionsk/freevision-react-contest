import { useConfig } from '../hooks/useConfig';

const ConfigInspect = () => {
  const { config } = useConfig();
  return (
    <pre style={{ textAlign: 'left', fontSize: 14 }}>
      {`Current config:\n`}
      {JSON.stringify(config, null, 2)}
      {`\n\nStart with Ctrl + .`}
    </pre>
  );
};

export default ConfigInspect;
