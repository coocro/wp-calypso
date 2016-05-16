/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Internal dependencies
 */
import { isRequestingSite } from 'state/reader/sites/selectors';
import { requestSite } from 'state/reader/sites/actions';

class QueryReaderSite extends Component {
	componentWillMount() {
		if ( ! this.props.isRequestingSite ) {
			this.props.requestSite( this.props.siteId );
		}
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps.isRequestingSite || (
				this.props.siteId === nextProps.siteId
			) ) {
			return;
		}

		nextProps.requestSite( nextProps.siteId );
	}

	render() {
		return null;
	}
}

QueryReaderSite.propTypes = {
	siteId: PropTypes.number,
	isRequestingSite: PropTypes.bool,
	requestSite: PropTypes.func
};

QueryReaderSite.defaultProps = {
	requestSite: () => {}
};

export default connect(
	( state, ownProps ) => {
		const { siteId } = ownProps;
		return {
			isRequestingSite: isRequestingSite( state, siteId )
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			requestSite
		}, dispatch );
	}
)( QueryReaderSite );
