/**
 * External dependencies
 */
import React, { PropTypes, Component } from 'react';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import config from 'config';
import SectionNav from 'components/section-nav';
import NavTabs from 'components/section-nav/tabs';
import NavItem from 'components/section-nav/item';
import GeneralSettings from './section-general';
import WritingSettings from './form-writing';
import DiscussionSettings from './section-discussion';
import AnalyticsSettings from './section-analytics';
import ImportSettings from './section-import';
import ExportSettings from './section-export';
import SiteSecurity from './section-security';
import SidebarNavigation from 'my-sites/sidebar-navigation';
import i18n from 'lib/mixins/i18n';

/**
 * Module vars
 */
const debug = debugFactory( 'calypso:my-sites:site-settings' );

export class SiteSettingsComponent extends Component {
	constructor( props ) {
		super( props );

		// bound methods
		this.updateSite = this.updateSite.bind( this );

		this.state = {
			site: this.props.sites.getSelectedSite()
		};
	}

	componentWillMount() {
		debug( 'Mounting SiteSettings React component.' );
		this.props.sites.on( 'change', this.updateSite );
	}

	componentWillUnmount() {
		this.props.sites.off( 'change', this.updateSite );
	}

	getImportPath() {
		var { site } = this.state;
		let path = '/settings/import';

		if ( site.jetpack ) {
			return `${ site.options.admin_url }import.php`;
		}

		return [ path, site.slug ].join( '/' );
	}

	getExportPath() {
		var { site } = this.state;
		return site.jetpack
			? `${ site.options.admin_url }export.php`
			: `/settings/export/${ site.slug }`;
	}

	getStrings() {
		return {
			general: i18n.translate( 'General', { context: 'settings screen' } ),
			writing: i18n.translate( 'Writing', { context: 'settings screen' } ),
			discussion: i18n.translate( 'Discussion', { context: 'settings screen' } ),
			analytics: i18n.translate( 'Analytics', { context: 'settings screen' } ),
			security: i18n.translate( 'Security', { context: 'settings screen' } ),
			'import': i18n.translate( 'Import', { context: 'settings screen' } ),
			'export': i18n.translate( 'Export', { context: 'settings screen' } ),
		};
	}

	getSections() {
		const { site } = this.state;
		const { purchases, context } = this.props;

		return {
			general: (
				<GeneralSettings
					site={ site }
					purchases={ purchases } />
			),
			writing: <WritingSettings site={ site } />,
			discussion: <DiscussionSettings site={ site } />,
			security: <SiteSecurity site={ site } />,
			analytics: <AnalyticsSettings site={ site } />,
			'import': <ImportSettings site={ site } />,
			'export': <ExportSettings site={ site } store={ context.store } />
		};
	}

	renderSectioNav() {
		const { site } = this.state;
		const { section } = this.props;

		const strings = this.getStrings();
		const selectedText = strings[ section ];

		if ( ! site ) {
			return ( <SectionNav /> );
		}

		return (
			<SectionNav selectedText={ selectedText } >
				<NavTabs>
					<NavItem
						path={ `/settings/general/${ site.slug }` }
						selected={ section === 'general' } >
							{ strings.general }
					</NavItem>

					<NavItem
						path={ `/settings/writing/${ site.slug }` }
						selected={ section === 'writing' } >
							{ strings.writing }
					</NavItem>

					<NavItem
						path={ `/settings/discussion/${ site.slug }` }
						selected={ section === 'discussion' } >
							{ strings.discussion }
					</NavItem>

					{
						! site.jetpack && config.isEnabled( 'manage/plans' ) &&
							<NavItem
								path={ `/settings/analytics/${ site.slug }` }
								selected={ section === 'analytics' } >
									{ strings.analytics }
							</NavItem>
					}

					{
						config.isEnabled( 'manage/security' ) && site.jetpack &&
							<NavItem path={ `/settings/security/${ site.slug }` }
							selected={ section === 'security' } >
								{ strings.security }
						</NavItem>
					}

					{
						config.isEnabled( 'manage/import' ) &&
							<NavItem
								path={ this.getImportPath() }
								selected={ section === 'import' }
								isExternalLink={ !! site.jetpack } >
									{ strings.import }
							</NavItem>
					}

					{
						config.isEnabled( 'manage/export' ) &&
							<NavItem
								path={ this.getExportPath() }
								selected={ section === 'export' }
								isExternalLink={ !! site.jetpack } >
									{ strings.export }
							</NavItem>
					}
				</NavTabs>
			</SectionNav>
		);
	}

	render() {
		const { site } = this.state;
		const { section } = this.props;
		const settingsSection = this.getSections();

		return (
			<section className="site-settings">
				<div className="main main-column" role="main">
					<SidebarNavigation />

					{ this.renderSectioNav( site ) }
					{ site && settingsSection[ this.props.section ] }
				</div>
			</section>
		);
	}

	updateSite() {
		this.setState( { site: this.props.sites.getSelectedSite() } );
	}
}

SiteSettingsComponent.propTypes = {
	section: PropTypes.string,
	site: PropTypes.object,
	sites: PropTypes.object
};

SiteSettingsComponent.defaultProps = {
	posts: 'general'
};
