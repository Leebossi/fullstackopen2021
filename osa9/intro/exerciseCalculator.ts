interface ResultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercise = (exerciseHours: number[], target: number): ResultObject => {
  const periodLength = exerciseHours.length
  const trainingDays = exerciseHours.filter(e => e !== 0).length
  const success = trainingDays >= target ? true : false
  let rating = 0
  let ratingDescription = ''

  const calcAvg = (array: number[]) => array.reduce((a, b) => a + b, 0) / array.length
  const average = calcAvg(exerciseHours)

  if (average >= target) {
    rating = 3
    ratingDescription = 'You smashed it!'
  }

  else if (average >= (target * 0.75)) {
    rating = 2
    ratingDescription = 'Not too bad but could do better!'
  }

  else if (average <= (target * 0.5)) {
    rating = 1
    ratingDescription = 'Push it more!'
  }

  return({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  })
}

const hours = [3, 0, 2, 4.5, 0, 3, 1]
const target = 2
console.log(calculateExercise(hours, target))