/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import lists from './lists/reducer';
import feeds from './feeds/reducer';

export default combineReducers( {
	feeds,
	lists
} );
