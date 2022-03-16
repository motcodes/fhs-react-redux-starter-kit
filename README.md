# FHS React/Redux Starter Kit

by Matthias Oberholzer [@motcodes](https://twitter.com/motcodes)

This a starter kit for students of the University of Applied Sciences Salzburg, for the lectures:

- Fullstack Development (Bachelor)

# Setup

```
git clone git@github.com:webpapaya/fhs-react-redux-starter-kit.git
npm install
npm run start
```

# Available Scripts

```
npm run start # react app
npm run storybook # starts storybook

npm run build # builds storybook and the react app
npm run build:app # builds the react app
npm run build:storybook # builds storybook

npm run test # runs tests
npm run test -- --watch # runs tests in watch mode
npm run lint # lints files
npm run lint -- --fix # lints files and automatically fixes errors
```

# Folder Structure

```
├── .storybook                # storybook configuration
├── build                     # app build
├── storybook-static          # storybook build
├── public                    # public assets (favicon, ...)
└── src                       # Application Code
  ├── action-creators         # Redux action creators
  ├── components              # Components which could be reused in other applications
  ├── containers              # Components which can't be reused in other applications
  └── reducers                # Redux reducers
```
