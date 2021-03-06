# Book Kit

## Functional Specification

### Overview

The service will provide a means of organizing bookmarks outside of built-in browser bookmark functions.

Disclaimer: This project is mainly built for learning purposes and not intended for production use.

## Installation

1. After cloning this repo, run `npm install` at the command line.
2. Start a local Postgres server. Create a new database with `createdb bookmarks`.
3. Run `psql bookmarks < db/bookmarks_schema.sql` to import the database schema.
4. To start the app, run `npm run start`. Book Kit will be live at <http://localhost:5000>.

Note on compatibility: The API relies on NodeJS v8.1.4 and PostgreSQL v9.5.3 All other dependencies are listed in the _package.json_ file. Although the API might run on alternative versions, it has not been tested.

### Scenarios

#### Scenario 1:

Sierra and Robby are in a class where all of their bookmarks and resources are gobbled up by Slack. Therefore Sierra and Robby need a way to track these learning resources. They have a bookmark folder in their Chrome browser that "saves" the resources but it is not very descriptive and is very hard to sort through. Sierra and Robby go to Book Kit and make accounts in order to organize their resources for later review.

#### Scenario 2:

Chris has a vast collection of cat videos he likes to use for various sarcastic moments. However, in his long list of bookmarks, he tends to lose track of them. He even sent an irrelevant cat video to his coworker (gasp). Chris recently signed up for Book Kit and found that with the service, he can tag his videos according to their sarcastic purposes.

### Non Goals

The current version does not support the following features:

- Cannot automatically grab screenshot from url
- Rich text annotation

## API

[RESTful API](documentation/api.md) endpoint docs

## version 1.0

- [x] Enter the bookmark

  - [x] url and title

- [x] Annotations

  - [x] descriptions and etc.

- [x] Folders

  - [x] for organization

- [x] Tagging

  - [x] creating your own tags

- [x] Screenshots

  - [x] uploading screenshots urls to represent the bookmark

- [x] Searching

  - [x] Filtering --- View certain folders/tags by themselves

## version 1.1 (MVP By Friday 9/26)

- [x] User accounts

  - separate set of data per account
  - authentication

- [x] Combine repos

## version 1.2 (MVP By Friday 9/31)

- [x] Sharing folders between users

  - [x] Can add bookmarks to shared folder
  - [x] Cannot edit bookmarks they did not create

- [x] Add my Account page

  - [x] Basic Information about user (i.e. name, email, photo)
  - [x] List Folder with the ability to delete, update, and shared
  - [x] List of Tags with the ability to delete (i.e. remove tag from all bookmarks) and edit
  - [x] Change sidebar to be browsing only

## Works in Progress

- [ ] Chrome extension

  - Pull info from page
  - Separate window or popup window

# How-to

## Add Bookmarks

1. Click the 'Add Bookmark' button on the sidebar

![add bookmark](http://i.imgur.com/yWhdWah.png)

2. Fill out the required information (Title, URL, Folder)
3. Click 'Submit'

## Add Folders

1. Add a new folder name to the 'Add Folder' input field in the sidebar
2. Click Enter on your keyboard to add

## Add Tags

1. When adding a bookmark, type in your tags in the Tags input field separated by commas

## Search

1. Using the text input field, type in the title of the bookmark for the live search feature

## Share Folders

1. Click on "My Account" in the navbar

![my account](http://i.imgur.com/pUkSQkS.png)

2. Select "Manage Folders" in the sidebar
3. Select "Share" for the selected folder
4. Add emails of users you want to share with to the field
5. Click Enter to add the user
