# freevision React Contest

## Description

This code uses [@blueprintjs](https://blueprintjs.com) UI library to create [Omnibar](https://blueprintjs.com/docs/#select/omnibar) that simplify user navigation and execution of some commands. Commands can have sub commands or options selection.

This code is taken from one of our projects, so it might look a bit out of context. In our project, there is a React Context that hold some configuration values for the application. A partial config is copied over to this sample project.

Your task, should you accept it, will consist of two parts.

## Part 1

Do a code review on existing code. We want to know what you think about this code, what you think is wrong with it, what you think is good. What would you do differently?

Do not focus on CRA parts, as those are not important. Focus mainly on TypeScript and JavaScript inside `src/components`.

## Part 2

We planned on adding a new command. This command should allow the user to search for an object on the backend by text and do something with it. What to do is not important, the interesting part is about searching for the item and showing user options to pick from.

For development, you can use `yarn dev-server` to run local API on port `3001` with endpoint:

```
$ curl http://localhost:3001/birds?q=cow
[
  {
    "id": 150,
    "title": "Bronzed Cowbird"
  },
  {
    "id": 161,
    "title": "Brown-headed Cowbird"
  },
  {
    "id": 515,
    "title": "McCown's Longspur"
  },
  {
    "id": 715,
    "title": "Shiny Cowbird"
  }
]
```

These options should be offered to the user to pick from. The action on selecting one of the options is not important, but there has to be some action (ie. showing `alert()` with title of selected bird).

The `<Omnibar />` component was not written with this command in mind, so you might need to add or even rewrite some parts of it.

Application itself is standard CRA, so `yarn start` will launch it on port `3000`.

We wish you good luck and look forward to your solution!
