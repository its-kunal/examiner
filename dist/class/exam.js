"use strict";
class Exam {
    constructor(e, nqs, timeInterval) {
        this.instituteName = '';
        this.instructions = ''; // HTML String, or String
        this.qs = [];
        this.examname = e;
        this.nqs = nqs;
        this.timeStarted = new Date(Date.now());
        this.timeInterval = timeInterval;
    }
}
class Question {
    constructor() {
        this.question = '';
        this.answer = ''; // hashed string
        this.options = [];
    }
}
class Examiner {
    constructor() {
        this.name = '';
        this.unId = '';
    }
}
