import _ from 'lodash';

class Quiz {
    /** @type {String} */
    name;
    /** @type {Question[]} */
    questions;

    static fromObject (obj) {
        const quiz = _.assign(new Quiz(), obj);
        if (obj.questions) {
            quiz.questions = obj.questions.map(Question.fromObject);
        }

        return quiz;
    }
}

class Question {
    /** @type {String} */
    text;
    /** @type {String} */
    image;
    /** @type {String} */
    video;
    /** @type {?Answer[]} */
    answers;
    /** @type {?Answer} */
    answer;

    static fromObject (obj) {
        const question = _.assign(new Quiz(), obj);
        if (obj.answers) {
            question.answers = obj.answers.map(Answer.fromObject);
        }
        if (obj.answer) {
            question.answer = Answer.fromObject(obj.answer);
        }

        return question;
    }
}

class Answer {
    /** @type {String} */
    text;
    /** @type {Boolean} */
    points;

    static fromObject (obj) {
        return _.assign(new Answer(), obj);
    }
}

class QuizStat {
    /** @type {String} */
    quizName;
    /** @type {Number} */
    totalQuestions;
    /** @type {Number} */
    correctQuestions;
    /** @type {Number} */
    timeTaken;
    /** @type {Date} */
    date;

    static fromObject (obj) {
        return _.assign(new QuizStat(), obj);
    }
}

export {
    Quiz,
    Question,
    Answer,
    QuizStat
};