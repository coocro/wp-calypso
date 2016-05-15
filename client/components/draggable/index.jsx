/**
 * External dependencies
 */
import React from 'react';
import noop from 'lodash/noop';
import omit from 'lodash/omit';

export default React.createClass( {
	displayName: 'Draggable',

	propTypes: {
		onDrag: React.PropTypes.func,
		onStop: React.PropTypes.func,
		x: React.PropTypes.number,
		y: React.PropTypes.number,
		controlled: React.PropTypes.bool,
		bounds: React.PropTypes.shape( {
			top: React.PropTypes.number,
			left: React.PropTypes.number,
			bottom: React.PropTypes.number,
			right: React.PropTypes.number
		} )
	},

	getDefaultProps() {
		return {
			onDrag: noop,
			onStop: noop,
			x: 0,
			y: 0,
			controlled: false,
			bounds: null
		};
	},

	getInitialState() {
		return {
			x: this.props.x,
			y: this.props.y,
			relativePos: null
		};
	},

	componentWillReceiveProps( newProps ) {
		if ( this.state.x !== newProps.x || this.state.y !== newProps.y ) {
			this.setState( {
				x: newProps.x,
				y: newProps.y
			} );
		}
	},

	componentWillUnmount() {
		this.removeListeners();
	},

	onMouseDown( event ) {
		document.addEventListener( 'mousemove', this.onMouseMove );
		document.addEventListener( 'mouseup', this.onMouseUp );

		this.setState( {
			relativePos: {
				x: event.pageX - this.state.x,
				y: event.pageY - this.state.y
			}
		} );
	},

	onMouseMove( event ) {
		const bounds = this.props.bounds;
		let x = event.pageX - this.state.relativePos.x,
			y = event.pageY - this.state.relativePos.y;

		if ( bounds ) {
			x = Math.max( bounds.left, Math.min( bounds.right, x ) );
			y = Math.max( bounds.top, Math.min( bounds.bottom, y ) );
		}

		this.props.onDrag( x, y );

		if ( this.props.controlled ) {
			return;
		}

		this.setState( { x, y } );
	},

	onMouseUp() {
		this.removeListeners();
		this.props.onStop();
	},

	removeListeners() {
		document.removeEventListener( 'mousemove', this.onMouseMove );
		document.removeEventListener( 'mouseup', this.onMouseUp );
	},

	render() {
		const elementProps = omit( this.props, Object.keys( this.constructor.propTypes ) );

		return (
			<div
				{ ...elementProps }
				style={ { transform: 'translate(' + this.state.x + 'px, ' + this.state.y + 'px)' } }
				onMouseDown={ this.onMouseDown }>
			</div>
		);
	}
} );
