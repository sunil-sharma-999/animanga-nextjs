import Anime from '../../../../components/Anime';
import { useRouter } from 'next/router';

const Index = () => {
  const {
    query: { malid },
  } = useRouter();
  return <Anime id={malid} />;
};

export default Index;
