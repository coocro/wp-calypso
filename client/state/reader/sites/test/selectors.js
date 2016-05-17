/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	getSite
} from '../selectors';

describe( 'selectors', () => {
	describe( '#getSite()', () => {
		it( 'should return undefined if there is no match', () => {
			const site = getSite( {
				reader: {
					sites: {
						items: {}
					}
				}
			} );

			expect( site ).to.eql( undefined );
		} );
	} );
} );
