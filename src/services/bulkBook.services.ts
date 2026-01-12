import prisma from "@/config/db.js";
import { AddBookBody } from "@/types/index.types.js";
import { transformCsvRow } from "@/utils/transformCsvRow.js";
import { bookSchema } from "@/validators/bookSchema.js";

type ImportErrors = {
    row: number,
    title?: string,
    issues: string[]
}
export const bulkUploadService = async (buffer: Buffer) => {
    // Convert buffer string into string 
    const content = buffer.toString("utf-8").trim()

    // Split buffer string from next line
    const lines = content.split('\n')

    // Extract headers
    const headers = lines[0]?.split(',').map(header => header.trim())
    const errors: ImportErrors[] = [];
    let booksAdded = 0;
    
    // Header validation
    const requiredHeaders = ["title", "author", "publishedYear"];
    if (!requiredHeaders.every(h => headers?.includes(h))) {
        throw new Error("Invalid CSV headers");
    }
    
    // Run loop for every row to validate and save data in Database
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i]
        if (!line) continue

        // Create array of every column value
        const values = line.split(",").map(column => column.trim());

        // Push error if there is mismatch in number of column
        if (values?.length !== headers?.length) {
            errors.push({
                row: i + 1,
                title: values[0] ?? '',
                issues: ["column count mismatch"]
            });
            continue;
        }

        // Convert a row in object of string
        const rawRow = headers?.reduce<Record<string, string>>((acc, header, index) => {
            acc[header] = values[index] ?? "";
            return acc;
        }, {});

        // Transform raw object into prefered object 
        const transformedRow = transformCsvRow(rawRow);
        
        // Validate every row with joi 
        const { error, value } = bookSchema.validate(transformedRow, {
            abortEarly: false
        });
        console.log('content in service', { error, value, i })

        // Push error if joi gives error
        if (error) {
            errors.push({
                row: i + 1,
                title: value.title,
                issues: error.details.map(e => e.message)
            });
            continue;
        }

        // Check duplicate in database
        const existingBook = await prisma.book.findUnique({
            where: { title: value.title }
        });
        console.log('existing', existingBook)
        if (existingBook) {
            errors.push({
                row: i + 1,
                title: value.title,
                issues: ["book already exists"]
            });
            continue;
        }

        // Save book in database
        await prisma.book.create({ data: value });

        booksAdded++;
    }

    return { booksAdded, errors };
}




