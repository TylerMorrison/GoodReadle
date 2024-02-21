import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TitleAndSearch from "./components/TitleAndSearch/titleAndSearch";
import Table from "./components/Table/table";
import bookData from "./data/data.json";
import { Book } from "./types";

const MAX_GUESSES = 10;

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const books = bookData as Array<Book>;
  const bookOfTheDayIndex = Math.floor(Math.random() * (books.length - 0 + 1));
  const [bookOfTheDay] = React.useState(books[bookOfTheDayIndex] as Book);
  const [guesses, setGuesses] = React.useState([] as Array<Book>);
  const foundAnswer = React.useMemo(
    () => guesses.some((guess) => guess.id === bookOfTheDay.id),
    [guesses, bookOfTheDay],
  );
  const tooManyGuess = React.useMemo(
    () => guesses.length > MAX_GUESSES,
    [guesses],
  );
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TitleAndSearch
          addGuess={(book: Book) => setGuesses([...guesses, book])}
          books={books}
          foundAnswer={foundAnswer}
          tooManyGuess={tooManyGuess}
        />
        <Table
          bookOfTheDay={bookOfTheDay}
          foundAnswer={foundAnswer}
          guesses={guesses}
          tooManyGuess={tooManyGuess}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
