import React from 'react';
import { IoHeartCircleSharp } from 'react-icons/io5';
import addFavorites from '../helper/addFavorites';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/slices/userSlice';
import Link from 'next/link';
import Image from 'next/image';

const Card = (props) => {
  const dispatch = useDispatch();
  const { authState } = useSelector((state) => state);
  const score = props.data.score || props.data.scored || false;

  return (
    <div className="card relative bg-slate-50 rounded-md overflow-hidden grid pb-14 content-start w-64">
      <div className="img-wrap relative h-80 w-full text-center rounded-none">
        <Image
          layout="fill"
          className="w-full flex justify-evenly items-center object-cover object-center h-full"
          src={
            props.data.image_url ||
            props.data.images.webp.image_url ||
            props.data.images.jpg.image_url ||
            ''
          }
          alt={props.data.title}
        />
      </div>
      <div className="info-wrap p-4 mb-auto">
        <div
          className={`info-top flex ${
            !!props.data.rank ? 'justify-between' : 'justify-center'
          } items-center`}>
          {!!props.data.rank && (
            <p
              className={`rank text-xl px-2 rounded-sm text-black/80 
            ${props.data.rank === 1 ? 'bg-[#ffc60c]' : ''}
            ${props.data.rank === 2 ? 'bg-[#a09f9f] text-white/100' : ''}
            ${props.data.rank === 3 ? 'bg-[#CD7F32] text-white/100' : ''}
              `}>
              #{props.data.rank}
            </p>
          )}
          <div
            className="fav cursor-pointer"
            onClick={async () => {
              if (authState) {
                dispatch(
                  userActions.updateFavorite({
                    data: props.data,
                    typename: props.type,
                  }),
                );
                await addFavorites({
                  data: props.data,
                  typename: props.type,
                  authState,
                }).catch((err) => alert(err.message));
              } else {
                alert(
                  'Go To Profile and Sign up to keep track of your favorites!!!',
                );
              }
            }}>
            {props.fav ? (
              <IoHeartCircleSharp color="red" className="text-3xl" />
            ) : (
              <IoHeartCircleSharp className="text-3xl" />
            )}
          </div>
        </div>
        <p className="title text-black font-bold text-xl">{props.data.title}</p>
        {props.date && <p className="date">{props.date}</p>}
        {score && (
          <p className="score">
            Score:
            <span className="px-1 rounded-sm text-black ">{score}</span>
          </p>
        )}
      </div>

      <Link prefetch={false} href={`/${props.type}/id/${props.data.mal_id}`}>
        <a className="card-link w-full p-4 text-center font-bol tracking-wider hover:bg-purple-500 hover:text-white/90 absolute bottom-0">
          More Info
        </a>
      </Link>
    </div>
  );
};

export default Card;
