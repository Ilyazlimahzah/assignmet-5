# Blog App
This is an api for a blog app

---
Documentation: https://documenter.getpostman.com/view/14148992/2s8Z72TW4J

---

## Requirements
1. User should be able to sign up  and get a token
2. User should be able to login and get a token
3. Implement auth using passport
4. User, logged in or not should be able to get blogs
5. User, logged in or not should be able to get a blog
6. Users should be able to create blog
7. Users should be able to update and delete blog
8. Test application
9. Host application
---
## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run `npm run start`

---
## Base URL
- https://saheedaltblog.onrender.com


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  first_name |  string |  required |
|  last_name | string  |  required|
|  email     | string  |  required and unique |
|  password |   string |  required  |
|  timestamps |   date |  required  |


### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  title |  string |  required and unique |
|  description |  string |  optional |
|  author |  string |  required |
|  author_id |  ObjectId |  required |
|  state |  string |  required, default: draft, enum: ['draft', 'published'] |
|  read_count |  Number |  required |
|  reading_time |  string |  required |
|  tags | array of string |  optional |
|  body | string  |  required|
|  timestamps |   date |  required  |



## APIs
---

### Signup User

- Route: /user/signup
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1",
  "first_name": "jon",
  "last_name": "doe"
}
```

- Response

Success
```
{
    message: 'Signup successful',
    "user": {
        "email": "doe@example.com",
        "first_name": "jon",
        "last_name": "doe",
        "createdAt": "Date",
        "updatedAt": "Date",
        "id": "Number"
    },
    "token": "JWT Token"
}
```
---
### Login User

- Route: /user/login
- Method: POST
- Body: 
```
{
  "email": "doe@example.com",
  "password": "Password1"
}
```

- Responses

Success
```
{
    "message": "Login successful",
    "user": {
        "email": "doe@example.com",
        "first_name": "jon",
        "last_name": "doe",
        "createdAt": "Date",
        "updatedAt": "Date",
        "id": "Number"
    },
    "token": "JWT Token"
}
```

---
### Create Blog

- Route: /blog
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "title":"7 bullets",
    "description":"A movie anns",
    "tags":["Netflix", "van damme",  "Movie"],
    "body":"Veteran mercenary Samson Gaul (Jean-Claude Van Damme) is retired from combat when his actions resulted in the deaths of helpless victims, but now he's the last hope for a desperate father. Mixed martial artist, Andrew Fayden (Joe Flanigan) knows how to fight, but alone he's unprepared to navigate the corrupt streets of a foreign city to find his kidnapped daughter. Together, these two try to stop a network of criminals that prey upon the innocent"
}
```

- Responses

Success
```
{
   "blog": {
        "title": "7 bullets",
        "description": "A movie anns",
        "author": "jon doe",
        "author_id": "jon doe's id",
        "state": "draft",
        "read_count": 0,
        "reading_time": "0 minutes",
        "tags": [
            "Netflix",
            "van damme",
            "Movie"
        ],
        "body": "Veteran mercenary Samson Gaul (Jean-Claude Van Damme) is retired from combat when his actions resulted in the deaths of helpless victims, but now he's the last hope for a desperate father. Mixed martial artist, Andrew Fayden (Joe Flanigan) knows how to fight, but alone he's unprepared to navigate the corrupt streets of a foreign city to find his kidnapped daughter. Together, these two try to stop a network of criminals that prey upon the innocent",
        "_id": "blog ID",
        "createdAt": "2022-10-31T19:24:30.896Z",
        "updatedAt": "2022-10-31T19:24:30.896Z",
        "__v": 0
    }
}
```
---
### Get A Blog

- Route: /Blog/:id
- Method: GET
- Responses

Success
```
{
    "message": "blogs gotten",
    "blog": {
        "_id": "blog ID",
        "title": "7 bullets",
        "description": "A movie anns",
        "author": "jon doe",
        "author_id": {
            "email": "doe@example.com",
            "first_name": "jon",
            "last_name": "doe",
            "createdAt": "2022-10-31T19:17:27.095Z",
            "updatedAt": "2022-10-31T19:17:27.095Z",
            "id": "author_id"
        },
        "state": "draft",
        "read_count": 1,
        "reading_time": "0 minutes",
        "tags": [
            "Netflix",
            "van damme",
            "Movie"
        ],
        "body": "Veteran mercenary Samson Gaul (Jean-Claude Van Damme) is retired from combat when his actions resulted in the deaths of helpless victims, but now he's the last hope for a desperate father. Mixed martial artist, Andrew Fayden (Joe Flanigan) knows how to fight, but alone he's unprepared to navigate the corrupt streets of a foreign city to find his kidnapped daughter. Together, these two try to stop a network of criminals that prey upon the innocent",
        "createdAt": "2022-10-31T19:24:30.896Z",
        "updatedAt": "2022-10-31T19:24:30.896Z",
        "__v": 0
    }
}
```
### Get User Blog

