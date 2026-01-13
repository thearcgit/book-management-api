import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "@/config/db.js";
import { addBookService } from "@/services/book.services.js";


// Mocking Prisma to prvent real DB call
vi.mock("@/config/db.js", () => {
  return {
    default: {
      book: {
        findUnique: vi.fn(),
        create: vi.fn()
      }
    }
  };
});

// Unit test for add book service function 
describe("addBookService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a book successfully", async () => {


    (prisma.book.findUnique as any).mockResolvedValue(null);   // Ensure book not exist in DB

    // Successful book DB creation and record return
    (prisma.book.create as any).mockResolvedValue({
      id: "id",
      title: "Meri pehli pustak",
      author: "Someone",
      publishedYear: 2008
    });

    // Call function
    const result = await addBookService({
      title: "Meri pehli pustak",
      author: "Someone",
      publishedYear: 2008
    });

    // Verify database methods were called once
    expect(prisma.book.findUnique).toHaveBeenCalledOnce();
    expect(prisma.book.create).toHaveBeenCalledOnce();

    // compare result
    expect(result).toEqual({
      id: "id",
      title: "Meri pehli pustak",
      author: "Someone",
      publishedYear: 2008
    });
  });

  it("should throw error if book exists", async () => {
    (prisma.book.findUnique as any).mockResolvedValue({ id: "id" });

    await expect(
      addBookService({
        title: "Meri pehli pustak",
        author: "Someone",
        publishedYear: 2008
      })
    ).rejects.toThrow("Book already exists");
  });
});
