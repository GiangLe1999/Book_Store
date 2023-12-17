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
      breakpoints={{
        0: { slidesPerView: 2 },
        700: { slidesPerView: 3 },
        900: { slidesPerView: 4 },
        1100: { slidesPerView: 5 },
      }}
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
