class Exam {
    examname: string
    nqs: number
    timeStarted: Date
    timeInterval: Date
    instituteName: string = ''
    instructions: string = '' // HTML String, or String
    qs: [] = []
    constructor(e: string, nqs: number, timeInterval: Date) {
        this.examname = e;
        this.nqs = nqs;
        this.timeStarted = new Date(Date.now())
        this.timeInterval = timeInterval
    }
}

class Question {
    question: string = ''
    answer: string = '' // hashed string
    options: Array<string> = []
    constructor() {

    }
}

class Examiner {
    name: string = ''
    unId: string = ''
    
}