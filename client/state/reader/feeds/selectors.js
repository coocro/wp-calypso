

/**
* Returns true if currently requesting feed
*
* @param  {Object}  state  Global state tree
* @param  {Number}  feedId The feed ID
* @return {Boolean}        Whether feed is being requested
*/
export function isRequestingFeed( state, feedId ) {
	return !! state.reader.feeds.queuedRequests[ feedId ];
}
