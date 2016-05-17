/**
 * Returns sites.
 *
 * @param  {Object}  state  Global state tree
 * @return {Object} Recommendations
 */
export function getSites( state ) {
	return state.reader.sites.items;
}
