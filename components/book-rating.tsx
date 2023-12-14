"use client";

import { FC, useState } from "react";
import { StarRating } from "./star-rating";
import { rateBook } from "@/service/books.service";
import toast from "react-hot-toast";

interface Props {
  bookId: string;
}

const BookRating: FC<Props> = ({ bookId }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const rateHandler = async (rating: number) => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      const ok = await rateBook(bookId, rating);

      if (ok) {
        toast.success("Cảm ơn bạn đã đánh giá!");
        setIsReadOnly(true);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="text-center py-3">
      <p className="mt-3 mb-4 font-bold">Để lại đánh giá của bạn</p>
      <StarRating size={35} clickHandler={rateHandler} readonly={isReadOnly} />
    </div>
  );
};

export default BookRating;
