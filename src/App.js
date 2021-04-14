import { Box, Button, Paper, Typography } from "@material-ui/core";
import { result, calculateQuestion } from "./util";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [questionLeft, setQuestionLeft] = useState("");
  const [questionRight, setQuestionRight] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedParam, setSelectedParam] = useState("");
  const [countAnswer, setCountAnswer] = useState(0);
  const [countCorrectAnswer, setCountCorrectAnswer] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);

  //Get first and second question
  const questions = () => {
    setQuestionLeft(calculateQuestion());
    setQuestionRight(calculateQuestion());
  };

  //Click between two answers
  const clickAnswer = (param) => {
    setCorrectAnswer(result(questionLeft, questionRight));
    setSelectedParam(param);
    setCountAnswer(countAnswer + 1);

    questions();
  };

  //On load, fetch the questions
  useEffect(() => {
    questions();
  }, []);

  //On load, start countdown
  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    if (countdown === 0) {
      setTimer(60);
      return false;
    }
  }, [countdown]);

  //Check if answer is correct  or not
  useEffect(() => {
    const calculateAnwser = () => {
      if (countAnswer) {
        if (correctAnswer === selectedParam) {
          setCountCorrectAnswer(countCorrectAnswer + 1);
        } else {
          setStopTimer(true);
        }
      }
    };
    calculateAnwser(); // eslint-disable-next-line
  }, [countAnswer]);

  //Set timer on countdown finish and stop timer if wrong answer
  useEffect(() => {
    if (stopTimer === false) {
      if (countdown === 0 && timer > 0) {
        setTimeout(() => setTimer(timer - 1), 1000);
      }
    } else {
      setTimer(0);
    }
    // eslint-disable-next-line
  }, [countdown, timer]);

  return (
    <div className="app">
      <Typography variant="h1" gutterBottom>
        Memory Leaks
      </Typography>
      <Typography variant="h2" gutterBottom>
        Guess the Greatest Result
      </Typography>
      {countdown !== 0 && (
        <Typography className="app__countdown" variant="h1">
          {countdown}
        </Typography>
      )}
      {countdown === 0 && <Typography variant="h1">{timer}</Typography>}
      <h2>
        Count correct Ans {countCorrectAnswer} / {countAnswer}
      </h2>

      {timer !== 0 && (
        <Box mx="auto" width="80%">
          <Paper elevation={3} square>
            <div className="app__body">
              <div className="app__left">
                <Typography variant="h2" gutterBottom>
                  <div className="app__question">{questionLeft}</div>
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => clickAnswer("left")}
                >
                  Click Me
                </Button>
              </div>

              <div className="app__right">
                <Typography variant="h2" gutterBottom>
                  <div className="app__question">{questionRight}</div>
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => clickAnswer("right")}
                >
                  Click Me
                </Button>
              </div>
            </div>
          </Paper>
        </Box>
      )}

      {/* Scoreboard */}

      {/* Add name to the scoreboard if in top 10 */}

      {/* 
        
        <Grid container maxWidth="sm" style={{ backgroundColor: "#cfe8fc" }}>
          <Grid item xs>
            <Paper>
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                defaultValue="Hello World"
                variant="outlined"
              />
              <Button>Here</Button>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper>
              <TextField
                disabled
                id="outlined-disabled"
                label="Disabled"
                defaultValue="Hello World"
                variant="outlined"
              />
              <Button>Here</Button>
            </Paper>
          </Grid>
        </Grid>
        
        */}
    </div>
  );
}

export default App;
