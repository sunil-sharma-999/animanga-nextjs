import BackButton from './BackButton';
import Reviews from './Reviews';
import Loading from './UI/Loading';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/slices/userSlice';
import addFavorites from '../helper/addFavorites';
import { useGetSingleItemQuery } from '../store/api/api';
import useGetReviews from '../hooks/useGetReviews';
import Image from 'next/image';
import Recommendation from './Recommendation';
import Link from 'next/link';

const Manga = ({ id }) => {
  const dispatch = useDispatch();

  const {
    data: results,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useGetSingleItemQuery({
    type: 'manga',
    id,
  });
  console.log(results);
  const {
    userData: { favList },
    authState,
  } = useSelector((state) => state);

  const { reviews } = useGetReviews({
    type: 'manga',
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
            <div className="image-wrap h-72 w-48 sm:w-56 m-auto sm:mx-0 items-center flex flex-col relative">
              <div className="h-full w-full relative">
                <Image
                  layout="fill"
                  src={results.data.images.jpg.image_url}
                  alt={results.data.title}
                  className="object-cover object-center"
                />
              </div>
              <div
                className="fav overflow-hidden rounded-sm bg-white w-full text-4xl mt-2 text-black cursor-pointer py-1 absolute top-1 left-1"
                onClick={async () => {
                  if (authState) {
                    dispatch(
                      userActions.updateFavorite({
                        data: results.data,
                        typename: 'manga',
                      }),
                    );
                    await addFavorites({
                      data: results.data,
                      typename: 'manga',
                      authState,
                    });
                  } else {
                    alert(
                      'Go To Profile and Sign up to keep track of your favorites!!!',
                    );
                  }
                }}>
                {favList.includes(`manga:${results.data.mal_id}`) ? (
                  <IoHeartCircleSharp color="red" />
                ) : (
                  <IoHeartCircleSharp />
                )}
              </div>
              <Link href={`/manga/${id}/recommendation`} alt="recom">
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
                <span className="text-white"> Volumes:</span>{' '}
                {results.data.volumes}
              </p>
              <p>
                <span className="text-white"> Chapters:</span>{' '}
                {results.data.chapters}
              </p>
              <p>
                <span className="text-white"> Status:</span>{' '}
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
              {!!results.data.demographics && (
                <p>
                  <span className="text-white">Demographics: </span>
                  {results.data.demographics.map((d) => (
                    <span key={d.name}>{d.name},</span>
                  ))}
                </p>
              )}
              {!!results.data.serializations && (
                <p>
                  <span className="text-white">Serialization: </span>
                  {results.data.serializations.map((s) => (
                    <span key={s.name}>{s.name},</span>
                  ))}
                </p>
              )}
              {!!results.data.authors.length && (
                <p>
                  <span className="text-white">Authors: </span>
                  {results.data.authors.map((a) => (
                    <span key={a.name}>{a.name},</span>
                  ))}
                </p>
              )}
              <a
                className="text-purple-800"
                href={results.data.url}
                alt="MAL link">
                MAL Link
              </a>
            </div>
          </div>

          <div className="bottom mt-4">
            {results.data.synopsis && (
              <div className="text-block max-w-5xl">
                <p className="text-xl text-white ">Synopsis</p>
                <hr className="text-white my-2" />
                <p> {results.data.synopsis}</p>
              </div>
            )}
            {results.data.background && (
              <details className="text-block mt-4 max-w-5xl">
                <summary className="text-xl text-white ">Background</summary>
                {results.data.background}
              </details>
            )}

            <Reviews
              reviews={reviews}
              mal_id={results.data.mal_id}
              type="manga"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Manga;
