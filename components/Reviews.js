/* eslint-disable react/no-children-prop */
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Showdown from 'showdown';
import Review from './Review';

const Reviews = ({
  type,
  reviews: { currentItemReviews, myreview },
  mal_id,
}) => {
  const authState = useSelector((state) => state.authCheck);

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <div className="text-block mt-4 max-w-screen-lg">
      <p className="text-xl text-white">Reviews</p>
      <hr className="text-white my-2" />
      <div className="reviews flex flex-col my-2 gap-2">
        {!!authState && (
          <Link href={`/edit/${type}/${mal_id}`}>
            <a className="bg-purple-700 w-max my-2 px-2 py-1 text-white rounded-sm self-end">
              {!!myreview ? 'Update' : 'Add'} Review
            </a>
          </Link>
        )}

        {!!authState && !!currentItemReviews.length && (
          <div className="reviews-wrap mx-auto w-full flex flex-col gap-4">
            {currentItemReviews.map((re) => {
              return <Review key={re.id} re={re} converter={converter} />;
            })}
          </div>
        )}
        {!!authState && !currentItemReviews.length && (
          <p className="text-slate-300 text-lg my-4 text-center">
            No reviews Found
          </p>
        )}
        {!authState && (
          <div className="text-slate-300 text-lg text-center my-4">
            <p>Sign In to Read and Post Reviews</p>
            <p>Join The Community if You Are New Here</p>
            <div>
              {'(☞ﾟヮﾟ)☞'.toString()}
              <Link href="/profile">
                <a className="mx-2 border-b-2 border-purple-500">Profile</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
