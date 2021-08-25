# Overview

This project is meant to be a digital representation of a whiteboard that
tracks how many times the user has eaten at certain restaraunts. It started as
a joke from my Sophomore year of college, that turned into a challenge. It also
gave me a fun way to introduce myself to the MERN stack, and learn how to deploy
a web app from that stack onto Heroku.

## Structure

`client`: This folder contains all of the files related to the front-end of the
website. This was developed using React, and is a single-page that displays
the meal counts for the user.

`server`: This folder contains all of the files related to the back-end of the
website. This was developed using the Express.js framework, and connects to a
Mongo database hosted by Mongo Atlas. All of the requests from the react client
are proxied to this express.js program.

## Features

This app currently supports multiple rooms. This means that multiple users
can use the app without their data resulting in conflicts. Currently, the app
does not inform you which room codes have been used, but it normally is easy
to find a free room.
