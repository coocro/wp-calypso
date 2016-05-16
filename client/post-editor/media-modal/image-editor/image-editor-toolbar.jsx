/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import PopoverMenu from 'components/popover/menu';
import PopoverMenuItem from 'components/popover/menu-item';
import { AspectRatios } from 'state/ui/editor/media/imageEditor/constants';
import {
	imageEditorRotateCounterclockwise,
	imageEditorFlip,
	setImageEditorAspectRatio
} from 'state/ui/editor/media/imageEditor/actions';

const MediaModalImageEditorToolbar = React.createClass( {
	displayName: 'MediaModalImageEditorToolbar',

	propTypes: {
		imageEditorRotateCounterclockwise: React.PropTypes.func,
		imageEditorFlip: React.PropTypes.func,
		setImageEditorAspectRatio: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			imageEditorRotateCounterclockwise: noop,
			imageEditorFlip: noop,
			setImageEditorAspectRatio: noop
		};
	},

	getInitialState() {
		return {
			showAspectPopover: false
		};
	},

	rotate() {
		this.props.imageEditorRotateCounterclockwise();
	},

	flip() {
		this.props.imageEditorFlip();
	},

	onAspectOpen( event ) {
		event.preventDefault();
		this.setState( { showAspectPopover: true } );
	},

	onAspectClose( action ) {
		this.setState( { showAspectPopover: false } );

		if ( 'string' === typeof action ) {
			this.props.setImageEditorAspectRatio( action );
		}
	},

	renderButtons() {
		const buttons = [
			{
				tool: 'rotate',
				icon: 'rotate',
				text: this.translate( 'Rotate' ),
				onClick: this.rotate
			},
			{
				tool: 'aspect',
				ref: 'aspectButton',
				icon: 'layout',
				text: this.translate( 'Aspect' ),
				onClick: this.onAspectOpen
			},
			{
				tool: 'flip-vertical',
				icon: 'flip-vertical',
				text: this.translate( 'Flip' ),
				onClick: this.flip
			}
		];

		return buttons.map( function( button ) {
			return (
				<button
					key={ 'edit-toolbar-' + button.tool }
					ref={ button.ref }
					className={ 'editor-media-modal-image-editor__toolbar-button' }
					onClick={ button.onClick } >
					<Gridicon icon={ button.icon } size={ 36 } />
					<span>{ button.text }</span>
				</button>
			);
		}, this );
	},

	render() {
		return (
			<div className="editor-media-modal-image-editor__toolbar">
				{ this.renderButtons() }
				<PopoverMenu isVisible={ this.state.showAspectPopover }
						onClose={ this.onAspectClose }
						position="top"
						context={ this.refs && this.refs.aspectButton }
						className="popover is-dialog-visible">
					<PopoverMenuItem action={ AspectRatios.FREE }>{ this.translate( 'Free' ) }</PopoverMenuItem>
					<PopoverMenuItem action={ AspectRatios.ORIGINAL }>{ this.translate( 'Original' ) }</PopoverMenuItem>
					<PopoverMenuItem action={ AspectRatios.ASPECT_1x1 }>{ this.translate( 'Square' ) }</PopoverMenuItem>
					<PopoverMenuItem action={ AspectRatios.ASPECT_16x9 }>{ this.translate( '16:9' ) }</PopoverMenuItem>
					<PopoverMenuItem action={ AspectRatios.ASPECT_4X3 }>{ this.translate( '4:3' ) }</PopoverMenuItem>
					<PopoverMenuItem action={ AspectRatios.ASPECT_3X2 }>{ this.translate( '3:2' ) }</PopoverMenuItem>
				</PopoverMenu>
			</div>
		);
	}
} );

export default connect(
	null,
	{ imageEditorRotateCounterclockwise, imageEditorFlip, setImageEditorAspectRatio }
)( MediaModalImageEditorToolbar );
