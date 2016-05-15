/**
 * External dependencies
 */
import React from 'react';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
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

	onTopLeftDrag( event, position ) {
		this.setState( {
			top: position.y,
			left: position.x
		} );
	},

	onTopRightDrag( event, position ) {
		this.setState( {
			top: position.y,
			right: position.x
		} );
	},

	onBottomRightDrag( event, position ) {
		this.setState( {
			bottom: position.y,
			right: position.x
		} );
	},

	onBottomLeftDrag( event, position ) {
		this.setState( {
			bottom: position.y,
			left: position.x
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
					position={ { y: top, x: left } }
					bounds={ { top: this.props.topBound, left: this.props.leftBound, bottom, right } }>
					<div
						ref="topLeft"
						className="editor-media-modal-image-editor__crop-handle editor-media-modal-image-editor__crop-handle-nwse">
					</div>
				</Draggable>
				<Draggable
					onDrag={ this.onTopRightDrag }
					onStop={ this.onDragStop }
					position={ { y: top, x: right } }
					bounds={ { top: this.props.topBound, right: this.props.rightBound, bottom, left } }>
					<div
						ref="topRight"
						className="editor-media-modal-image-editor__crop-handle editor-media-modal-image-editor__crop-handle-nesw">
					</div>
				</Draggable>
				<Draggable
					onDrag={ this.onBottomRightDrag }
					onStop={ this.onDragStop }
					position={ { y: bottom, x: right } }
					bounds={ { bottom: this.props.bottomBound, right: this.props.rightBound, top, left } }>
					<div
						ref="bottomRight"
						className="editor-media-modal-image-editor__crop-handle editor-media-modal-image-editor__crop-handle-nwse">
					</div>
				</Draggable>
				<Draggable
					onDrag={ this.onBottomLeftDrag }
					onStop={ this.onDragStop }
					position={ { y: bottom, x: left } }
					bounds={ { bottom: this.props.bottomBound, left: this.props.leftBound, top, right } }>
					<div
						ref="bottomLeft"
						className="editor-media-modal-image-editor__crop-handle editor-media-modal-image-editor__crop-handle-nesw">
					</div>
				</Draggable>
			</div>
		);
	}
} );

export default connect(
	( state ) => getImageEditorCropBounds( state ),
	{ imageEditorCrop }
)( MediaModalImageEditorCrop );
