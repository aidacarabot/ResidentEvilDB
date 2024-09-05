```markdown
# Proyecto API REST - Juegos y Personajes de Resident Evil

Este es un proyecto de API REST que maneja una base de datos de juegos y personajes de la franquicia Resident Evil. La API permite crear, leer, actualizar y eliminar tanto juegos como personajes. Además, la API está diseñada para relacionar personajes con los juegos en los que aparecen.

## Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **Mongoose** (ODM para MongoDB)
- **MongoDB** (usando MongoDB Atlas)

## Configuración del Proyecto

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/aidact3/ResidentEvilDB
   cd ResidentEvilDB
   ```

2. **Instalar Dependencias:**

   Asegúrate de tener `Node.js` y `npm` instalados.

   ```bash
   npm install
   ```

3. **Configuración de Variables de Entorno:**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```bash
   MONGODB_URI=mongodb+srv://tu-usuario:tu-contraseña@cluster0.mongodb.net/tu-base-de-datos?retryWrites=true&w=majority
   PORT=3000
   ```

4. **Iniciar el Servidor:**

   ```bash
   npm start
   ```

   El servidor estará corriendo en `http://localhost:3000`.

## Endpoints de la API

### **Juegos (Games)**

#### `GET /api/v1/games`

- **Descripción:** Obtiene la lista de todos los juegos en la base de datos, incluyendo los nombres de los personajes asociados en lugar de sus IDs.
- **Respuesta Exitosa:**

  - Código: 200
  - Ejemplo de Respuesta:

    ```json
    [
      {
        "title": "Resident Evil",
        "releaseDate": "1996-03-22T00:00:00.000Z",
        "storyline": "Un equipo de fuerzas especiales investiga una serie de asesinatos extraños...",
        "characters": ["Chris Redfield", "Jill Valentine"],
        "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/a/a6/Resident_Evil_1_cover.png"
      }
      // Más juegos...
    ]
    ```

#### `POST /api/v1/games`

- **Descripción:** Crea un nuevo juego en la base de datos.
- **Parámetros:**
  - `title`: (String) El título del juego (requerido).
  - `releaseDate`: (Date) La fecha de lanzamiento del juego (requerido).
  - `storyline`: (String) La trama del juego.
  - `characters`: (Array de ObjectId) Los IDs de los personajes relacionados.
  - `coverImageUrl`: (String) URL de la imagen de portada del juego.
- **Ejemplo de Cuerpo de Solicitud:**

  ```json
  {
    "title": "Resident Evil Village",
    "releaseDate": "2021-05-07",
    "storyline": "Ethan Winters enfrenta nuevos horrores mientras busca a su hija...",
    "characters": ["ObjectId_de_Ethan"],
    "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/96/Resident_Evil_Village.png"
  }
  ```

- **Respuesta Exitosa:**

  - Código: 201
  - Ejemplo de Respuesta:

    ```json
    {
      "_id": "60d8f681cba3d1e828a63bef",
      "title": "Resident Evil Village",
      "releaseDate": "2021-05-07T00:00:00.000Z",
      "storyline": "Ethan Winters enfrenta nuevos horrores mientras busca a su hija...",
      "characters": ["ObjectId_de_Ethan"],
      "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/96/Resident_Evil_Village.png"
    }
    ```

#### `PUT /api/v1/games/:id`

- **Descripción:** Actualiza un juego existente en la base de datos, asegurando que los personajes en el array no se borren y evitando duplicados al agregar nuevos personajes.
- **Parámetros de Ruta:**
  - `id`: El ID del juego que se va a actualizar.
- **Parámetros de Cuerpo:** Mismos que en `POST /api/v1/games`.
- **Respuesta Exitosa:**

  - Código: 200
  - Ejemplo de Respuesta:

    ```json
    {
      "_id": "60d8f681cba3d1e828a63bef",
      "title": "Resident Evil Village",
      "releaseDate": "2021-05-07T00:00:00.000Z",
      "storyline": "Ethan Winters enfrenta nuevos horrores mientras busca a su hija...",
      "characters": ["ObjectId_de_Ethan"],
      "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/96/Resident_Evil_Village.png"
    }
    ```

  **Nota:** Este endpoint utiliza el operador `$addToSet` para evitar la eliminación de datos relacionados y prevenir duplicados en el array de personajes.

#### `DELETE /api/v1/games/:id`

- **Descripción:** Elimina un juego de la base de datos.
- **Parámetros de Ruta:**
  - `id`: El ID del juego que se va a eliminar.
