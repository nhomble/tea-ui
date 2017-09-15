import{Component}from'@angular/core';
import {Http, Response}from '@angular/http';
import 'rxjs/add/operator/map';
import {NavComponent} from "./app.nav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]
})
export class AppComponent {
  codeText = "";
  title = 'Tea Service';
  questions = [];
  languages = [];
  currentQuestion = null;
  lastAnswer = null;
  answerInProgress = false;
  nav = null;

  constructor(private http: Http) {
    console.log("app-root constructor");
    this.getQuestions();
    this.getLanguages();
    console.log(this.languages);
    console.log(this.questions);

    this.nav = new NavComponent();
  }

  getLanguages() {
    this.http.get("https://tea-service-api.herokuapp.com/tea/languages")
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
    this.http.get("https://tea-service-api.herokuapp.com/tea/questions")
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
    this.http.get("https://tea-service-api.herokuapp.com/tea/question/" + question.toLowerCase())
      .map((res: Response) => res.json())
      .subscribe(
        info => {
          console.log("Got a response for question info " + info);
          this.currentQuestion = info;
          console.log(info);
          this.codeText = this.currentQuestion.boilerPlate;
        },
        err => {
          console.log("Could not get info for " + question);
          console.log(err);
        }
      );
  }

  canAnswer(){
    return this.codeText.length > 0 && this.currentQuestion !== null;
  }

  answerQuestion() {
    if(!this.canAnswer()){
      console.log("won't answer");
      return;
    }
    this.answerInProgress = true;
    let body = JSON.stringify({code: this.codeText});
    console.log("BODY: " + body);
    this.http.post("https://tea-service-api.herokuapp.com/tea/answer/" + this.currentQuestion.endpoint, body)
      .map((res: Response) => res.json())
      .subscribe(
        answer => {
          this.lastAnswer = answer;
          console.log(answer);
          this.answerInProgress = false;
        },
        err => {
          console.log("Could not answer question");
          console.log(err);
          this.answerInProgress = false;
        }
      );
  }

  textKeydown(event: any, coderPad: any) {
    if (event.key === "Tab") {
      let val = coderPad.value;
      let start = coderPad.selectionStart;
      let end = coderPad.selectionEnd;

      let tab = "\t";
      coderPad.value = this.codeText = val.substring(0, start) + tab + val.substring(end);

      coderPad.selectionStart = coderPad.selectionEnd = (start + tab.length);
      coderPad.setSelectionRange(coderPad.selectionStart, coderPad.selectionEnd);

      coderPad.focus();
      return false;
    }
  }
}
