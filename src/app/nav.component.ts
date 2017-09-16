/**
 * Created by nicolas on 9/14/2017.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: [
    './nav.component.css',
    '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]
})
export class NavComponent {

  questionMap = new Map<string, string[]>();
  @Input() languages: string[] = [];
  @Input() set questions(qList: string[]) {
    let tmpMap = new Map<string, string[]>();
    // should fold
    for (let q of qList) {
      let parts = q.split("/");
      if (tmpMap.has(parts[0])) {
        let newArr = tmpMap.get(parts[0]);
        newArr.push(parts[1]);
        tmpMap.set(parts[0], newArr);
      }
      else
        tmpMap.set(parts[0], [parts[1]]);
    }
    this.questionMap = tmpMap;
  }

  @Output() onQuestionSelected = new EventEmitter<string>();

  pickQuestion(q: string) {
    this.onQuestionSelected.emit(q);
    console.log("chose question: " + q);
  }
}
