interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface exerciseValues {
  period: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
  }

  const target = Number(args[2]);
  let period: Array<number> = [];

  for (let i = 3; i < args.length; i++) {
    period.push(Number(args[i]));
  }

  return {
    period,
    target
  }
}

const calculateExercises = (period: Array<number>, target: number): Result => {
  let success;
  let rating;
  let ratingDescription;

  const periodLength = period.length;
  const sum = period.reduce((a, b) => a + b, 0);
  const trainingDays = period.reduce((arr, val) => (val !== 0 ? arr + 1 : arr), 0);
  const average = sum / period.length;


  if (average >= target) {
    success = true;
  } else {
    success = false;
  }

  if (average / target < 0.5) {
    rating = 1;
    ratingDescription = "Work harder!";
  } else if (average / target >= 0.5 && average / target < 1) {
    rating = 2;
    ratingDescription = "Keep up the good work!";
  } else {
    rating = 3;
    ratingDescription = "You crushed it champ!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

try {
  const { period, target } = parseArguments(process.argv)
  console.log(calculateExercises(period, target));
} catch (e) {
  console.log('Something went wrong! Error: ', e.message);
}