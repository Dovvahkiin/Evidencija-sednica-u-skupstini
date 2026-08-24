<div align="center">

# RECORDS OF MEETINGS

## TECH STACK

|                           FRONTEND                           |                            BACKEND                            |                           DATABASE                           |
| :----------------------------------------------------------: | :-----------------------------------------------------------: | :----------------------------------------------------------: |
| ![Frontend](https://skillicons.dev/icons?i=react&theme=dark) | ![Backend](https://skillicons.dev/icons?i=express&theme=dark) | ![Database](https://skillicons.dev/icons?i=mysql&theme=dark) |

#

_**CURRENTLY FRONTEND IS IN THE DEVELOPMENT MODE. FEEL FREE TO TEST BACKEND AND SQL DATABASE **_

**A CRUD APLICATION FOR RECORDING MEETINGS IN PARLAMENT**

## FEATURES

</div>

- Authentication of users via JWT and protected routes. Authentication is created on both frontend and backend.
- RESTFUL endpoints for `MySQL` database integration
- Project is organized with MVC architecture
- Bussiness rule stored on backend in `JSON` file
- Validations for inputs (database, frontend and backend)
- For every CRUD Operation is created unique Stored Procedure with Transactions
- Queries for SELECT function is used by database views
- Search bar for specific meeting
- User profile page with user's details
- Login page

<div align="center">

# GETTING STARTED

## Prerequisites

Make sure you have installed:

[NodeJS](https://nodejs.org/) (version 20+)

[MySQL](https://dev.mysql.com/downloads/installer/) (version 8+)

## Instalation

</div>

1. Clone this repository

```bash
git clone https://github.com/Dovvahkiin/Evidencija-sednica-u-skupstini.git
```

2. Navigate into the client directory from root directory:

```bash
cd client
```

3. Install dependencies from `package.json`

```bash
npm install
```

4. Navigate into the server directory from root directory:

```bash
cd server
```

5. Install dependencies same way as at step 4.
6. Set up environment variables>

- Create a `.env` file in the server and client directories
- Environment variables for client: ( _*change with actual values*_ )

_to be changed_

```plaintext
VITE_NODE_PORT = yourServerPort
```

- Environment variables for server: ( _*change with actual values*_ )

```plaintext
DB_DATABASE=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_PORT=

NODE_PORT =
CLIENT_PORT =
ENV = "development"

ACCESS_SECRET =
REFRESH_SECRET =
```

7. Import every `SQL` script into your database from `DataBase(SQL)` folder using SQL SHELL.

<div align="center">

## TESTING

</div>

- For testing as admin in login type following credentials:
  - Email: `admin@admin.com`
  - Password: `admin123`

- For testing as regular user, in login, type following credentials:
  - Email: `john123@gmail.com`
  - Password: `johndoe1`
