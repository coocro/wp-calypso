/**
 * External dependencies
 */
import find from 'lodash/find';

/**
 * Returns a single site.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Integer}  siteId Site ID
 * @return {Object} Site
 */
export function getSite( state, siteId ) {
	return find( state.reader.sites.items, [ 'ID', siteId ] );
}
