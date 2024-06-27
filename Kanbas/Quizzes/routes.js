import { modelNames } from "mongoose";
import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  // for quizzes
  const createQuiz = async (req, res) => {
    const { courseId } = req.params;      
    const quiz = await dao.createQuiz(courseId, req.body);
    res.json(quiz);
  };
  
  const findQuizzesOfCourse = async (req, res) => {
    console.log('findQuizzesOfCourse')
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesOfCourse(courseId);
    res.json(quizzes);
  };
  
  const findQuizById = async (req, res) => {
    console.log('findQuizById');
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  };
  
  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.updateQuiz(quizId, req.body);
    res.json(status);
  };
  
  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    res.json(status);
  };
    

  // for questions
  const createQuestion = async (req, res) => {
    const { quizId } = req.params;
    const question = await dao.createQuestion(quizId, req.body);
    res.json(question);
  };

  const findQuestionsOfQuiz = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findQuestionsOfQuiz(quizId);
    res.json(questions);
  };
  
  const findQuestionById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  };
  
  const updateQuestion = async (req, res) => {
    const { quizId, questionIndex } = req.params;
    const status = await dao.updateQuestion(quizId, questionIndex, req.body);
    res.json(status);
  };
  
  const deleteQuestion = async (req, res) => {
    const { quizId, questionIndex } = req.params;
    const status = await dao.deleteQuestion(quizId, questionIndex);
    res.json(status);
  };

  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.get("/api/courses/:courseId/quizzes", findQuizzesOfCourse); 
  app.get("/api/quizzes/:quizId", findQuizById);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
    
  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.get("/api/quizzes/:quizId/questions", findQuestionsOfQuiz);
  app.get("/api/quizzes/:quizId/questions/:questionId", findQuestionById); 
  app.put("/api/quizzes/:quizId/questions/:questionIndex", updateQuestion); 
  app.delete("/api/quizzes/:quizId/questions/:questionIndex", deleteQuestion); 
}
  



