

/**
* Returns true if currently requesting site
*
* @param  {Object}  state  Global state tree
* @param  {Number}  siteId The site ID
* @return {Boolean}        Whether site is being requested
*/
export function isRequestingFeed( state, siteId ) {
	return !! state.reader.sites.queuedRequests[ siteId ];
}
