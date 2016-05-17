/**
 * External dependencies
 */
import { nock, useNock } from 'test/helpers/use-nock';
import sinon from 'sinon';
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	READER_SITES_RECEIVE
} from 'state/action-types';

import {
	receiveSites
} from '../actions';

describe( 'actions', () => {
	useNock();

	const spy = sinon.spy();

	beforeEach( () => {
		spy.reset();
	} );

	describe( '#receiveSites()', () => {
		it( 'should return an action object', () => {
			const sites = {};
			const action = receiveSites( sites );

			expect( action ).to.eql( {
				type: READER_SITES_RECEIVE,
				sites
			} );
		} );
	} );
} );
