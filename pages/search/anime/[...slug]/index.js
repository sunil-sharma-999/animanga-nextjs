import { useRouter } from 'next/router';
import Cards from '../../../../components/Cards';

const Index = () => {
  const {
    query: { slug = ['', 1] },
  } = useRouter();

  return <Cards type="anime" q={slug[0]} page={slug[1]} />;
};

export default Index;
