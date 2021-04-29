# Pine Apple Travel Agency (Website)
> This repo includes the third sprint of software project management course.

## Table of contents
* [General info](#general-info)
* [Status](#status)
* [Setup](#setup)
* [Technologies](#technologies)
* [Features](#features)
* [Code example](#code-example)
* [Screenshots](#screenshots)
* [Contact](#contact)

## General info
The given website by the end of the course will provide a platform for travelers
to find their perfect resort location and book a trip using our services.

## Status
Project is: _in progress_.
This is the result of sprint 3.


## Setup

### Dependencies
Pre-Installation requirements:
* `node v14.13.1`
* `npm v6.14.8`

### Installation Guide
*  In your terminal use the following commands:
1. Clone the repo using `git clone git@github.com:JustSage/project-management.git`.
2. Run the command `npm i | npm install` to install all dependencies.
3. You may use `npm run dev` to run the development environment,or `npm run start` to run the production environment.
4. The website can now be view from http://localhost:3000 or 3001.

## Technologies
* Frameworks - Node.js, React.js
* Backend - based on Express.js
* Testing - Jest
* Database - MongoDB

## Code Example
* Server side using express:

```javascript
const path = require('path')
const express = require('express')
const userRouter = require('./routers/user')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(userRouter)
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(port, () => {
	console.log(`App is listen to port ${port}`)
})

module.exports = app
```

## Features
* Login page
* Signup page
* Homepage
* Navbar
* Admin references page
* Packages page + CRUD functionalities
* Orders & reservations pages + CRUD functionalities

## Screenshots

![Login](./public/login.png)

## Contact

Visit our website:
[Pine Apple Travel Agency](https://pine-apple-travel-agency.herokuapp.com/ "Pine Apple Travel Agency")

Created by:
[@Sagie Baram](https://github.com/JustSage)
[@Ariel Turchinsky](https://github.com/ariel7590)
[@Yehonatan Hen](https://github.com/YehonatanHen)
[@David Haron Zade](https://github.com/Dave-Sama)
