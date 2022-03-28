import Link from 'next/link';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import 'react-mde/lib/styles/css/react-mde-preview.css';

const Review = ({ re, converter }) => {
  const [readmore, setreadmore] = useState(false);

  const md = converter.makeHtml(re.review);
  let review = md;
  if (md.length > 200) {
    review = readmore ? md : md.substring(0, 200);
  }

  return (
    <div className="bg-white rounded-md text-black px-4 py-2 pb-4 ">
      <div className="user-info flex items-center">
        <div className="profile-wrap flex items-center gap-2">
          <h1 className="name text-lg font-medium">@{re.username}</h1>
          {re.areYouAuthor && (
            <Link href="/profile">
              <a>
                <CgProfile className="cursor-pointer" />
              </a>
            </Link>
          )}
        </div>
        <p className="ml-auto">{re.date}</p>
      </div>

      <div className="mde-preview select-none flex flex-col">
        <div
          className="mde-preview-content overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: review,
          }}></div>
        {md.length > 200 && (
          <div
            className="text-purple-600 cursor-pointer flex justify-end w-full"
            onClick={() => setreadmore((prev) => !prev)}>
            <div className="flex items-center">
              {!readmore ? (
                <>
                  Read More
                  <AiFillCaretDown />
                </>
              ) : (
                <>
                  <AiFillCaretUp />
                  Close
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
