import Link from 'next/link';
import React from 'react';
import { CgProfile } from 'react-icons/cg';

import 'react-mde/lib/styles/css/react-mde-preview.css';

const Review = ({ re, converter }) => {
  console.log(re.review);
  return (
    <div className="bg-white rounded-md text-black px-4 py-2 pb-4 ">
      <div className="user-info flex items-center">
        <div className="profile-wrap flex items-center gap-2">
          <h1 className="name text-lg font-medium">@{re.username}</h1>
          {re.areYouAuthor && (
            <Link href="/profile" passHref>
              <CgProfile className="cursor-pointer" />
            </Link>
          )}
        </div>
        <p className="ml-auto">{re.date}</p>
      </div>
      <div className="mde-preview">
        <div
          className="mde-preview-content"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(re.review).toString(),
          }}></div>
      </div>
    </div>
  );
};

export default Review;
