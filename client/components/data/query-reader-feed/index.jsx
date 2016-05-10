/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import { isRequestingFeed } from 'state/reader/feeds/selectors';
import { requestFeed } from 'state/reader/feeds/actions';

class QueryReaderFeed extends Component {
	componentWillMount() {
		if ( ! this.props.isRequestingFeed ) {
			this.props.requestFeed( this.props.feedId );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isRequestingFeed || (
				this.props.feedId === nextProps.feedId
			) ) {
			return;
		}

		nextProps.requestFeed( nextProps.feedId );
	}

	render() {
		return null;
	}
}

QueryReaderFeed.propTypes = {
	feedId: PropTypes.number,
	isRequestingFeed: PropTypes.bool,
	requestFeed: PropTypes.func
};

QueryReaderFeed.defaultProps = {
	requestFeed: () => {}
};

export default connect(
	( state, ownProps ) => {
		const { feedId } = ownProps;
		return {
			isRequestingFeed: isRequestingFeed( state, feedId )
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			requestFeed
		}, dispatch );
	}
)( QueryReaderFeed );
