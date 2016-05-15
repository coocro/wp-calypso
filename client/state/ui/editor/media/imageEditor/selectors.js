/**
 * Returns an object representing the image editor transform
 *
 * @param  {Object}  state Global state tree
 * @return {Object}  image editor transform { degrees, scaleX, scaleY }
 *
 */
export function getImageEditorTransform( state ) {
	return state.ui.editor.media.imageEditor.transform;
}

/**
 * Returns an object containing the image data loaded in the editor
 *
 * @param  {Object}  state Global state tree
 * @return {Object}  image data { src, fileName }
 *
 */
export function getImageEditorFileInfo( state ) {
	return state.ui.editor.media.imageEditor.fileInfo;
}

/**
 * Returns true if there were any changes made to the editor
 *
 * @param  {Object}  state Global state tree
 * @return {Boolean} true if editor has changes
 *
 */
export function imageEditorHasChanges( state ) {
	return state.ui.editor.media.imageEditor.hasChanges;
}

/**
 * Returns the bounds of the canvas crop tool
 *
 * @param  {Object} state Global state tree
 * @return {Object} topBound, leftBound, bottomBound and rightBound of the canvas
 *
 */
export function getImageEditorCropBounds( state ) {
	return state.ui.editor.media.imageEditor.cropBounds;
}

/**
 * Returns the crop data for the image editor
 *
 * @param  {Object} state Global state tree
 * @return {Object} topRatio, leftRatio, widthRatio and heightRatio of the crop
 *
 */
export function getImageEditorCrop( state ) {
	return state.ui.editor.media.imageEditor.crop;
}
