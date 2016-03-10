import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {RedditViewModel} from "./components/reddit-viewmodel";
import {RedditSelect} from "./components/reddit-select";
import {RedditList} from "./components/reddit-list";
import {DatePipe, AsyncPipe} from "angular2/common";
import {RefreshButton} from "./components/refresh-button";
import {Store, Dispatcher, Action} from '@ngrx/store';
import {SELECT_REDDIT, SELECTED_REDDIT} from './reducers/reddit';


@Component({
	selector: `async-app`,
	template: `
	<div id="layout" class="pure-g">
		<div class="sidebar pure-u-1 pure-u-md-1-4">
			<div class="header">
				<h1 class="brand-title">NgRx Store</h1>
				<h2 class="brand-tagline">Example #3 - Async</h2>
			</div>
		</div>
		<div class="content pure-u-1 pure-u-md-3-4">
		<h2>Currently Displaying: {{viewModel.selectedReddit$ | async}}</h2>
		<h5>Last Updated: {{(viewModel.lastUpdated$ | async) | date:'mediumTime'}}</h5>
			<reddit-select
				(redditSelect)="onSelect($event)"
				>
			</reddit-select>
			<refresh-button
				[selectedReddit]="(viewModel.selectedReddit$ | async)"
				>
			</refresh-button>
			<reddit-list
				[posts]="(viewModel.posts$ | async)"
				[isFetching]="(viewModel.isFetching$ | async)">
			</reddit-list>
		</div>
	</div>
	`,
    directives: [RedditList, RedditSelect, RefreshButton],
	providers: [RedditViewModel],
	pipes: [DatePipe, AsyncPipe],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsyncApp {
	onSelect($event){
		this.dispatcher.dispatch({type: SELECT_REDDIT, payload: $event});
	}

	constructor(
		public dispatcher:Dispatcher<Action>,
		private viewModel: RedditViewModel
	){

	}
}