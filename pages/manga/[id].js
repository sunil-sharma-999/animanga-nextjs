import { useRouter } from 'next/router';
import Cards from '../../components/Cards';

const Index = () => {
  const {
    query: { id = 1 },
  } = useRouter();
  return <Cards type="manga" page={id} />;
};

export default Index;
