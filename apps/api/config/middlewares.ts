export default ({ env }) => [
	'strapi::logger',
	'strapi::errors',
	{
		name: 'strapi::security',
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					'connect-src': ["'self'", 'https:'],
					'img-src': [
						"'self'",
						'data:',
						'blob:',
						'market-assets.strapi.io',
						env('R2_PUBLIC_URL', '').replace(/^https?:\/\//, ''),
					],
					'media-src': [
						"'self'",
						'data:',
						'blob:',
						env('R2_PUBLIC_URL', '').replace(/^https?:\/\//, ''),
					],
					upgradeInsecureRequests: null,
				},
			},
		},
	},
	'strapi::cors',
	'strapi::poweredBy',
	'strapi::query',
	'strapi::body',
	'strapi::session',
	'strapi::favicon',
	'strapi::public',
]
