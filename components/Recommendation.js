import React from 'react';
import { useGetRecomQuery } from '../store/api/api';
import BackButton from './BackButton';
import Card from './Card';
import Loading from './UI/Loading';

const Recommendation = ({ type, id }) => {
  const { data, isSuccess, isFetching, isError } = useGetRecomQuery({
    type,
    id,
  });
  return (
    <div className="single-page text-black/100">
      <BackButton />
      {isFetching && <Loading />}
      {!isFetching && isError && (
        <h1 className="err w-max m-auto">{error.message}</h1>
      )}
      <div className="cards max-w-screen-lg flex flex-wrap justify-center w-full my-8 gap-8 px-8 ">
        {isSuccess &&
          data.data.map(({ entry }) => {
            return <Card key={entry.mal_id} type={type} id={id} data={entry} />;
          })}
      </div>
    </div>
  );
};

export default Recommendation;
