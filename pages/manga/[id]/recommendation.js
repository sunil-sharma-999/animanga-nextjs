import { useRouter } from 'next/router';
import React from 'react';
import Recommendation from '../../../components/Recommendation';

const Recom = () => {
  const {
    query: { id },
  } = useRouter();
  return <Recommendation type="manga" id={id} />;
};

export default Recom;
