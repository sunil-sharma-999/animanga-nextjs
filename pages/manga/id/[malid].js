import { useRouter } from 'next/router';
import Manga from '../../../components/Manga';

const Index = () => {
  const {
    query: { malid },
  } = useRouter();
  return <Manga id={malid} />;
};

export default Index;
