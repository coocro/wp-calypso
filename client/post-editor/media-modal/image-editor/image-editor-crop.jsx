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
import { getImageEditorCropBounds } from 'state/ui/editor/media/imageEditor/selectors';
import { imageEditorCrop } from 'state/ui/editor/media/imageEditor/actions';

const MediaModalImageEditorCrop = React.createClass( {
	displayName: 'MediaModalImageEditorCrop',

	propTypes: {
		topBound: React.PropTypes.number,
		leftBound: React.PropTypes.number,
		bottomBound: React.PropTypes.number,
		rightBound: React.PropTypes.number,
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
			this.setState( this.getDefaultState( newProps ) );
		}
	},

	onTopLeftDrag( x, y ) {
		this.setState( {
			top: y,
			left: x
		} );
	},

	onTopRightDrag( x, y ) {
		this.setState( {
			top: y,
			right: x
		} );
	},

	onBottomRightDrag( x, y ) {
		this.setState( {
			bottom: y,
			right: x
		} );
	},

	onBottomLeftDrag( x, y ) {
		this.setState( {
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
	( state ) => getImageEditorCropBounds( state ),
	{ imageEditorCrop }
)( MediaModalImageEditorCrop );
