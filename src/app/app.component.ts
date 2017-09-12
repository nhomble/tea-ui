import{Component}from'@angular/core';
import {Http, Response}from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]
})
export class AppComponent {
  codeBoilerPlate = 'Pick a coding problem you want to complete';
  title = 'Tea Service';
  questions = [];
  languages = [];
  currentQuestion = null;
  lastAnswer = null;

  constructor(private http: Http) {
    console.log("app-root constructor");
    this.getQuestions();
    this.getLanguages();
    console.log(this.languages);
    console.log(this.questions);
  }

  getLanguages() {
    this.http.get("http://localhost:25525/tea/languages")
    //this.http.get("https://tea-service.herokuapp.com/tea/languages")
      .map((res: Response) => res.json())
      .subscribe(
        languages => {
          console.log("Got a response for languages " + languages);
          this.languages = languages;
        },
        err => {
          console.log("Could not get languages");
          console.log(err);
        }
      );
  }

  getQuestions() {
    this.http.get("http://localhost:25525/tea/questions")
    //return this.http.get("https://tea-service.herokuapp.com/tea/questions")
      .map((res: Response) => res.json())
      .subscribe(
        questions => {
          console.log("Got a response for questions " + questions);
          this.questions = questions;
        },
        err => {
          console.log("Could not get questions");
          console.log(err);
        }
      );
  }

  selectQuestion(question) {
    console.log(question);
    this.getQuestionInfo(question);
  }

  getQuestionInfo(question) {
    this.http.get("http://localhost:25525/tea/question/" + question)
    //return this.http.get("https://tea-service.herokuapp.com/tea/questions")
      .map((res: Response) => res.json())
      .subscribe(
        info => {
          console.log("Got a response for question info " + info);
          this.currentQuestion = info;
          this.codeBoilerPlate = this.currentQuestion.boilerPlate;
        },
        err => {
          console.log("Could not get info for " + question);
          console.log(err);
        }
      );
  }

  answerQuestion(codeToSend) {
    let body = JSON.stringify({code: codeToSend});
    console.log("BODY: " + body);
    this.http.post("http://localhost:25525/tea/answer/" + this.currentQuestion.endpoint, body)
      .map((res: Response) => res.json())
      .subscribe(
        answer => {
          this.lastAnswer = answer;
          console.log(answer);
        },
        err => {
          console.log("Could not answer question");
          console.log(err);
        }
      );
  }
}
