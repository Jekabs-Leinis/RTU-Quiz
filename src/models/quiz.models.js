import _ from 'lodash';

class Quiz {
    /** @type {String} */
    name;
    /** @type {Question[]} */
    questions;

    static fromObject(arr) {
        const quiz = _.assign(new Quiz(), arr);
        if (arr.questions) {
            quiz.questions = arr.questions.map(Question.fromObject)
        }

        return quiz;
    }
}

class Question {
    /** @type {String} */
    text;
    /** @type {Answer[]} */
    answers;

    static fromObject(arr) {
        const question = _.assign(new Quiz(), arr);
        if (arr.answers) {
            question.answers = arr.answers.map(Answer.fromObject)
        }

        return question;
    }
}

class Answer {
    /** @type {String} */
    text;
    /** @type {Boolean} */
    isCorrect;

    static fromObject(arr) {
        return _.assign(new Answer(), arr);
    }
}

export {
    Quiz,
    Question,
    Answer
}