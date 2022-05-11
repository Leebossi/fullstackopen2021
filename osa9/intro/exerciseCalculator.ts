interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercise = (
  exerciseHours: number[],
  target: number
): ResultObject => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((e) => e !== 0).length;
  let rating = 0;
  let ratingDescription = "";

  const calcAvg = (array: number[]) =>
    array.reduce((a, b) => a + b, 0) / array.length;
  const average = calcAvg(exerciseHours);
  const success = average >= target ? true : false;

  if (average >= target) {
    rating = 3;
    ratingDescription = "You smashed it!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad but could do better!";
  } else if (average <= target * 0.5) {
    rating = 1;
    ratingDescription = "Push it more!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArgs = (args: Array<string>) => {
  if (args.length < 4) throw new Error("not enough arguments");

  const value1 = Number(args[2]);
  const exerciseHours: Array<number> = [];

  args.slice(3).map((x) => {
    if (isNaN(Number(x))) {
      throw new Error("Provided values were not numbers");
    } else {
      exerciseHours.push(Number(x));
    }
  });
  return {
    target: value1,
    exerciseHours: exerciseHours,
  };
};

try {
  const { target, exerciseHours } = parseArgs(process.argv);
  console.log(calculateExercise(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
