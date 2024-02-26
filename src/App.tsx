import React from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TitleAndSearch from "./components/TitleAndSearch/titleAndSearch";
import Table from "./components/Table/table";
import bookData from "./data/data.json";
import { Book } from "./types";
import PointsAndClues from "./components/PointsAndClues/pointsAndClues";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const MAX_GUESSES = 5;

function App() {
  // Global app consts
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const books = bookData as Array<Book>;
  const bookOfTheDayIndex = Math.floor(Math.random() * (books.length - 0 + 1));

  // useState
  const [bookOfTheDay] = React.useState(books[bookOfTheDayIndex] as Book);
  const [guesses, setGuesses] = React.useState([] as Array<Book>);
  const [points, setPoints] = React.useState(100);
  const [showCongrats, setShowCongrats] = React.useState(false);

  // useMemo
  const foundAnswer = React.useMemo(
    () => guesses.some((guess) => guess.id === bookOfTheDay.id),
    [guesses, bookOfTheDay],
  );
  const tooManyGuess = React.useMemo(
    () => guesses.length > MAX_GUESSES,
    [guesses],
  );

  React.useEffect(() => {
    setShowCongrats(foundAnswer);
  }, [foundAnswer]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TitleAndSearch
          addGuess={(book: Book) => setGuesses([...guesses, book])}
          books={books}
          foundAnswer={foundAnswer}
          tooManyGuess={tooManyGuess}
          noPoints={points === 0}
        />
        <PointsAndClues
          bookOfTheDay={bookOfTheDay}
          points={points}
          setPoints={setPoints}
          foundAnswer={foundAnswer}
        />
        <Table
          bookOfTheDay={bookOfTheDay}
          foundAnswer={foundAnswer}
          guesses={guesses}
          tooManyGuess={tooManyGuess}
          noPoints={points === 0}
        />
        {/* {bookOfTheDay.title} */}
        <Dialog open={showCongrats} onClose={() => setShowCongrats(false)}>
          <DialogTitle style={{ cursor: "move" }}>Congratulations</DialogTitle>
          <DialogContent>
            <DialogContentText>You won {points} points!</DialogContentText>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default App;
