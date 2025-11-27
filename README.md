# Trello Clone
## Startup Engineering Assignment

A simple dashboard application built with Next.js, MongoDB and TailwindCSS.

In this app, users can create boards, add lists inside each board and then
cards inside of each list. Everything is stored in a MongoDB database.

## Features

On the landing page of the application, the user is able to create new boards,
edit the name of the existing ones, delete boards and has the ability to
navigate inside a board to see its content.

Inside each board, the user can create lists, edit their name or delete them.

Then, inside each list, users can add cards to it, edit a card's title or
description or delete cards.

## Implementation
### Application structure

BoardsGrid is the homepage of the application, where users can see all boards
in a grid allignment.

BoardItem represents one single board card with its name, link to open it and
two buttons for editing its name or deleting the board.

ListColumn represents one column inside of a board. It displays the name of
the list, lets the user rename or delete it, displays cards and contains a
field dedicated to adding new cards to the list.

CardItem represents one single card inside of a list. It includes only a title
and a description.

app/board/[id]/page.tsx
- Fetches one board's name and lists
- Renders ListColumn for each of the lists contained by that board
- Provides an input to create new lists and also a back to the boards
list button.

### Database

I chose MongoDB as database for my application because it is very flexible with
its models for boards, lists and cards with the use of Mongoose library and it
integrates also easily with Next.js.

### Components library

I have decided to use TailwindCSS for a fast styling of buttons like edit,
delete, save and cancel using svg icons.

### PostHog

I am using PostHog to collect user interaction metrics in my application in
order to have a better understanding of their interaction with the boards,
lists and cards so that I can make decisions in the future to improve the
user experience and to increase engagement with the app.

It will also help me see if the app is straight-forward or there is any way
in which I can make the application easier to use for all possible users.

I am collecting data using a Funnel about four major events in the app:
Landing Page Viewed, Board Created, Board Page Viewed, List Added and
Card Added.
In this way, I can know if users get to use all features of the application
or just drop because they might not understand how to use it or maybe just
don't like the way something in the app works.
A/B testing could also help to better understand why something might work better
if implemented differently, but I have not yet used it for this app.

## Deployment on Vercel
assignment-lilac-alpha.vercel.app
