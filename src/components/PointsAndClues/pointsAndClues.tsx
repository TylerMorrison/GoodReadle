import React from "react";
import string from "./string";
import classes from "./pointsAndClues.module.css";
import { Book } from "../../types";
import Clue from "../Clue/clue";

type Props = {
  bookOfTheDay: Book;
  points: number;
  setPoints: (points: number) => void;
  foundAnswer: boolean;
};

const enum ClueType {
  author = "Author",
  numPage = "Number of pages",
  goodReadsRating = "GoodReads rating",
  numRatings = "Number of ratings",
  datePub = "Date published",
  rating = "Your rating",
  dateRated = "Date rated",
}

function PointsAndClues(props: Props) {
  const { bookOfTheDay, points, setPoints, foundAnswer } = props;

  const clues = [
    { clueType: ClueType.author, bookInfo: bookOfTheDay.author, points: 20 },
    {
      clueType: ClueType.numPage,
      bookInfo: bookOfTheDay.num_pages,
      points: 10,
    },
    {
      clueType: ClueType.goodReadsRating,
      bookInfo: bookOfTheDay.avg_rating,
      points: 20,
    },
    {
      clueType: ClueType.numRatings,
      bookInfo: bookOfTheDay.num_ratings,
      points: 10,
    },
    ...(bookOfTheDay.date_pub
      ? [
          {
            clueType: ClueType.datePub,
            bookInfo: bookOfTheDay.date_pub,
            points: 10,
          },
        ]
      : []),
    {
      clueType: ClueType.rating,
      bookInfo: bookOfTheDay.rating,
      points: 20,
    },
    {
      clueType: ClueType.dateRated,
      bookInfo: bookOfTheDay.date_added,
      points: 10,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.pointsContainer}>
        <span className={classes.pointsTitle}>{string.points}</span>
        <span className={classes.points}>{points}</span>
      </div>
      <div className={classes.clueContainer}>
        {!foundAnswer &&
          clues.map((clue) => (
            <Clue
              bookInfo={clue.bookInfo}
              subtractPoints={() => setPoints(points - clue.points)}
              numOfPoints={clue.points}
              clueType={clue.clueType}
            />
          ))}
      </div>
    </div>
  );
}

export default PointsAndClues;
