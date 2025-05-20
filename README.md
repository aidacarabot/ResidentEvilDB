# 🎮 Resident Evil REST API Project - Games & Characters

This is a REST API project that manages a database of games and characters from the Resident Evil franchise. The API allows creating, reading, updating, and deleting both games and characters. Additionally, the API is designed to link characters to the games they appear in. 🧟‍♂️🕹️

## 🛠️ Technologies Used

- **Node.js** 🟢
- **Express.js** 🚀
- **Mongoose** (ODM for MongoDB) 📚
- **MongoDB** (using MongoDB Atlas) 🍃

## ⚙️ Project Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/aidact3/ResidentEvilDB
   cd ResidentEvilDB
   ```

2. **Install Dependencies:**

   Make sure you have `Node.js` and `npm` installed.

   ```bash
   npm install
   ```

3. **Set Environment Variables:**

   Create a `.env` file at the root with the following variables:

   ```bash
   MONGODB_URI=mongodb+srv://your-user:your-password@cluster0.mongodb.net/your-database?retryWrites=true&w=majority
   PORT=3000
   ```

4. **Start the Server:**

   ```bash
   npm start
   ```

   The server will run at `http://localhost:3000`. 🚀

## 🔌 API Endpoints

### 🎲 Games

#### `GET /api/v1/games`

- **Description:** Gets a list of all games in the database, including the names of associated characters instead of their IDs.
- **Success Response:**

  - Status: 200
  - Example:

    ```json
    [
      {
        "title": "Resident Evil",
        "releaseDate": "1996-03-22T00:00:00.000Z",
        "storyline": "A special forces team investigates a series of strange murders...",
        "characters": ["Chris Redfield", "Jill Valentine"],
        "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/a/a6/Resident_Evil_1_cover.png"
      }
      // More games...
    ]
    ```

#### `POST /api/v1/games`

- **Description:** Creates a new game in the database.
- **Parameters:**
  - `title` (String, required): The game's title.
  - `releaseDate` (Date, required): Game release date.
  - `storyline` (String): Game plot.
  - `characters` (Array of ObjectIds): IDs of related characters.
  - `coverImageUrl` (String): URL for the game's cover image.
- **Example Request Body:**

  ```json
  {
    "title": "Resident Evil Village",
    "releaseDate": "2021-05-07",
    "storyline": "Ethan Winters faces new horrors while searching for his daughter...",
    "characters": ["ObjectId_of_Ethan"],
    "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/96/Resident_Evil_Village.png"
  }
  ```

- **Success Response:**

  - Status: 201
  - Example:

    ```json
    {
      "_id": "60d8f681cba3d1e828a63bef",
      "title": "Resident Evil Village",
      "releaseDate": "2021-05-07T00:00:00.000Z",
      "storyline": "Ethan Winters faces new horrors while searching for his daughter...",
      "characters": ["ObjectId_of_Ethan"],
      "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/96/Resident_Evil_Village.png"
    }
    ```

#### `PUT /api/v1/games/:id`

- **Description:** Updates an existing game, making sure existing characters in the array aren't removed and preventing duplicates when adding new characters.
- **Route Params:**
  - `id`: The ID of the game to update.
- **Body Params:** Same as POST `/api/v1/games`.
- **Success Response:**

  - Status: 200
  - Example:

    ```json
    {
      "_id": "60d8f681cba3d1e828a63bef",
      "title": "Resident Evil Village",
      "releaseDate": "2021-05-07T00:00:00.000Z",
      "storyline": "Ethan Winters faces new horrors while searching for his daughter...",
      "characters": ["ObjectId_of_Ethan"],
      "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/96/Resident_Evil_Village.png"
    }
    ```

  **Note:** This endpoint uses the `$addToSet` operator to avoid deleting related data and prevent duplicates in the characters array. ⚠️

#### `DELETE /api/v1/games/:id`

- **Description:** Deletes a game from the database.
- **Route Params:**
  - `id`: The ID of the game to delete.
- **Success Response:**

  - Status: 200
  - Example:

    ```json
    {
      "message": "Game deleted successfully",
      "element": {
        "_id": "60d8f681cba3d1e828a63bef",
        "title": "Resident Evil Village",
        "releaseDate": "2021-05-07T00:00:00.000Z",
        "storyline": "Ethan Winters faces new horrors while searching for his daughter...",
        "characters": ["ObjectId_of_Ethan"],
        "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/96/Resident_Evil_Village.png"
      }
    }
    ```

### 🧟 Characters

#### `GET /api/v1/characters`

- **Description:** Gets all characters in the database.
- **Success Response:**

  - Status: 200
  - Example:

    ```json
    [
      {
        "name": "Leon S. Kennedy",
        "role": "Protagonist",
        "bio": "Leon S. Kennedy is a U.S. government agent, known for his involvement in bioterror incidents.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/en/f/f5/LeonScottKennedy.png"
      }
      // More characters...
    ]
    ```

#### `POST /api/v1/characters`

- **Description:** Creates a new character.
- **Parameters:**
  - `name` (String, required): Character's name.
  - `role` (String): Character's role in the story.
  - `bio` (String): Character biography.
  - `imageUrl` (String): URL to character image.
- **Example Request Body:**

  ```json
  {
    "name": "Chris Redfield",
    "role": "Protagonist",
    "bio": "Chris Redfield is a veteran S.T.A.R.S. member and one of the franchise's key protagonists.",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/ChrisRedfieldResidentEvil5render.png"
  }
  ```

- **Success Response:**

  - Status: 201
  - Example:

    ```json
    {
      "_id": "60d8f681cba3d1e828a63bf2",
      "name": "Chris Redfield",
      "role": "Protagonist",
      "bio": "Chris Redfield is a veteran S.T.A.R.S. member and one of the franchise's key protagonists.",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/ChrisRedfieldResidentEvil5render.png"
    }
    ```

#### `PUT /api/v1/characters/:id`

- **Description:** Updates an existing character.
- **Route Params:**
  - `id`: The ID of the character to update.
- **Body Params:** Same as POST `/api/v1/characters`.
- **Success Response:**

  - Status: 200
  - Example:

    ```json
    {
      "_id": "60d8f681cba3d1e828a63bf2",
      "name": "Chris Redfield",
      "role": "Protagonist",
      "bio": "Chris Redfield is a veteran S.T.A.R.S. member and one of the franchise's key protagonists.",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/ChrisRedfieldResidentEvilrender.png"
    }
    ```

#### `DELETE /api/v1/characters/:id`

- **Description:** Deletes a character from the database.
- **Route Params:**
  - `id`: The ID of the character to delete.
- **Success Response:**

  - Status: 200
  - Example:

    ```json
    {
      "message": "Character deleted successfully",
      "element": {
        "_id": "60d8f681cba3d1e828a63bf2",
        "name": "Chris Redfield",
        "role": "Protagonist",
        "bio": "Chris Redfield is a veteran S.T.A.R.S. member and one of the franchise's key protagonists.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/ChrisRedfieldResidentEvil5render.png"
      }
    }
    ```

## 🔗 Handling Related Data and Avoiding Duplicates

### Updating Games

When updating a game, the API uses the `$addToSet` operator to add characters to the `characters` array without removing existing ones. This approach also prevents duplicates, ensuring each character appears only once in the related characters list for a game.

### Data Seeding

If you use seeds to populate the database, make sure the seed scripts check for existing games and characters before inserting, to avoid duplicates.

### Game-Character Relationship

Games are related to characters via an array of ObjectIds referencing character documents. When querying games, the API uses `populate` to return character names instead of IDs, improving data readability. 📖
