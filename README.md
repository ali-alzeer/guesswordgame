<br/>

## Table Of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Screenshot](#screenshot)
- [Database Diagram](#database-diagram)
- [Live Site](#live-site)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## About The Project

It is a simple web game where player should guess a word with a given description of it within a limited number of tries.

## Features

- Responsive design
- Interactive playing
- Guessing functionality

### Screenshot

![screenshot_1](https://res.cloudinary.com/alzeerecommerce/image/upload/v1736688903/g_ea0cyo.gif)

<hr />

### Database Diagram

![db_diagram](https://res.cloudinary.com/alzeerecommerce/image/upload/v1736689966/guess_diagram_dswndj.png)

## Live Site

[Guess Word Game](http://guesswordgame.tryasp.net)

## Built With

- Angular
- ASP.NET Core
- SQL Server

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Angular 18 or above
- .NET 8 or above
- Microsoft SQL Server

### Installation

#### Getting the code

1. Clone the repo

```sh
    git clone https://github.com/ali-alzeer/guesswordgame.git
```

#### Database

1. Import the database file from the folder "guessgame.database"

#### Back-End

1. Configure connection string in "Settings.cs" file

```cs
    public static string GetConnectionString(){
        return "YOUR_CONNECTION_STRING"
    }
```

2. Change path to the back-end folder

```sh
    cd guessgame.server
```

3. Install dependencies

```sh
    dotnet restore
```

4. Start Running

```sh
    dotnet run
```

#### Front-End

1. Configure BASEURL in "environment.ts" file

```ts
    export const environment = { baseurl: "YOUR_BACKEND_BASEURL" };
```

2. Change path to the front-end folder

```sh
    cd guessgame.client
```

3. Install dependencies

```sh
    npm install
```

4. Start Running

```sh
    ng serve
```
