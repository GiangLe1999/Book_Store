"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { BookEntity } from "@/entities/book.entity";
import BookCard from "./book-card";

interface Props {
  books: BookEntity[];
}

const BooksSwiper: FC<Props> = ({ books }): JSX.Element => {
  return (
    <Swiper
      className="mr-3"
      spaceBetween={20}
      slidesPerView={5}
      slidesPerGroup={1}
      navigation={false}
      loop={true}
    >
      {books?.map((book) => (
        <SwiperSlide key={book._id}>
          <BookCard book={book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BooksSwiper;
