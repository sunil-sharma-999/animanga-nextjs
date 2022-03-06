/* eslint-disable react/no-children-prop */
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import addReview from '../helper/addReview';
import { deleteReview } from '../helper/deleteReview';
import Loading from './UI/Loading';
import BackButton from './BackButton';
import { AiFillDelete } from 'react-icons/ai';
import { useRouter } from 'next/router';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
// import { getDefaultToolbarCommands } from 'react-mde';
import Showdown from 'showdown';

import useGetReviews from '../hooks/useGetReviews';

const ReviewForm = ({ type, id }) => {
  const [selectedTab, setSelectedTab] = React.useState('write');
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setvalue] = useState(null);

  const {
    authCheck: authState,
    userData: { username },
    reviews: { myreview, currentItemReviews },
  } = useSelector((state) => state);

  useGetReviews({ type, id, authState });

  useEffect(() => {
    setvalue(myreview || '> hello world');
  }, [myreview]);

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = e.nativeEvent.submitter.name;
    if (name === 'delete') {
      if (window.confirm('Are you sure? (* ￣︿￣)')) {
        setIsLoading(true);
        setErr(false);

        deleteReview({
          collectionName: type + ':' + id,
          authState,
        })
          .then((res) => {
            setIsLoading(false);
            router.push(`/${type}/id/${id}`);
          })
          .catch((err) => {
            setIsLoading(false);
            setErr(err.message);
          });
      }
    } else {
      setIsLoading(true);
      setErr(false);
      await addReview({
        authState,
        username,
        isDocNull: !currentItemReviews.length,
        collectionName: type + ':' + id,
        review: value,
      })
        .then(() => {
          setIsLoading(false);
          router.push(`/${type}/id/${id}`);
        })
        .catch((error) => {
          setIsLoading(false);
          setErr(error.message.split(':')[0]);
        });
    }
  };

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <div className="review-wrap mt-10 w-full max-w-5xl md:max-w-3xl lg:max-w-5xl p-10 pt-0">
      <BackButton />
      {isLoading && <Loading />}
      {!isLoading && err && <h1 className="err text-center  mx-auto">{err}</h1>}
      <form
        onSubmit={submitHandler}
        className="flex w-full mx-auto flex-col my-5">
        <ReactMde
          value={value}
          onChange={setvalue}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          toolbarCommands={[
            ['header', 'bold', 'italic'],
            ['strikethrough', 'quote', 'image'],
            ['unordered-list', 'ordered-list', 'checked-list'],
          ]}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
        <div
          className={`btn-wrap text-white flex ${
            !!myreview ? 'justify-between' : 'justify-end'
          }`}>
          {!!myreview && (
            <button
              name="delete"
              className="bg-rose-700 w-max my-2 px-2 py-1 rounded-sm">
              <AiFillDelete />
            </button>
          )}
          <button
            name="add"
            className="bg-purple-700 w-max my-2 px-2 py-1 rounded-sm">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
