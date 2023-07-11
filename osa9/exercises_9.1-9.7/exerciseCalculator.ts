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
  let rating: number = 0
  let ratingDescription: string = ''
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


try {
  let hours_arr: number[] = []
  let target: number = 0
  for (let i = 2; i < process.argv.length; ++i) {
    if (!isNaN(Number(process.argv[i]))) {
      if (i === 2) {
        target = Number(process.argv[i])
      } else if (i > 2) {
        hours_arr.push(Number(process.argv[i]))
      }
    } else {
      throw new Error('arguments contained values which were not numbers')
    }
  }
  console.log(calculateExercises(hours_arr, target))
} catch (error: unknown) {
  let errorMessage = 'An error occurred: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}


