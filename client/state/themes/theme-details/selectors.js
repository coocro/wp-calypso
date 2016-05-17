/** @ssr-ready **/

export function getThemeDetails( state, id ) {
	const theme = state.themes.themeDetails.get( id );
	return theme ? formatPrice( theme.toJS() ) : {};
}

// Convert price to format used by v1.2 themes API to fit with existing components.
// TODO (seear): remove when v1.2 theme details endpoint is added
function formatPrice( theme ) {
	const price = theme.price;
	if ( price && price.value && price.currency ) {
		theme.price = price.value.toLocaleString( 'default', {
			style: 'currency',
			currency: price.currency,
			minimumFractionDigits: 0,
		} );
	} else if ( price && price.display ) {
		theme.price = price.display;
	}
	return theme;
}
