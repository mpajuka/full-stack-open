const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);
  switch (true) {
    case (bmi < 16):
      return 'Underweight (Severe thinness)';
    case (bmi >= 16 && bmi <= 16.9):
      return 'Underweight (Moderate thinness)';
    case (bmi >= 17 && bmi <= 18.4):
      return 'Underweight (Mild thinness)';
    case (bmi >= 18.5 && bmi <= 24.9):
      return 'Normal (healthy weight)';
    case (bmi >= 25 && bmi <= 29.9):
      return 'Overweight (Pre-obese)';
    case (bmi >= 30 && bmi <= 34.9):
      return 'Obese (Class I)';
    case (bmi >= 35 && bmi <= 39.9):
      return 'Obese (Class II)';
    case (bmi >= 40):
      return 'Obese (Class III)';
    default:
      throw new Error('Calculating BMI failed, arguments invalid');
  }
};

try {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;