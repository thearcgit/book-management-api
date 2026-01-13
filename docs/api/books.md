
# API Conventions
- All responses follow a consistent JSON structure
- All timestamps are in ISO 8601 format (UTC)
- UUID v4 is used as primary key
- PUT replaces the entire resource

# Book Schema

```json
{
  "id": "uuid",
  "title": "string",
  "author": "string",
  "publishedYear": "number",
  "createdAt": "ISO 8601 string",
  "updatedAt": "ISO 8601 string"
}



# POST /api/books
Creates a new book.

## Request Body
```json
{
    "title": "Interview preparation",           # Must be unique
    "author": "Someone",                        # required
    "publishedYear": 2008                       # required
}
```

## Success Response 201 created
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": "uuid",
    "title": "Interview preparation",
    "author": "Someone",
    "publishedYear": 2008
  }
}

```


# GET /api/books
Fetch all books

## Success Response 200 
```json
{
  "success": true,
  "message": "All books fetched successfully",
  "data":{
    "totalBooks":2,
    "books":[
        {
            "id": "uuid",
            "title": "Interview preparation",
            "author": "Someone",
            "publishedYear": 2008
        },
        {
            "id": "uuid",
            "title": "Interview preparation 2",
            "author": "No one",
            "publishedYear": 2018
        }
    ] 
  }    
         
}

```


# GET /api/books/:id
Fetch specific books

## Success Response 200 

```json
{
    "success": true,
    "message": "Book fetched successfully!",
    "data": {
        "id": "2d3a346b-7685-476f-b89d-734254daf514",
        "title": "Interview preparation",
        "author": "Someone",
        "publishedYear": 2008
    }
}
```



# PUT /api/books/:id
Update specific books


## Original Data
```json
{
    "id": "2d3a346b-7685-476f-b89d-734254daf514",
    "title": "Interview preparation",
    "author": "Someone",
    "publishedYear": 2008
}
```

## Request Body
```json
{
    "title":"Meri pahli pustak 2",
    "author":"Someone",
    "publishedYear":2008
}
```

## Success Response 200 
```json
{
    "success": true,
    "message": "Book updated successfully!",
    "data": {
        "id": "2d3a346b-7685-476f-b89d-734254daf514",
        "title": "Meri pahli pustak 2",
        "author": "Someone",
        "publishedYear": 2008,
        "updatedAt": "2026-01-13T19:59:11.168Z"
    }
}
```

**Note:** This API uses PUT, so the full book object must be provided.
Partial updates are not supported (PATCH is not implemented).

# DELETE /api/books/:id
Delete specific books

## Success Response 200 

```json
{
    "success": true,
    "message": "Book deleted successfully!",
    "data": {
        "id": "2d3a346b-7685-476f-b89d-734254daf514",
        "title": "Meri pahli pustak 2",
        "author": "Someone",
        "publishedYear": 2008
    }
}
```


# POST /api/books/import
Import CSV for bulk add

## Success Response 200 


```json
{
    "success": true,
    "message": "CSV processed successfully!",
    "data": {
        "booksAdded": 1,
        "errors": [
            {
                "row": 3,
                "title": "",
                "issues": [
                    "\"title\" is not allowed to be empty"
                ]
            },
            {
                "row": 4,
                "title": "Node.js Design Patterns",
                "issues": [
                    "\"author\" is not allowed to be empty"
                ]
            },
            {
                "row": 5,
                "title": "Refactoring",
                "issues": [
                    "\"publishedYear\" must be a number"
                ]
            }
        ]
    }
}
```

**Note:** CSV parsing is implemented manually without using any third-party CSV parsing libraries.

### CSV Rules
- Headers must be: `title, author, publishedYear`
- Title must be unique
- Rows with validation errors are skipped
- Valid rows are inserted even if some rows fail




