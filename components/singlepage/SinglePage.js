import React from 'react';
import { useSelector } from 'react-redux';
import useGetReviews from '../../hooks/useGetReviews';
import { useGetSingleItemQuery } from '../../store/api/api';
import BackButton from '../BackButton';
import Reviews from '../Reviews';
import Loading from '../UI/Loading';
import SinglePageImageWrap from './SinglePageImageWrap';

const SinglePage = ({ id, type, availableMediaFields }) => {
  const {
    data: results,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useGetSingleItemQuery({
    type,
    id,
  });

  const { authState } = useSelector((state) => state);

  const { reviews } = useGetReviews({
    type,
    id,
    authState: authState,
  });

  return (
    <div className="single-page">
      <BackButton />
      {isFetching && <Loading />}
      {!isFetching && isError && (
        <h1 className="err w-max m-auto">{error.message}</h1>
      )}
      {!isFetching && isSuccess && results.data && (
        <div className="text-gray-300 self-start mt-4">
          <div className="top flex flex-col sm:flex-row">
            <SinglePageImageWrap
              src={results.data.images.jpg.image_url}
              title={results.data.title}
              mal_id={results.data.mal_id}
              type={type}
            />

            <div className="info-wrap ml-0 sm:ml-4 w-full">
              <h1 className="text-3xl text-white text-center my-3 sm:text-left sm:my-0">
                {results.data.title}
              </h1>
              <hr className="text-white my-2" />
              {availableMediaFields.str.map((field) => {
                return (
                  <p key={field}>
                    <span className="text-white">{field}: </span>
                    {results.data[field.toLocaleLowerCase()]}
                  </p>
                );
              })}
              {availableMediaFields
                .filterAvailables(results.data, availableMediaFields.arrs)
                .map((field) => {
                  return (
                    <p key={field}>
                      <span className="text-white">{field}: </span>
                      {results.data[field.toLocaleLowerCase()].map((t) => (
                        <span key={t.name}>{t.name}, </span>
                      ))}
                    </p>
                  );
                })}
            </div>
          </div>

          <div className="bottom mt-4">
            {availableMediaFields
              .filterAvailables(results.data, availableMediaFields.otherInfo)
              .map((field) => {
                return (
                  <details
                    key={field}
                    className="text-block mt-4 max-w-5xl"
                    open>
                    <summary className="text-xl text-white ">{field}</summary>
                    {results.data[field.toLocaleLowerCase()]}
                  </details>
                );
              })}
            <Reviews
              reviews={reviews}
              mal_id={results.data.mal_id}
              type={type}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
