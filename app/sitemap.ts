import slugify from "slugify";
import dbConnect from "@/lib/db";
import { MetadataRoute } from "next";
import User from "@/models/User";
import { path } from "@/constants";
import { UserEntity } from "@/entities/user.entity";
import { BookEntity } from "@/entities/book.entity";
import Book from "@/models/Book";

type ObjectArr = { url: string; lastModified: Date }[];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

  dbConnect();

  const users: UserEntity[] = await User.find().select("name updatedAt");
  const userLinks = users?.map((user) => ({
    url: `${baseURL}${path?.administrator}${slugify(user.name, {
      lower: true,
    })}`,
    lastModified: new Date(user?.updatedAt),
  })) as ObjectArr;

  const books: BookEntity[] = await Book.find().select("slug updatedAt");
  const bookLinks = books?.map((book) => ({
    url: `${baseURL}${path?.book}${slugify(book.slug, {
      lower: true,
    })}`,
    lastModified: new Date(book?.updatedAt),
  })) as ObjectArr;

  const mainCategories: BookEntity[] = await Book.find().select(
    "slug updatedAt"
  );
  const mainCategoryLinks = mainCategories?.map((mainCategory) => ({
    url: `${baseURL}${path?.administrator}${slugify(mainCategory.slug, {
      lower: true,
    })}`,
    lastModified: new Date(mainCategory?.updatedAt),
  })) as ObjectArr;

  const subCategories: BookEntity[] = await Book.find().select(
    "slug updatedAt"
  );
  const subCategoryLinks = subCategories?.map((subCategory) => ({
    url: `${baseURL}${path?.administrator}${slugify(subCategory.slug, {
      lower: true,
    })}`,
    lastModified: new Date(subCategory?.updatedAt),
  })) as ObjectArr;

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allAuthors}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allBooks}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allCategories}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allPublishers}`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}${path.allTags}`,
      lastModified: new Date(),
    },
    ...userLinks,
    ...bookLinks,
    ...mainCategoryLinks,
    ...subCategoryLinks,
  ];
}
