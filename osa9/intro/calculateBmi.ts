interface BmiValues {
  height: number;
  mass: number;
}

type Bmi = string;

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (h: number, m: number): Bmi => {
   const bmi = (m / ((h / 100)**2));
   if (bmi < 18.5) {
     return "underweight";
   } else if (bmi >= 18.5 && bmi < 25) {
     return "normal (healthy weight)";
   } else {
     return "overweight";
   }
};

try {
  const { height, mass } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (e) {
  console.log('Something went wrong, message: ', e.message);
}

export default calculateBmi;