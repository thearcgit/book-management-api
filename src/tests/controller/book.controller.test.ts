import { describe, it, expect, vi } from "vitest";
import { addBook } from "@/controllers/book.controller.js";
import * as bookService from "@/services/book.services.js";



describe(`Book controller`, () => {
    it(`Should return status 201 and added book`, async () => {

        // Arrange
        const mockReq = {
            body: {
                title: "Coding pustak",
                author: "None",
                publishedYear: 2008,
            },
        };
        const mockRes = {
            status: vi.fn().mockReturnThis(),           // Sets HTTP status
            json: vi.fn(),
        };
        const mockNext = vi.fn();

        // Act
        vi.spyOn(bookService, "addBookService").mockResolvedValue({
            id: "id",
            title: "Coding pustak",
            author: "None",
            publishedYear: 2008,
        });

        await addBook(mockReq as any, mockRes as any, mockNext)

        // ASSERTIONS 
        expect(bookService.addBookService).toHaveBeenCalledWith(mockReq.body);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(
            {
                success: true,
                message:"Book added successfully!",
                data: {
                    id: "id",
                    title: "Coding pustak",
                    author: "None",
                    publishedYear: 2008,
                },
            }
        );
        expect(mockNext).not.toHaveBeenCalled();
    })
})