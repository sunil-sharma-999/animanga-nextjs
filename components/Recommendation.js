import React from 'react';
import { useGetRecomQuery } from '../store/api/api';
import BackButton from './BackButton';
import Card from './Card';
import Loading from './UI/Loading';
import Image from 'next/image';
import Link from 'next/link';

const Recommendation = ({ type, id }) => {
  const { data, isSuccess, isFetching, isError } = useGetRecomQuery({
    type,
    id,
  });

  if (isFetching) {
    return (
      <div className="single-page text-black/100">
        <Loading />
      </div>
    );
  }

  if (!isFetching && isError) {
    return (
      <div className="single-page text-black/100">
        <h1 className="err w-max m-auto">{error.message}</h1>
      </div>
    );
  }

  return (
    <div className="single-page text-black/100">
      <BackButton />
      <div className="cards max-w-screen-lg flex flex-wrap justify-center w-full my-8 gap-8 pb-10">
        {isSuccess &&
          data.data.map(({ entry }) => {
            return (
              <div
                key={entry.mal_id}
                className="card relative bg-slate-50 rounded-md overflow-hidden grid pb-8 content-start w-44">
                <div className="img-wrap relative h-52 w-full text-center rounded-none">
                  <Image
                    layout="fill"
                    className="w-full flex justify-evenly items-center object-cover object-center h-full text-center"
                    src={
                      entry.image_url ||
                      entry.images.jpg.image_url ||
                      entry.images.webp.image_url
                    }
                    alt={entry.title}
                  />
                </div>
                <div className="info-wrap p-4 mb-4 text-center">
                  <p className="title text-black font-bold text-xl">
                    {entry.title}
                  </p>
                </div>
                <Link prefetch={false} href={`/${type}/id/${entry.mal_id}`}>
                  <a className="card-link w-full p-4 text-center font-bol tracking-wider hover:bg-purple-500 hover:text-white/90 absolute bottom-0">
                    More Info
                  </a>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Recommendation;
