/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	getPost
} from '../selectors';

describe( 'selectors', () => {
	describe( '#getPost()', () => {
		it( 'should return undefined if there is no match', () => {
			const post = getPost( {
				reader: {
					posts: {
						items: {}
					}
				}
			} );

			expect( post ).to.eql( undefined );
		} );
	} );
} );
