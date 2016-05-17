/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	getSites
} from '../selectors';

describe( 'selectors', () => {
	describe( '#getSites()', () => {
		it( 'should return an empty object if there are no sites', () => {
			const sites = getSites( {
				reader: {
					sites: {
						items: {}
					}
				}
			} );

			expect( sites ).to.eql( {} );
		} );
	} );
} );
