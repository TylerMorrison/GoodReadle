import React from "react";
import string from "./string";
import { Book } from "../../types";
import classes from "./table.module.css";
import classNames from "classnames";

type Props = {
  bookOfTheDay: Book;
  foundAnswer: boolean;
  tooManyGuess: boolean;
  guesses: Array<Book>;
  noPoints: boolean;
};

function Table(props: Props) {
  const { bookOfTheDay, foundAnswer, tooManyGuess, guesses, noPoints } = props;
  const showAnswer = tooManyGuess || foundAnswer || noPoints;
  return (
    <div className={classes.table}>
      <div className={classes.columnHeader}>
        <div className={classNames(classes.cell, classes.titleCell)}>
          {string.title}
        </div>
        <div className={classes.cell}>{string.author}</div>
        <div className={classes.cell}>{string.numPage}</div>
        <div className={classes.cell}>{string.datePub}</div>
        <div className={classes.cell}>{string.goodReadsRating}</div>
        <div className={classes.cell}>{string.userRating}</div>
        <div className={classes.cell}>{string.dateRated}</div>
      </div>
      <div className={classes.answer}>
        <div className={classNames(classes.cell, classes.titleCell)}>
          {showAnswer ? bookOfTheDay.title : "***"}
        </div>
        <div className={classes.cell}>
          {showAnswer ? bookOfTheDay.author : "*"}
        </div>
        <div className={classes.cell}>
          {showAnswer ? bookOfTheDay.num_pages : "*"}
        </div>
        <div className={classes.cell}>
          {showAnswer ? bookOfTheDay.date_pub : "*"}
        </div>
        <div className={classes.cell}>
          {showAnswer ? bookOfTheDay.avg_rating : "*"}
        </div>
        <div className={classes.cell}>
          {showAnswer ? bookOfTheDay.rating : "*"}
        </div>
        <div className={classes.cell}>
          {showAnswer ? bookOfTheDay.date_added : "*"}
        </div>
      </div>
      <div className={classes.guesses}>
        {guesses.map((guess) => (
          <div className={classes.guess}>
            <div className={classNames(classes.cell, classes.titleCell)}>
              {guess.title}
            </div>
            <div className={classes.cell}>{guess.author}</div>
            <div className={classes.cell}>{guess.num_pages}</div>
            <div className={classes.cell}>{guess.date_pub}</div>
            <div className={classes.cell}>{guess.avg_rating}</div>
            <div className={classes.cell}>{guess.rating}</div>
            <div className={classes.cell}>{guess.date_added}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
