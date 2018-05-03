# Kiwi T9
This project is a fullstack assignment for [kiwi.com](https://github.com/kiwicom).
The goal of the assignment is to implement a web app that contains a number to
words predictor similar to T9. More details about the assignment requirements can
be found in the `INSTRUCTIONS.md` file.


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
- **components**: React components
- **dist**: compiled static files
- **sass**: stylesheets

#### server
- **api**: express routers
- **utils**: everything that doesn't fit on api
