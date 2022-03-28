import { useRouter } from 'next/router';
import Cards from '../../components/Cards';

const Index = () => {
  const {
    query: { id = 1 },
  } = useRouter();
  return <Cards type="anime" page={id} />;
};

export default Index;
