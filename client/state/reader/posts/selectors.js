/**
 * External dependencies
 */
import find from 'lodash/find';

/**
 * Returns a single site.
 *
 * @param  {Object}  state  Global state tree
 * @param  {Integer}  postId Post ID
 * @return {Object} Post
 */
export function getPost( state, postId ) {
	return find( state.reader.posts.items, [ 'ID', postId ] );
}
