import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  answer: String,
  isCorrect: Boolean,
});


const questionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  questionType: {
    type: String,
    enum: ['MultipleChoice', 'TrueFalse', 'FillInTheBlank'], 
  },
  questionTitle: String,
  questionPoints: Number,
  questionBody: String,
  correctAnswer: String,
  possibleAnswers: [String],
  answers: [answerSchema],
});

const quizSchema = new mongoose.Schema({
  id: String,
  quizTitle: String,
  quizDesc: String,
  quizType: {
    type: String,
    enum: ['GradedQuiz', 'PracticeQuiz', 'GradedSurvey', 'UngradedSurvey'], 
  },
  assignmentGroup: {
    type: String,
    enum: ['Quizzes', 'Exams', 'Assignments', 'Project'], 
  },
  shuffleAnswers: Boolean,
  timeLimit: Number,
  multipleAttempts: Boolean,
  showCorrectAnswers: { 
    type: String,
    enum: ['Immediately', 'AfterDueDate', 'Never'], },
  accessCode: String,
  oneQuestionPerTime: Boolean,
  webcamRequired: Boolean,
  lockQuestions: Boolean,
  quizDueDate: Date,
  quizStartDate: Date,
  quizUntilDate: Date,
  isPublished: Boolean,
  questions: [questionSchema], // Embedding Questions schema
  course: String,
}, { collection: 'quizzes' });

export default quizSchema;

