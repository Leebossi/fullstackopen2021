const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2)
  
  switch (true) {
    case bmi <= 16:
      return 'Underweight (Severe thinness)'
    case bmi <= 16.9:
      return 'Underweight (Moderate thinness)'
    case bmi <= 18.4:
      return 'Underweight (Mild thinness)'
    case bmi <= 24.9:
      return 'Normal (healthy weight)'
    case bmi <= 29.9:
      return 'Overweight (Pre-obese)'
    case bmi <= 34.9:
      return 'Obese (Class I)'
    case bmi <= 39.9:
      return 'Obese (Class II)'
    default:
      return 'Obese (Class III)'
  }
}

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error('not enough arguments')
  if (args.length > 4) throw new Error('too many arguments')
  
  const value1 = Number(args[2])
  const value2 = Number(args[3])
  if (!isNaN(value1) && !isNaN(value2)) {
    return {
      height: value1,
      weight: value2
    }
  } else {
    throw new Error('Provided values were no numbers!')
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}