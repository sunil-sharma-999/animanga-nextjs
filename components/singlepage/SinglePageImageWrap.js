import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoHeartCircleSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/slices/userSlice';

const SinglePageImageWrap = ({ type, src, title, mal_id }) => {
  const dispatch = useDispatch();

  const {
    userData: { favList },
    authState,
  } = useSelector((state) => state);

  return (
    <div className="image-wrap h-72 w-48 sm:w-56 m-auto sm:mx-0 items-center flex flex-col relative">
      <div className="h-full w-full relative">
        <Image
          layout="fill"
          src={src}
          alt={title}
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
                typename: type,
              }),
            );
            await addFavorites({
              data: results.data,
              typename: type,
              authState,
            });
          } else {
            alert(
              'Go To Profile and Sign up to keep track of your favorites!!!',
            );
          }
        }}>
        {favList.includes(`${type}:${mal_id}`) ? (
          <IoHeartCircleSharp color="red" />
        ) : (
          <IoHeartCircleSharp />
        )}
      </div>
      <Link href={`/${type}/${mal_id}/recommendation`} alt="recom">
        <a className="text-white/80 bg-purple-800 block py-2 w-full rounded-sm px-4 mt-2 mx-0">
          Recommendations
        </a>
      </Link>
    </div>
  );
};

export default SinglePageImageWrap;
