import mongoose from 'mongoose';
import model from "./model.js";

// actions for quizzes
export const createQuiz = async (courseId, quiz) => {
  const quizData = { ...quiz, course: courseId };
  return model.create(quizData); 
};
export const findQuizzesOfCourse = async(courseId) => model.find({ course: courseId });
export const findQuizById = async(quizId) => model.findOne({ id: quizId });
export const updateQuiz = async(quizId, quiz) =>  model.updateOne({ id: quizId }, { $set: quiz });
export const deleteQuiz = async(quizId) => model.deleteOne({ id: quizId });

// actions for questions
export const createQuestion = async (quizId, questionData) => {
    const quiz = await model.findOne({ id: quizId });
    quiz.questions.push(questionData);
    await quiz.save();
    return quiz;
};
export const findQuestionsOfQuiz = async (quizId) => {
  const quiz = await model.findOne({ id: quizId });
  return quiz.questions; 
};

export const findQuestionById = async (quizId, questionId) => {
  const quiz = await model.findOne({ id: quizId });
  return quiz.questions.id(questionId); // Mongoose subdocument querying syntax
};
export const updateQuestion = async (quizId, questionIndex, updatedQuestion) => {
  try {
    const quiz = await model.findOne({ id: quizId });

    if (!quiz) {
      return { success: false, error: 'Quiz not found' };
    }

    if (questionIndex < 0 || questionIndex >= quiz.questions.length) {
      return { success: false, error: 'Invalid question index' };
    }

    quiz.questions.set(questionIndex, updatedQuestion);
    await quiz.save();

    return { success: true, data: quiz.questions[questionIndex] };
  } catch (error) {
    console.error('Error updating question:', error);
    return { success: false, error: 'Error updating question' };
  }
};

export const deleteQuestion = async (quizId, questionIndex) => {
  const quiz = await model.findOne({ id: quizId });

  if (!quiz) {
    throw new Error('Quiz not found');
  }

  if (questionIndex < 0 || questionIndex >= quiz.questions.length) {
    throw new Error('Question not found');
  }

  quiz.questions.splice(questionIndex, 1);
  await quiz.save();

  return quiz;
};
