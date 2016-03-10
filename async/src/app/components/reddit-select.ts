import {Component, Output, EventEmitter} from "angular2/core";
import {Store} from '@ngrx/store';
import {SELECTED_REDDIT, SELECT_REDDIT} from '../reducers/reddit';

@Component({
    selector: 'reddit-select',
    template: `
    <div>
        <select #selectList (change)="redditSelect.emit(selectList.value)">
            <option *ngFor="#reddit of availableReddits">
                {{reddit}}
            </option>
        </select>
    </div>
    `
})
export class RedditSelect{
    @Output() redditSelect : EventEmitter<string> = new EventEmitter<string>();
    availableReddits : [string] = ["Angular 2", "ReactJS"];

    constructor(public store:Store<any>){}
    
    ngOnInit(){
        this.store.dispatch({type: SELECT_REDDIT, payload: this.availableReddits[0]});
    }
}