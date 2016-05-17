/**
 * Internal dependencies
 */
import {
	READER_SITES_RECEIVE
} from 'state/action-types';

/**
 * Returns an action object to signal that site objects have been received.
 *
 * @param  {Array}  sites Sites received
 * @return {Object} Action object
 */
export function receiveSites( sites ) {
	return {
		type: READER_SITES_RECEIVE,
		sites
	};
}