- **Respuesta Exitosa:**

  - Código: 200
  - Ejemplo de Respuesta:

    ```json
    {
      "message": "Game deleted successfully",
      "element": {
        "_id": "60d8f681cba3d1e828a63bef",
        "title": "Resident Evil Village",
        "releaseDate": "2021-05-07T00:00:00.000Z",
        "storyline": "Ethan Winters enfrenta nuevos horrores mientras busca a su hija...",
        "characters": ["ObjectId_de_Ethan"],
        "coverImageUrl": "https://upload.wikimedia.org/wikipedia/en/9/96/Resident_Evil_Village.png"
      }
    }
    ```

### **Personajes (Characters)**

#### `GET /api/v1/characters`

- **Descripción:** Obtiene la lista de todos los personajes en la base de datos.
- **Respuesta Exitosa:**

  - Código: 200
  - Ejemplo de Respuesta:

    ```json
    [
      {
        "name": "Leon S. Kennedy",
        "role": "Protagonist",
        "bio": "Leon S. Kennedy es un agente del gobierno de los EE.UU., conocido por su participación en incidentes bioterroristas.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/en/f/f5/LeonScottKennedy.png"
      }
      // Más personajes...
    ]
    ```

#### `POST /api/v1/characters`

- **Descripción:** Crea un nuevo personaje en la base de datos.
- **Parámetros:**
  - `name`: (String) El nombre del personaje (requerido).
  - `role`: (String) El rol del personaje en la historia.
  - `bio`: (String) Biografía del personaje.
  - `imageUrl`: (String) URL de la imagen del personaje.
- **Ejemplo de Cuerpo de Solicitud:**

  ```json
  {
    "name": "Chris Redfield",
    "role": "Protagonist",
    "bio": "Chris Redfield es un veterano miembro de S.T.A.R.S. y uno de los protagonistas más importantes de la serie.",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/ChrisRedfieldResidentEvil5render.png"
  }
  ```

- **Respuesta Exitosa:**

  - Código: 201
  - Ejemplo de Respuesta:

    ```json
    {
      "_id": "60d8f681cba3d1e828a63bf2",
      "name": "Chris Redfield",
      "role": "Protagonist",
      "bio": "Chris Redfield es un veterano miembro de S.T.A.R.S. y uno de los protagonistas más importantes de la serie.",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/ChrisRedfieldResidentEvil5render.png"
    }
    ```

#### `PUT /api/v1/characters/:id`

- **Descripción:** Actualiza un personaje existente en la base de datos.
- **Parámetros de Ruta:**
  - `id`: El ID del personaje que se va a actualizar.
- **Parámetros de Cuerpo:** Mismos que en `POST /api/v1/characters`.
- **Respuesta Exitosa:**

  - Código: 200
  - Ejemplo de Respuesta:

    ```json
    {
      "_id": "60d8f681cba3d1e828a63bf2",
      "name": "Chris Redfield",
      "role": "Protagonist",
      "bio": "Chris Redfield es un veterano miembro de S.T.A.R.S. y uno de los protagonistas más importantes de la serie.",
      "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/ChrisRed

fieldResidentEvil5render.png"
    }
    ```

#### `DELETE /api/v1/characters/:id`

- **Descripción:** Elimina un personaje de la base de datos.
- **Parámetros de Ruta:**
  - `id`: El ID del personaje que se va a eliminar.
- **Respuesta Exitosa:**

  - Código: 200
  - Ejemplo de Respuesta:

    ```json
    {
      "message": "Character deleted successfully",
      "element": {
        "_id": "60d8f681cba3d1e828a63bf2",
        "name": "Chris Redfield",
        "role": "Protagonist",
        "bio": "Chris Redfield es un veterano miembro de S.T.A.R.S. y uno de los protagonistas más importantes de la serie.",
        "imageUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/ChrisRedfieldResidentEvil5render.png"
      }
    }
    ```

## Manejo de Datos Relacionados y Evitar Duplicados

### Actualización de Juegos

Al actualizar un juego, la API utiliza el operador `$addToSet` para agregar personajes al array `characters` sin eliminar los personajes ya existentes. Este enfoque también evita la creación de duplicados en el array, garantizando que cada personaje solo aparezca una vez en la lista de personajes relacionados con un juego.

### Semilla de Datos

Si utilizas una semilla para poblar la base de datos, asegúrate de que la semilla esté diseñada para evitar duplicados al verificar si los juegos y personajes ya existen antes de insertarlos.

### Relación entre Juegos y Personajes

Los juegos están relacionados con los personajes mediante un array de ObjectIds que hacen referencia a los documentos de personajes. Al consultar los juegos, la API usa `populate` para devolver los nombres de los personajes en lugar de sus IDs, mejorando la legibilidad de los datos devueltos.
```