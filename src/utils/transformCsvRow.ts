import { AddBookBody } from "@/types/index.types.js";


export const transformCsvRow = (row:any) => {
  return {
    title: row.title?.trim(),
    author: row.author?.trim(),
    publishedYear: Number(row.publishedYear)
  };
}