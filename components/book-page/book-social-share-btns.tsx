"use client";

import { FC } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
} from "next-share";
import SocialShareBtn from "../social-share-btn";
import { path } from "@/constants";

interface Props {
  slug: string;
  title: string;
  quote?: string;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const BookSocialShare: FC<Props> = ({ slug, title, quote }): JSX.Element => {
  const url = `${baseURL}${path.book}${slug}`;

  return (
    <div className="grid grid-cols-5 max-[830px]:grid-cols-4 max-[650px]:grid-cols-3 max-[450px]:grid-cols-2 gap-4 w-full">
      <FacebookShareButton url={url} quote={quote} title={title}>
        <SocialShareBtn title="Facebook" color="#404f89" subColor="#475899" />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <SocialShareBtn title="Twitter" color="#5d9ad7" subColor="#68abef" />
      </TwitterShareButton>

      <LinkedinShareButton url={url} title={title}>
        <SocialShareBtn title="Linkedin" color="#446ea3" subColor="#4c7bb5" />
      </LinkedinShareButton>

      <PinterestShareButton url={url} description={title} media={title}>
        <SocialShareBtn title="Pinterest" color="#9b1f15" subColor="#ad2217" />
      </PinterestShareButton>

      <RedditShareButton url={url} title={title}>
        <SocialShareBtn title="Reddit" color="#d94800" subColor="#c74200" />
      </RedditShareButton>
    </div>
  );
};

export default BookSocialShare;
