import { useRouter } from 'next/router';
import ReviewForm from '../../components/ReviewForm';

const Index = () => {
  const {
    query: { slug = ['manga', 1] },
  } = useRouter();

  return <ReviewForm type={slug[0]} id={slug[1]} />;
};

export default Index;
