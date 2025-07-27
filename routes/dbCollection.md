# Book Collection Project – Data Model Summary

---

## 📚 Book

| Field         | Data Type                           | Description                        |
|---------------|-------------------------------------|------------------------------------|
| _id           | ObjectId                            | Auto-generated unique ID           |
| title         | String (required)                   | Book title                         |
| author        | ObjectId (ref: Author, required)    | Reference to Author                |
| genre         | ObjectId (ref: Genre, required)     | Reference to Genre                 |
| publisher     | ObjectId (ref: Publisher, required) | Reference to Publisher             |
| status        | String (enum: 'Read', 'Unread', 'In Progress') | Reading status            |
| price         | Number                              | Price of the book                  |
| pages         | Number                              | Total number of pages              |
| publishedYear | Number                              | Year of publication                |
| language      | String                              | Language (default: 'English')      |

---

## 👤 Author

| Field   | Data Type   | Description            |
|---------|-------------|------------------------|
| _id     | ObjectId    | Auto-generated ID      |
| name    | String      | Author's name          |

---

## 🏷️ Genre

| Field   | Data Type   | Description            |
|---------|-------------|------------------------|
| _id     | ObjectId    | Auto-generated ID      |
| name    | String      | Genre name             |

---

## 🏢 Publisher

| Field   | Data Type   | Description            |
|---------|-------------|------------------------|
| _id     | ObjectId    | Auto-generated ID      |
| name    | String      | Publisher name         |

---