- Route: /blog/me
- Method: GET
- Header
    - Authorization: Bearer {token}
- Query params:
    - state
- Responses

Success
```
{
    "message": "blogs gotten",
    "blog": [
        {
            "_id": "blog ID",
            "title": "7 bullets",
            "description": "A movie anns",
            "author": "jon doe",
            "author_id": "author ID",
            "state": "draft",
            "read_count": 1,
            "reading_time": "0 minutes",
            "tags": [
                "Netflix",
                "van damme",
                "Movie"
            ],
            "body": "Veteran mercenary Samson Gaul (Jean-Claude Van Damme) is retired from combat when his actions resulted in the deaths of helpless victims, but now he's the last hope for a desperate father. Mixed martial artist, Andrew Fayden (Joe Flanigan) knows how to fight, but alone he's unprepared to navigate the corrupt streets of a foreign city to find his kidnapped daughter. Together, these two try to stop a network of criminals that prey upon the innocent",
            "createdAt": "2022-10-31T19:24:30.896Z",
            "updatedAt": "2022-10-31T19:27:31.722Z",
            "__v": 0
        }
}
```

---

### Get Blogs

- Route: /blog
- Method: GET
- Query params:
  - Pagination:
    - page = number (default is 1)
    - blogsPerPage = number (default is 20)
  - Sort:
    - sort_by = read_count,reading_time,updatedAt,createdAt (default is createdAt)
    - sort (options: asc | desc, default: desc)
  - Filter:
    - state
    - author
    - title
    - tags (Multiple tags are seperated with a comma)
- Responses

Success
```
{
   "_id": "636020eeb9d66f4b035dc100",
            "title": "7 bullets",
            "description": "A movie anns",
            "author": "jon doe",
            "author_id": "63601f46219a9d655cd8fbc6",
            "state": "draft",
            "read_count": 2,
            "reading_time": "0 minutes",
            "tags": [
                "Netflix",
                "van damme",
                "Movie"
            ],
            "body": "Veteran mercenary Samson Gaul (Jean-Claude Van Damme) is retired from combat when his actions resulted in the deaths of helpless victims, but now he's the last hope for a desperate father. Mixed martial artist, Andrew Fayden (Joe Flanigan) knows how to fight, but alone he's unprepared to navigate the corrupt streets of a foreign city to find his kidnapped daughter. Together, these two try to stop a network of criminals that prey upon the innocent",
            "createdAt": "2022-10-31T19:24:30.896Z",
            "updatedAt": "2022-10-31T19:35:27.762Z",
            "__v": 0
}
```
---

### Update Blog

- Route: /blog/:id
- Method: Patch
- Header
    - Authorization: Bearer {token}
- Body: 
```
{
    "title":"Updated 7 bullets",
    "description":"An updated movie ",
    "tags":["new value"],
    "body":" simple",
    "state":"published"
}
```

- Responses

Success
```
{
   "_id": "636020eeb9d66f4b035dc100",
            "title": "Updated 7 bullets",
            "description": "An updated movie",
            "author": "jon doe",
            "author_id": "63601f46219a9d655cd8fbc6",
            "state": "published",
            "read_count": 2,
            "reading_time": "0 minute",
            "tags":["new value"],
            "body": "simple",
            "createdAt": "2022-10-31T19:24:30.896Z",
            "updatedAt": "2022-10-31T19:35:27.762Z",
            "__v": 0
}
```
---

### Delete Blog

- Route: /blog/:id
- Method: Delete
- Header
    - Authorization: Bearer {token}

- Responses

Success
```
{
    "message": "blog deleted",
    "deletedBlog": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
}
```
---

## Testing Setup
- check the tests branch for test files(didn't add it to the master branch because render didn't deploy with the test files)
- pull the tests branch 
- start up local mongodb server(mongodb://localhost:27017/) i.e mongo compass with the default connection uri
- run `npm run test`

---


## Contributor
- Saheed Shittu
