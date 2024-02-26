import React from "react";
import classes from "./clue.module.css";
import { Button } from "@mui/material";

type Props = {
  bookInfo: string | number;
  subtractPoints: () => void;
  numOfPoints: number;
  clueType: string;
};

function Clue(props: Props) {
  const { bookInfo, subtractPoints, numOfPoints, clueType } = props;

  const [showInfo, setShowInfo] = React.useState(false);
  return (
    <div className={classes.container}>
      {showInfo ? (
        <div className={classes.bookInfo}>
          <span className={classes.clueType}>{clueType}:</span> {bookInfo}
        </div>
      ) : (
        <Button
          variant="outlined"
          onClick={() => {
            subtractPoints();
            setShowInfo(true);
          }}
        >
          {clueType} -{numOfPoints}
        </Button>
      )}
    </div>
  );
}

export default Clue;
