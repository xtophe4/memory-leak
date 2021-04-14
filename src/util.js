//import React from "react";
import { evaluate, pickRandom, randomInt } from "mathjs";

export const result = (q1, q2) => {
  return evaluate(q1) > evaluate(q2) ? "left" : "right";
};

export const calculateQuestion = () => {
  const listOperators = ["+", "-"];
  const stockNumber1 = randomInt(1, 1000);
  const stockNumber2 = randomInt(1, 1000);
  let firstNumber;
  let secondNumber;
  if (stockNumber1 > stockNumber2) {
    firstNumber = stockNumber1;
    secondNumber = stockNumber2;
  } else {
    firstNumber = stockNumber2;
    secondNumber = stockNumber1;
  }

  return firstNumber + pickRandom(listOperators) + secondNumber;
};
