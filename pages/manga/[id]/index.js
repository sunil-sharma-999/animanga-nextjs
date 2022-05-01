import { useRouter } from 'next/router';
import Cards from '../../../components/Cards';

const Index = () => {
  const {
    query: { id },
  } = useRouter();
  return <Cards type="manga" page={id} />;
};

export default Index;
