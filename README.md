# Tictactoe - GDS Accessibility Enabling Team

## Screenshots

Please refer to the Accessibility_feature.mp4 video in the /demos folder to view the full length video demonstrating the app being used with a screen-reader and keyboard.

Please refer to the 4_simultaneous_players.mp4 video in the /demos folder to view the full length video demonstrating the app being used by 4 players simultaneously.

Start page

![alt text](https://github.com/syed0059/Tictactoe/blob/master/demo/Startpage.png)

Sessions page

![alt text](https://github.com/syed0059/Tictactoe/blob/master/demo/Sessionspage.png)

2-player game
![alt text](https://github.com/syed0059/Tictactoe/blob/master/demo/2%20Games.png)

Previous games

![alt text](https://github.com/syed0059/Tictactoe/blob/master/demo/Previousgames.png)

## instructions

1) To install the application, first clone the entire repository.
2) To install all the depenedencies, open a terminal and run the `npm install` command in both the /Backend directory and /Frontend/tictactoe directories.
3) To run the backend server, navigate to the /Backend directory in a terminal and run the `node .` command.
4) To run the frontend, navigate to the /Frontend/tictactoe directory in a terminal and run the `npm start` command.
5) The app should now be running on your computer's `localhost:3000` and can be accessed through a browser.

## Design

![alt text](https://github.com/syed0059/Tictactoe/blob/master/demo/2%20Games.png)
High-contrast colours on a simple UI to make it easier for users to discern what is occuring, on top of voiceovers.

The app was also tested using a screen-reader and full keyboard navigation.

Please refer to the Accessibility_feature.mp4 video in the /demos folder to view the full length video demonstrating the app being used with a screen-reader and keyboard.

Please refer to the 4_simultaneous_players.mp4 video in the /demos folder to view the full length video demonstrating the app being used by 4 players simultaneously.

## API

The application uses websockets instead of a REST API as it is more efficient than HTTP for real time communication and also allows for multiple unique sessions simlutaneously.

Below are the websocket events required for the backend server.

![alt text](https://github.com/syed0059/Tictactoe/blob/master/demo/websocket_events.png)

## Summary

For the sake of this demo, I did not use a database to store the previous game records and instead chose to store them in memory as I did not feel that it was a core aspect of the project.

My assumptions for this project were that although the users are visually impaired, they are able to make out items on the screen and notice high-contrast colours.

With that in mind, I designed the UI to be as simple as possible to make it easier to navigate using only a keyboard. I have also included text wherever possible, such as for each box in the tic-tac-toe grid, to allow a screen-reader to verbalise exactly what is going on in the screen.

The UI also uses a light-mode colour palette as they may have difficulty seeing darker colours; the boxes are also coloured green and red for X and O respectively, as these colours are high in contrast and combined with the screen-reader, may help to give the user a better understanding of how the game is proceeding.

The user may navigate the tic-tac-toe grid using arrow-keys, and every box itself has text such that when it is highlighted the screen-reader will infrom the user exactly which box they are on. 
Every time a user places their piece, there is also a voiceover to inform the user exactly which box has been selected.

## Architecture

Frontent - ReactJS

Backend - NodeJS

UI - Material UI

The frontend and the backend communicate over websockets using the websocket.io library

## Note

This app is not fully finished as it is lacking polish and certain features - such as making players wait till there are 2 players in a session. However, it captures all of the core functionality that such an app should have, and showcases how it could be suited to enable accessibility to all.
