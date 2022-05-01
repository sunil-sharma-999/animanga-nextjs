import React from 'react';
import { useGetRecomQuery } from '../store/api/api';
import HorizontalScroll from './scroll/HorizontalScroll';

const Recommendation = ({ type, id }) => {
  const { data, isSuccess } = useGetRecomQuery({ type, id });

  return (
    <>
      {isSuccess && <HorizontalScroll type={type} id={id} data={data.data} />}
    </>
  );
};

export default Recommendation;
