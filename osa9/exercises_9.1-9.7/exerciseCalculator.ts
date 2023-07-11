interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: number[], target: number): Result => {
  const sum = hours.reduce((a, b) => a + b, 0)
  const average = sum / hours.length
  let rating: number
  let ratingDescription: string
  if (average >= target) {
    rating = 3
    ratingDescription = 'congratulations you met your target!'
  } else if (average < target && average > target / 2) {
    rating = 2
    ratingDescription = 'you did not quite meet the set target, but great work nonetheless!'
  } else if (average < target / 2) {
    rating = 1
    ratingDescription = 'you did not meet the set target, try to do better next time!'
  }
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(h => h !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))