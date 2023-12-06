"use client";

import { FC, useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import BtnWithIcon from "../btn-with-icon";
import { BiPlusCircle } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { path } from "@/constants";
import moment from "moment";
import CustomModal from "../custom-modal";
import { getAllBooksForAdmin } from "@/service/books.service";
import { BookEntity } from "@/entities/book.entity";

interface Props {}

const BooksTable: FC<Props> = (): JSX.Element => {
  const [books, setBooks] = useState<BookEntity[]>([]);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletedBook, setDeletedBook] = useState<BookEntity>();

  const fetchBooks = async () => {
    setIsLoading(true);
    const fetchedBooks = await getAllBooksForAdmin();
    setBooks(fetchedBooks as BookEntity[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div className="admin-card-body">
        <div className="text-right">
          <BtnWithIcon
            content="Thêm sách mới"
            icon={BiPlusCircle}
            iconSize={18}
            to={path.createBook}
            customClasses="block ml-auto w-fit"
          />
        </div>

        <table className="w-full admin-table mt-4">
          <thead>
            <tr>
              <th>Tên sách</th>
              <th>Đường dẫn</th>
              <th>Lượt xem</th>
              <th>Ngày sửa</th>
              <th>Sửa / Xóa</th>
              <th>Live link</th>
            </tr>
          </thead>

          {isLoading ? (
            <>
              {[...Array(6).keys()].map((item) => (
                <tr key={item} className="mb-3">
                  <td colSpan={6}>
                    <Skeleton className="w-full h-10" />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tbody>
              {books.map((book) => (
                <tr key={book._id.toString()}>
                  <td className="text-center">{book.name}</td>
                  <td className="text-center">{book.slug}</td>
                  <td className="text-center">{book.views}</td>
                  <td className="text-center">
                    {moment(book.updatedAt).format("L")}
                  </td>
                  <td className="flex items-center justify-center gap-4">
                    <Link href={`${path.editBook}?slug=${book.slug}`}>
                      <MdEditSquare
                        className="mt-1 cursor-pointer text-blue-900"
                        size={18}
                      />
                    </Link>
                    <AiFillDelete
                      className="mt-1 cursor-pointer text-red-700"
                      size={18}
                      onClick={() => {
                        setShowDeleteForm(true);
                        setDeletedBook(book);
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <a
                      href={`${book.slug}`}
                      target="_blank"
                      className="underline text-sm font-bold text-blue-600"
                    >
                      Xem
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* <CustomModal
        heading="Cảnh báo"
        onClose={() => setShowDeleteForm(false)}
        open={showDeleteForm}
      >
        <DeleteBookForm
          setShowDeleteForm={setShowDeleteForm}
          refetch={fetchBooks}
          deletedBook={deletedBook as BookEntity}
        />
      </CustomModal> */}
    </>
  );
};

export default BooksTable;
