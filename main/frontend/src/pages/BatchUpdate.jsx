mport { useParams } from 'react-router-dom';
import BatchConfigure from '../components/BatchConfigure';
import Module from '../components/Module';

const BatchUpdate = () => {
  const params = useParams()

  return (
    <>
      <BatchConfigure />
      {
        params?.id && <Module />
      }
    </>
  );
};

export default BatchUpdate;