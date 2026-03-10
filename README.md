# Kyiv-Funicular Language App

It's called Kyiv-Funicular because waiting for a train is the perfect time to pull out the app and quiz yourself on the latest batch of words you've added. The Kyiv Funicular is an especially cool place to wait.

The idea of the app is to have, as a language learner, a tool with you at all times capable fo

- translate words you encounter in life
- add those words to an ever-building personal dictionary
- recall words on the fly with a quick-search/autocomplete function
- quiz yourself on new words as you wait for the bus

Currently, it only supports English to Ukrainian and German (Ukrainian I'm learning, German for testing)--or the reverse of these--but the modular design allows for any new language to be dropped in without causing a ripple of modifications across the codebase.

The basic shape of it: The main module is one RxJS `merge()`, waiting for information from the `Subject()` in each outlying module. As the user adds information (each component of a new word i.e. case and tense information, definitions, examples) it is written to the object waiting to be uploaded. As information is uploaded, it is fetched from the backend and immediately displayed on the front.

With the **mode** button you can choose to quiz yourself by definition first or word first. The **+/-** button cycles through the information available for each word--whatever you've added so far, you can always add more by clicking on the word to open the sidebar. The arrows **<** **>** navigate: left to older words and pages of older words, in the order you added them, while the right arrow goes newer.

Open the sidenav with the arrow at the top left. You can add a word manually, or translate it by clicking the magnifying glass. Typing a partial word will check the extant dictionary for that term, causing it to appear at the side. Add/delete/rearrange definitions and examples as you like.

In the sidenav, scroll to the bottom to change languages.

## Login

(to see my fully populated account with pages of English-Ukrainian:

```bash
password: olly
username: olly
```

)

## Backend

Repo for the [backend](https://github.com/leftyloosey/prma_grate), hosted on Heroku. (Frontend is on Vercel.)
