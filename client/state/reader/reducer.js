/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import lists from './lists/reducer';
import start from './start/reducer';
import sites from './sites/reducer';
import posts from './posts/reducer';

export default combineReducers( {
	lists,
	start,
	sites,
	posts
} );
