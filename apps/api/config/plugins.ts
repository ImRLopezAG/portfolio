export default ({ env }) => ({
	upload: {
		config: {
			provider: '@strapi/provider-upload-aws-s3',
			providerOptions: {
				baseUrl: env('R2_PUBLIC_URL'),
				s3Options: {
					credentials: {
						accessKeyId: env('R2_ACCESS_KEY_ID'),
						secretAccessKey: env('R2_SECRET_ACCESS_KEY'),
					},
					endpoint: env('R2_ENDPOINT'),
					region: 'auto',
					params: {
						Bucket: env('R2_BUCKET'),
					},
				},
			},
			actionOptions: {
				upload: {},
				uploadStream: {},
				delete: {},
			},
		},
	},
})
