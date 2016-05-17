/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import Draggable from 'components/draggable';
import {
	getImageEditorCropBounds,
	getImageEditorAspectRatio,
	getImageEditorTransform
} from 'state/ui/editor/media/imageEditor/selectors';
import { AspectRatios } from 'state/ui/editor/media/imageEditor/constants';
import { imageEditorCrop } from 'state/ui/editor/media/imageEditor/actions';

const MediaModalImageEditorCrop = React.createClass( {

	propTypes: {
		degrees: React.PropTypes.number,
		topBound: React.PropTypes.number,
		leftBound: React.PropTypes.number,
		bottomBound: React.PropTypes.number,
		rightBound: React.PropTypes.number,
		aspectRatio: React.PropTypes.string,
		imageEditorCrop: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			degrees: 0,
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
			this.updateCrop( this.getDefaultState( newProps ), newProps );
			//FIXME: this causes an infinite loop between setting crop and setting crop bounds
			//this.applyCrop();
		}
	},

	updateCrop( newValues, props ) {
		props = props || this.props;

		const aspectRatio = props.aspectRatio;

		if ( aspectRatio === AspectRatios.FREE ) {
			this.setState( newValues );
			return;
		}

		const rotated = props.degrees % 180 !== 0;
		const newState = Object.assign( {}, this.state, newValues );
		const newWidth = newState.right - newState.left;
		const newHeight = newState.bottom - newState.top;
		let ratio,
			finalWidth = newWidth,
			finalHeight = newHeight,
			imageWidth, imageHeight;

		switch ( aspectRatio ) {
			case AspectRatios.ORIGINAL:
				imageWidth = props.rightBound - props.leftBound;
				imageHeight = props.bottomBound - props.topBound;
				break;
			case AspectRatios.ASPECT_1x1:
				imageWidth = 1;
				imageHeight = 1;
				break;
			case AspectRatios.ASPECT_16x9:
				imageWidth = rotated ? 9 : 16;
				imageHeight = rotated ? 16 : 9;
				break;
			case AspectRatios.ASPECT_4X3:
				imageWidth = rotated ? 3 : 4;
				imageHeight = rotated ? 4 : 3;
				break;
			case AspectRatios.ASPECT_3X2:
				imageWidth = rotated ? 2 : 3;
				imageHeight = rotated ? 3 : 2;
				break;
		}

		ratio = Math.min( newWidth / imageWidth, newHeight / imageHeight );
		finalWidth = imageWidth * ratio;
		finalHeight = imageHeight * ratio;

		if ( newValues.hasOwnProperty( 'top' ) ) {
			newValues.top = newState.bottom - finalHeight;
		} else if ( newValues.hasOwnProperty( 'bottom' ) ) {
			newValues.bottom = newState.top + finalHeight;
		}

		if ( newValues.hasOwnProperty( 'left' ) ) {
			newValues.left = newState.right - finalWidth;
		} else if ( newValues.hasOwnProperty( 'right' ) ) {
			newValues.right = newState.left + finalWidth;
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

	onBorderDrag( x, y ) {
		const { top, left, right, bottom } = this.state,
			width = right - left,
			height = bottom - top;

		this.setState( {
			top: y,
			left: x,
			bottom: y + height,
			right: x + width
		} );
	},

	applyCrop() {
		const currentTop = this.state.top - this.props.topBound;
		const currentLeft = this.state.left - this.props.leftBound;
		const currentWidth = this.state.right - this.state.left;
		const currentHeight = this.state.bottom - this.state.top;
		const imageWidth = this.props.rightBound - this.props.leftBound;
		const imageHeight = this.props.bottomBound - this.props.topBound;

		this.props.imageEditorCrop(
			currentTop / imageHeight,
			currentLeft / imageWidth,
			currentWidth / imageWidth,
			currentHeight / imageHeight );
	},

	render() {
		const { top, left, right, bottom } = this.state;
		const width = right - left;
		const height = bottom - top;
		const handleClassName = 'editor-media-modal-image-editor__crop-handle';

		return (
			<div>
				<Draggable
					ref="border"
					onDrag={ this.onBorderDrag }
					onStop={ this.applyCrop }
					x={ left }
					y={ top }
					width={ width }
					height={ height }
					bounds={ { top: this.props.topBound, left: this.props.leftBound, bottom: this.props.bottomBound, right: this.props.rightBound } }
					className="editor-media-modal-image-editor__crop" />
				<Draggable
					onDrag={ this.onTopLeftDrag }
					onStop={ this.applyCrop }
					x={ left }
					y={ top }
					controlled
					bounds={ { top: this.props.topBound - 1, left: this.props.leftBound - 1, bottom, right } }
					ref="topLeft"
					className={ classNames( handleClassName, handleClassName + '-nwse' ) }/>
				<Draggable
					onDrag={ this.onTopRightDrag }
					onStop={ this.applyCrop }
					y={ top }
					x={ right }
					controlled
					bounds={ { top: this.props.topBound - 1, right: this.props.rightBound - 1, bottom, left } }
					ref="topRight"
					className={ classNames( handleClassName, handleClassName + '-nesw' ) } />
				<Draggable
					onDrag={ this.onBottomRightDrag }
					onStop={ this.applyCrop }
					y={ bottom }
					x={ right }
					controlled
					bounds={ { bottom: this.props.bottomBound - 1, right: this.props.rightBound - 1, top, left } }
					ref="bottomRight"
					className={ classNames( handleClassName, handleClassName + '-nwse' ) } />
				<Draggable
					onDrag={ this.onBottomLeftDrag }
					onStop={ this.applyCrop }
					y={ bottom }
					x={ left }
					controlled
					bounds={ { bottom: this.props.bottomBound - 1, left: this.props.leftBound - 1, top, right } }
					ref="bottomLeft"
					className={ classNames( handleClassName, handleClassName + '-nesw' ) } />
			</div>
		);
	}
} );

export default connect(
	( state ) => {
		const bounds = getImageEditorCropBounds( state );
		const aspectRatio = getImageEditorAspectRatio( state );
		const { degrees } = getImageEditorTransform( state );

		return Object.assign( {}, bounds, { aspectRatio, degrees } );
	},
	{ imageEditorCrop }
)( MediaModalImageEditorCrop );
