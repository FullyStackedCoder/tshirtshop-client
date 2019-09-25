# tshirtshop-client
Frontend application for T-Shirt Shop

https://tshirtshop-next-prod.herokuapp.com/

### Tech Stack used:
1. React.js -> Next.js for server side rendering, routing and tooling.
2. Styled-Components for styling the elements.
3. Apollo Client -> for graphql queries and mutations, caching, local state management, loading and error UI states.
4. Reac-Apollo -> for bridging the gap between apollo client and react
5. Jest and Enzyme -> for testing. Haven't written too many test in the application, but I am comfortable with writing unit tests and mock tests.

### How to use?
1. Clone this project somewhere you like.
2. Run - npm install - for installing the required packages.
3. Run the command - npm run dev - to start the dev server and watch for changes.
4. Run the command - npm build - to build the next project.
5. Run the command - npm start - to statrt the server in production mode. Will have to remove -p $PORT in the start script if running locally. -p $PORT is meant for running on heroku server.

### Challenges faced while coding this application
1. I was reluctant to use third party UI component libraries though I have worked with semantic-ui and material-ui in a couple of my previous projects. I wanted to created this writing my own styles. It was time consuming and challenging in some aspects. But I guess I have done okay with UI/UX
2. Latest versions of Next and Styled-components have some flickering issues. Tried fixing the button flickering issue, but couldn't solve that completely. This is when I felt like using third party UI component library would have been good. Time was a constraining factor here. I felt like I was already late for submitting this project. With more time I could have just switched to using semantic-ui or material-ui
3. Even though this project is not considerably big, I gave emphasis on adding folder structure that can be scaled easily if needed.

That is it for now. I will be updating this document if I remember anything else.
