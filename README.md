### About this challenge

We are excited to see how you build frontend software, but we understand you're
probably pretty busy. Instead of asking you to develop something from scratch,
please spend a reasonable amount of time—hours, not days—refactoring some of the code in this
application. Just make it better, in any way that you see fit. Our goal is to
see how you improve existing code that you haven't encountered before.

### About the application

The application showcases books on the NYTimes Bestsellers lists and allows you
to build a collection of saved books.

#### Running the application

The app is built from `create-react-app`, so the usual `npm start` and `npm test` apply.

You will need a [NYTimes Developer account](https://developer.nytimes.com/accounts/create);
from there you can create an API key for the [Books API](https://developer.nytimes.com/docs/books-product/1/overview)
by creating a [new app](https://developer.nytimes.com/my-apps) and enabling the Books API.

Add your API key to the `.env` file for `REACT_APP_API_KEY` to make it available to the application.

Next, in your local environment, run the following:

```shell
$ npm install
$ npm start
```

**Note**: If you happen to be using NPM v7, which now blocks installs with
incompatible peer dependencies, you can add the flag `--legacy-peer-deps` to the
npm install command listed. That will force NPM to use older NPM install
behaviors, which will work for this application.

### Important notes

- The application is deliberately written to be "not very clean code". It is **not** representative of good code at Appcues.
- This README is intentionally sparse, so you'll have to read the code to understand how the application works.
- **Please keep track of the amount of time you spend** working on cleaning this
  code up. We'll need to know this when you submit your solution because it will
  help adjust our expectations.

### Submitting your work

- We work in GitHub, so we want to review your code there too. However, please
  do NOT submit a Pull Request to this repository because it will become visible
  for other candidates (or even your current employer).

- Instead, please do the following:
  - Create a [private repository](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/about-repository-visibility) under your own GitHub account.
  - Commit all of the code from this repository to the `main` branch in your new private repository as a starting point.
  - Create a new branch in your private repository.
  - Commit your changes and refactoring work to the new branch.
  - Create a [Pull Request](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/about-pull-requests) based on your branch.
  - **The pull request should include**:
    - a description of what you changed and why
    - how long you spent on the project
  - Invite the GitHub user `@appcues-interviews` as a [collaborator](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository) on your private repository.

Good luck with the assignment, and we hope you have fun with it!
