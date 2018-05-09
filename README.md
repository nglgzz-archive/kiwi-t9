# Kiwi T9
This project is a fullstack assignment for [kiwi.com](https://github.com/kiwicom).
The goal of the assignment is to implement a web app that contains a number to
words predictor similar to T9. More details about the assignment requirements can
be found in the [INSTRUCTIONS.md](https://github.com/nglgzz/kiwi-t9/blob/master/INSTRUCTIONS.md)
file.

<img src="http://i.imgur.com/8Ye7YrV.jpg" width="300">

A demo can be seen at https://t9.nglgzz.com. Keep in mind that I'm using
Firebase in free tier and it's throttling all requests cause I haven't
configured a billing account.


## Features
- Get word suggestions while typing [T9-style](https://en.wikipedia.org/wiki/T9_(predictive_text)).
- Get suggestions only for existing words.
- Cycle through suggestions using the `*` button.
- Press `#` to cycle through different cases (lower, Title, UPPER).
- Insert symbols pressing the `1` button. Quick repeated presses will cycle through symbols.
- Let the world know you can use T9 (aka. Tweet what you typed).
- One command deploy to Firebase.
- Delete tapping on the `Delete` button (Yeah, it doesn't look like like a
  physical button, but we can pretend it's a 2018 reincarnation of an old
  phone rather than an exact replica, can't we?).
- Reset text pressing the `Reset` button.
- Characters counter (cause back in my day we only had 140 characters per text).


## Running the project
To run the project simply issue the following commands:

```
git clone https://github.com/nglgzz/kiwi-t9
cd kiwi-t9
npm install
npm start
```

And then connect to http://localhost:3000.


## Folder structure
On the top level of the folder there are the **client** and **server** folders which
respectively contain the code for the frontend and the backend. The structure of
those folders is the following.

#### client
- **actions**: Redux action creators
- **components**: React components
- **dist**: compiled static files (served as static content)
- **fonts**: custom fonts (served as static content)
- **reducers**: Redux reducers
- **sass**: stylesheets
- **utils**: anything that doesn't fit the folders above

#### server
- **api**: express routers
- **data**: data... duh
- **utils**: everything that doesn't fit the folders above
