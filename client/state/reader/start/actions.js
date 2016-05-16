/**
 * Internal dependencies
 */
import wpcom from 'lib/wp';
import {
	READER_START_RECOMMENDATIONS_RECEIVE,
	READER_START_RECOMMENDATIONS_REQUEST,
	READER_START_RECOMMENDATIONS_REQUEST_SUCCESS,
	READER_START_RECOMMENDATIONS_REQUEST_FAILURE
} from 'state/action-types';

/**
 * Returns an action object to signal that recommendation objects have been received.
 *
 * @param  {Array}  recommendations Recommendations received
 * @return {Object} Action object
 */
export function receiveRecommendations( recommendations ) {
	return {
		type: READER_START_RECOMMENDATIONS_RECEIVE,
		recommendations
	};
}

/**
 * Triggers a network request to fetch recommendations.
 *
 * @return {Function}        Action thunk
 */
export function requestRecommendations() {
	return ( dispatch ) => {
		dispatch( {
			type: READER_START_RECOMMENDATIONS_REQUEST,
		} );

		return new Promise( ( resolve, reject ) => {
			wpcom.undocumented().readRecommendationsStart( ( error, data ) => {
				error ? reject( error ) : resolve( data );
			} );
		} )
		.then(
			( data ) => {
				dispatch( receiveRecommendations( data.recommendations ) );
				dispatch( {
					type: READER_START_RECOMMENDATIONS_REQUEST_SUCCESS,
					data
				} );
			},
			( error ) => {
				dispatch( {
					type: READER_START_RECOMMENDATIONS_REQUEST_FAILURE,
					error
				} );
			}
		);
	};
}
