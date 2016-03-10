import {bootstrap} from 'angular2/platform/browser';
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
import {AsyncApp} from './async-app';
import {provideStore, usePreMiddleware, createMiddleware} from '@ngrx/store';
import {selectedReddit, postsByReddit} from './reducers/reddit';
import {Reddit} from './services/reddit';
import {HTTP_PROVIDERS} from 'angular2/http';
import {redditPreMiddleware} from './middleware/reddit';
import {provide} from 'angular2/core';

export function main() {
  return bootstrap(AsyncApp, [
      ELEMENT_PROBE_PROVIDERS,
      HTTP_PROVIDERS,
      provideStore({selectedReddit, postsByReddit}),
      usePreMiddleware(createMiddleware(redditPreMiddleware, [Reddit])),
      Reddit
  ])
  .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);