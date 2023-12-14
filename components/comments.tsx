"use client";

import { BookEntity } from "@/entities/book.entity";
import { DiscussionEmbed } from "disqus-react";
import { FC } from "react";

interface Props {
  book: BookEntity | undefined;
}

const Comments: FC<Props> = ({ book }): JSX.Element => {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const disqusConfig = {
    url: pageUrl,
    identifier: book?.slug,
    title: book?.name,
  };
  return <DiscussionEmbed shortname="khosach247" config={disqusConfig} />;
};

export default Comments;
