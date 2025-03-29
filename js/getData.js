// Function to load quiz data from data.json
async function fetchQuizData() {
  try {
    const response = await fetch('./data.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch quiz data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

// Function to get a specific quiz by subject
function getQuizBySubject(data, subject) {
  if (!data || !data.quizzes) {
    return null;
  }
  
  const quiz = data.quizzes.find(quiz => quiz.title.toLowerCase() === subject.toLowerCase());
  return quiz;
}

// Export the functions
export { fetchQuizData, getQuizBySubject };
