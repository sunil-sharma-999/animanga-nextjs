import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { addCurrentReview, addMyreview } from '../store/slices/reviewsSlice';

const useGetReviews = ({ type, id, authState }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    if (authState) {
      getDoc(doc(db, 'reviews', type + ':' + id))
        .then((res) => {
          if (res.exists()) {
            const results = res.data();
            dispatch(addMyreview(''));
            const data = Object.entries(results)
              .map(([key, re]) => {
                const isAuthor = key === authState;
                isAuthor && dispatch(addMyreview(re.review));

                return {
                  ...re,
                  id: re.date.seconds,
                  areYouAuthor: isAuthor,
                  seconds: re.date.seconds,
                  date: new Date(re.date.seconds * 1000).toLocaleString(),
                };
              })
              .sort((a, b) => (b.areYouAuthor ? 1 : -1));
            dispatch(addCurrentReview(data));
          } else {
            dispatch(addCurrentReview([]));
            dispatch(addMyreview(''));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [id, type, authState, dispatch]);

  return { reviews };
};

export default useGetReviews;
