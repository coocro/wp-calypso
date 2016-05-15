/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	getImageEditorTransform,
	getImageEditorFileInfo,
	imageEditorHasChanges,
	getImageEditorCropBounds,
	getImageEditorCrop
} from '../selectors';

describe( 'selectors', () => {
	describe( '#getImageEditorTransform()', () => {
		it( 'should return the current image editor transform', () => {
			const transform = getImageEditorTransform( {
				ui: {
					editor: {
						media: {
							imageEditor: {
								transform: {
									degrees: 180,
									scaleX: -1,
									scaleY: 2
								}
							}
						}
					}
				}
			} );

			expect( transform ).to.eql( {
				degrees: 180,
				scaleX: -1,
				scaleY: 2
			} );
		} );
	} );

	describe( '#getImageEditorFileInfo()', () => {
		it( 'should return the information about the current image', () => {
			const fileInfo = getImageEditorFileInfo( {
				ui: {
					editor: {
						media: {
							imageEditor: {
								fileInfo: {
									src: 'testSrc',
									fileName: 'testFileName'
								}
							}
						}
					}
				}
			} );

			expect( fileInfo ).to.eql( {
				src: 'testSrc',
				fileName: 'testFileName'
			} );
		} );
	} );

	describe( '#imageEditorHasChanges()', () => {
		it( 'should return the editor changed state', () => {
			const hasChanges = imageEditorHasChanges( {
				ui: {
					editor: {
						media: {
							imageEditor: {
								hasChanges: true
							}
						}
					}
				}
			} );

			expect( hasChanges ).to.be.true;
		} );
	} );

	describe( '#getImageEditorCropBounds()', () => {
		it( 'should return the crop bounds', () => {
			const bounds = getImageEditorCropBounds( {
				ui: {
					editor: {
						media: {
							imageEditor: {
								cropBounds: {
									topBound: 100,
									leftBound: 200,
									bottomBound: 300,
									rightBound: 400
								}
							}
						}
					}
				}
			} );

			expect( bounds ).to.eql( {
				topBound: 100,
				leftBound: 200,
				bottomBound: 300,
				rightBound: 400
			} );
		} );
	} );

	describe( '#getImageEditorCrop()', () => {
		it( 'should return crop ratios', () => {
			const hasChanges = getImageEditorCrop( {
				ui: {
					editor: {
						media: {
							imageEditor: {
								crop: {
									topRatio: 0.2,
									leftRatio: 0.3,
									widthRatio: 0.4,
									heightRatio: 0.5
								}
							}
						}
					}
				}
			} );

			expect( hasChanges ).to.eql( {
				topRatio: 0.2,
				leftRatio: 0.3,
				widthRatio: 0.4,
				heightRatio: 0.5
			} );
		} );
	} );
} );
