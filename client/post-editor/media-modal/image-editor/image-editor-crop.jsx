/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import Draggable from 'components/draggable';
import {
	getImageEditorCropBounds,
	getImageEditorAspectRatio
} from 'state/ui/editor/media/imageEditor/selectors';
import { AspectRatios } from 'state/ui/editor/media/imageEditor/constants';
import { imageEditorCrop } from 'state/ui/editor/media/imageEditor/actions';

const MediaModalImageEditorCrop = React.createClass( {
	displayName: 'MediaModalImageEditorCrop',

	propTypes: {
		topBound: React.PropTypes.number,
		leftBound: React.PropTypes.number,
		bottomBound: React.PropTypes.number,
		rightBound: React.PropTypes.number,
		aspectRatio: React.PropTypes.string,
		imageEditorCrop: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			topBound: 0,
			leftBound: 0,
			bottomBound: 100,
			rightBound: 100,
			imageEditorCrop: noop
		};
	},

	getInitialState() {
		return this.getDefaultState( this.props );
	},

	getDefaultState( props ) {
		return {
			top: props.topBound,
			left: props.leftBound,
			bottom: props.bottomBound,
			right: props.rightBound
		};
	},

	componentWillReceiveProps( newProps ) {
		if ( ! isEqual( newProps, this.props ) ) {
			this.updateCrop( this.state, newProps );
		}
	},

	updateCrop( newValues, props ) {
		props = props || this.props;

		const aspectRatio = props.aspectRatio;

		if ( aspectRatio === AspectRatios.FREE ) {
			this.setState( newValues );
			return;
		}

		const imageWidth = props.rightBound - props.leftBound,
			imageHeight = props.bottomBound - props.topBound,
			newState = Object.assign( {}, this.state, newValues ),
			newWidth = newState.right - newState.left,
			newHeight = newState.bottom - newState.top;
		let ratio,
			finalWidth = newWidth,
			finalHeight = newHeight;

		switch ( aspectRatio ) {
			case ( AspectRatios.ORIGINAL ):
				ratio = Math.min( newWidth / imageWidth, newHeight / imageHeight );
				finalWidth = imageWidth * ratio;
				finalHeight = imageHeight * ratio;
				break;
			case ( AspectRatios.ASPECT_1x1 ):
				finalWidth = Math.min( newWidth, newHeight );
				finalHeight = finalWidth;
				break;
			case ( AspectRatios.ASPECT_16x9 ):
				ratio = Math.floor( Math.min( newWidth / 16, newHeight / 9 ) );
				finalWidth = 16 * ratio;
				finalHeight = 9 * ratio;
				break;
			case ( AspectRatios.ASPECT_4X3 ):
				ratio = Math.floor( Math.min( newWidth / 4, newHeight / 3 ) );
				finalWidth = 4 * ratio;
				finalHeight = 3 * ratio;
				break;
			case ( AspectRatios.ASPECT_3X2 ):
				ratio = Math.floor( Math.min( newWidth / 3, newHeight / 2 ) );
				finalWidth = 3 * ratio;
				finalHeight = 2 * ratio;
				break;
		}

		if ( newValues.hasOwnProperty( 'top' ) ) {
			newValues.top = this.state.bottom - finalHeight;
		} else if ( newValues.hasOwnProperty( 'bottom' ) ) {
			newValues.bottom = this.state.top + finalHeight;
		}

		if ( newValues.hasOwnProperty( 'left' ) ) {
			newValues.left = this.state.right - finalWidth;
		} else if ( newValues.hasOwnProperty( 'right' ) ) {
			newValues.right = this.state.left + finalWidth;
		}

		this.setState( newValues );
	},

	onTopLeftDrag( x, y ) {
		this.updateCrop( {
			top: y,
			left: x
		} );
	},

	onTopRightDrag( x, y ) {
		this.updateCrop( {
			top: y,
			right: x
		} );
	},

	onBottomRightDrag( x, y ) {
		this.updateCrop( {
			bottom: y,
			right: x
		} );
	},

	onBottomLeftDrag( x, y ) {
		this.updateCrop( {
			bottom: y,
			left: x
		} );
	},

	onDragStop() {
		const currentTop = this.state.top - this.props.topBound,
			currentLeft = this.state.left - this.props.leftBound,
			currentWidth = this.state.right - this.state.left,
			currentHeight = this.state.bottom - this.state.top,
			imageWidth = this.props.rightBound - this.props.leftBound,
			imageHeight = this.props.bottomBound - this.props.topBound;

		this.props.imageEditorCrop(
			currentTop / imageHeight,
			currentLeft / imageWidth,
			currentWidth / imageWidth,
			currentHeight / imageHeight );
	},

	render() {
		const { top, left, right, bottom } = this.state,
			width = right - left,
			height = bottom - top;

		return (
			<div>
				<div
					ref="border"
					style={ { top: top + 'px', left: left + 'px', width: width + 'px', height: height + 'px' } }
					className="editor-media-modal-image-editor__crop"></div>
				<Draggable
					onDrag={ this.onTopLeftDrag }
					onStop={ this.onDragStop }
					x={ left }
					y={ top }
					controlled
					bounds={ { top: this.props.topBound, left: this.props.leftBound, bottom, right } }
					ref="topLeft"
					className="editor-media-modal-image-editor__crop-handle editor-media-modal-image-editor__crop-handle-nwse" />
				<Draggable
					onDrag={ this.onTopRightDrag }
					onStop={ this.onDragStop }
					y={ top }
					x={ right }
					controlled
					bounds={ { top: this.props.topBound, right: this.props.rightBound, bottom, left } }
					ref="topRight"
					className="editor-media-modal-image-editor__crop-handle editor-media-modal-image-editor__crop-handle-nesw" />
				<Draggable
					onDrag={ this.onBottomRightDrag }
					onStop={ this.onDragStop }
					y={ bottom }
					x={ right }
					controlled
					bounds={ { bottom: this.props.bottomBound, right: this.props.rightBound, top, left } }
					ref="bottomRight"
					className="editor-media-modal-image-editor__crop-handle editor-media-modal-image-editor__crop-handle-nwse" />
				<Draggable
					onDrag={ this.onBottomLeftDrag }
					onStop={ this.onDragStop }
					y={ bottom }
					x={ left }
					bounds={ { bottom: this.props.bottomBound, left: this.props.leftBound, top, right } }
					ref="bottomLeft"
					className="editor-media-modal-image-editor__crop-handle editor-media-modal-image-editor__crop-handle-nesw" />
			</div>
		);
	}
} );

export default connect(
	( state ) => {
		const bounds = getImageEditorCropBounds( state ),
			aspectRatio = getImageEditorAspectRatio( state );

		return Object.assign( {}, bounds, { aspectRatio } );
	},
	{ imageEditorCrop }
)( MediaModalImageEditorCrop );
