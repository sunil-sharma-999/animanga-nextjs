import BackButton from './BackButton';
import Reviews from './Reviews';
import Loading from './UI/Loading';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/slices/userSlice';
import addFavorites from '../helper/addFavorites';
import { useGetSingleItemQuery } from '../store/api/api';
import useGetReviews from '../hooks/useGetReviews';
import Image from 'next/image';
import Recommendation from './Recommendation';
import Link from 'next/link';

const Anime = ({ id }) => {
  const dispatch = useDispatch();

  const {
    data: results,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useGetSingleItemQuery({
    type: 'anime',
    id,
  });

  const {
    userData: { favList },
    authState,
  } = useSelector((state) => state);

  const { reviews } = useGetReviews({
    type: 'anime',
    id,
    authState,
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
            <div className="image-wrap h-72 w-48 m-auto sm:mx-0 items-center flex flex-col relative">
              <div className="h-full w-full relative">
                <Image
                  layout="fill"
                  src={results.data.images.jpg.image_url}
                  alt={results.data.title}
                  className="object-cover object-center"
                />
              </div>
              <div
                className="fav overflow-hidden rounded-full bg-white text-4xl text-black cursor-pointer absolute top-1 left-1"
                onClick={async () => {
                  if (authState) {
                    dispatch(
                      userActions.updateFavorite({
                        data: results.data,
                        typename: 'anime',
                      }),
                    );
                    await addFavorites({
                      data: results.data,
                      typename: 'anime',
                      authState,
                    });
                  } else {
                    alert(
                      'Go To Profile and Sign up to keep track of your favorites!!!',
                    );
                  }
                }}>
                {favList.includes(`anime:${results.data.mal_id}`) ? (
                  <IoHeartCircleSharp color="red" />
                ) : (
                  <IoHeartCircleSharp />
                )}
              </div>
              <Link href={`/anime/${id}/recommendation`} alt="recom">
                <a className="text-white/80 bg-purple-800 block py-2 w-max px-4 mt-2">
                  Recommendations
                </a>
              </Link>
            </div>

            <div className="info-wrap ml-0 sm:ml-4 w-full">
              <h1 className="text-3xl text-white text-center my-3 sm:text-left sm:my-0">
                {results.data.title}
              </h1>
              <hr className="text-white my-2" />
              <p>
                <span className="text-white"> Type: </span> {results.data.type}
              </p>
              <p>
                <span className="text-white"> Episodes: </span>{' '}
                {results.data.episodes}
              </p>
              <p>
                <span className="text-white"> Source: </span>{' '}
                {results.data.source}
              </p>
              <p>
                <span className="text-white"> Status: </span>{' '}
                {results.data.status}
              </p>
              <p>
                <span className="text-white"> Genres: </span>
                {results.data.genres.map((g) => (
                  <span key={g.name}>{g.name}, </span>
                ))}
              </p>
              {!!results.data.themes.length && (
                <p>
                  <span className="text-white">Theme: </span>
                  {results.data.themes.map((t) => (
                    <span key={t.name}>{t.name},</span>
                  ))}
                </p>
              )}
              {!!results.data.demographics.length && (
                <p>
                  <span className="text-white">Demographics: </span>
                  {results.data.demographics.map((d) => (
                    <span key={d.name}>{d.name},</span>
                  ))}
                </p>
              )}
              {!!results.data.studios.length && (
                <p>
                  <span className="text-white">Studios: </span>
                  {results.data.studios.map((s) => (
                    <span key={s.name}>{s.name}, </span>
                  ))}
                </p>
              )}
              {!!results.data.producers.length && (
                <p>
                  <span className="text-white">Producers: </span>
                  {results.data.producers.reduce(
                    (p1, p2) => p1 + `${p2.name}, `,
                    '',
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="bottom mt-4">
            <details className="text-block max-w-5xl" open>
              <summary className="text-lg text-white">Synopsis</summary>
              {results.data.synopsis}
            </details>
            {results.data.background && (
              <details className="text-block mt-4 max-w-5xl">
                <summary className="text-lg text-white">Background</summary>
                {results.data.background}
              </details>
            )}
            <Reviews
              reviews={reviews}
              mal_id={results.data.mal_id}
              type="anime"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Anime;
