import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import string from "./string";
import classes from "./titleAndSearch.module.css";
import { Book } from "../../types";

type Props = {
  addGuess: (guess: Book) => void;
  books: Array<Book>;
  foundAnswer: boolean;
  tooManyGuess: boolean;
};

function TitleAndSearch(props: Props) {
  const { addGuess, books, foundAnswer, tooManyGuess } = props;
  const [selectedBookId, setSelectedBookId] = React.useState("");
  const [autoCompleteKey, setAutoCompleteKey] = React.useState(0);
  return (
    <div className={classes.container}>
      <h1>{string.title}</h1>
      <div className={classes.row}>
        <Autocomplete
          renderInput={(params) => <TextField label="Book" {...params} />}
          options={books.map((book) => book.title)}
          renderOption={(props: object, title) => {
            return (
              <div
                {...props}
                key={books.find((book) => book.title === title)?.id}
              >
                {title}
              </div>
            );
          }}
          onChange={(event, title) => {
            if (title) {
              const id = books.find((book) => book.title === title)?.id;
              if (id) setSelectedBookId(id);
            }
          }}
          className={classes.autocomplete}
          disabled={foundAnswer || tooManyGuess}
          key={autoCompleteKey}
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            const selectedBook = books.find(
              (book) => book.id === selectedBookId,
            );
            if (selectedBook) addGuess(selectedBook);
            setAutoCompleteKey(autoCompleteKey + 1);
          }}
          disabled={foundAnswer || tooManyGuess}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default TitleAndSearch;
