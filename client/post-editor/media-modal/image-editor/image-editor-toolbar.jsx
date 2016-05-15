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
import {
	imageEditorRotateCounterclockwise,
	imageEditorFlip
} from 'state/ui/editor/media/imageEditor/actions';

const MediaModalImageEditorToolbar = React.createClass( {
	displayName: 'MediaModalImageEditorToolbar',

	propTypes: {
		imageEditorRotateCounterclockwise: React.PropTypes.func,
		setImageEditorScale: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			imageEditorRotateCounterclockwise: noop,
			setImageEditorScale: noop
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
			console.log( action );
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
					<PopoverMenuItem action="free">Free</PopoverMenuItem>
					<PopoverMenuItem action="original">Original</PopoverMenuItem>
					<PopoverMenuItem action="16-9">16:9</PopoverMenuItem>
					<PopoverMenuItem action="4-3">4:3</PopoverMenuItem>
					<PopoverMenuItem action="3-2">3:2</PopoverMenuItem>
				</PopoverMenu>
			</div>
		);
	}
} );

export default connect(
	null,
	{ imageEditorRotateCounterclockwise, imageEditorFlip }
)( MediaModalImageEditorToolbar );
