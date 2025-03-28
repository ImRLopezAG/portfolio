export const {
	basics,
	education,
	interests,
	languages,
	projects,
	skills,
	volunteer,
	work,
} = {
	basics: {
		name: 'Angel Gabriel Lopez Solano',
		label:
			'Full-Stack developer with +2 years of experience & basketball player',
		image: '/me.png',
		email: 'contact@imrlopez.dev',
		phone: '+1 8492679236',
		url: 'https://imrlopez.dev',
		summary: [
			'Results-driven software developer with 2+ years of experience crafting impactful, real-world applications in .NET, Next.js, and Dynamics 365. Recognized for designing reliable, scalable solutions in areas such as citizen safety, education, and fintech. Blending technical expertise with a proactive, solution-oriented mindset.',
			'Skilled in collaborative and independent work environments, consistently delivering clean, efficient code that exceeds expectations. Eager to contribute technical insights and innovation to a dynamic team.',
		],
		location: {
			address: '',
			postalCode: '08820',
			city: 'Dominican Republic',
			countryCode: 'DOM',
			region: 'Santo Domingo',
		},
		profiles: [
			{
				network: 'LinkedIn',
				username: 'Angel Gabriel Lopez',
				url: 'https://www.linkedin.com/in/angel-gabriel-lopez/',
			},
			{
				network: 'GitHub',
				username: 'ImRLopezAG',
				url: 'https://github.com/ImRLopezAG',
			},
		],
	},
	work: [
		{
			name: 'Dextra',
			position: 'Development consultant',
			url: 'https://dextra.com.do/',
			startDate: '2023-10-17',
			summary:
				'I work as a consultant in the development of business central applications, creating and maintaining business solutions for clients',
			highlights: [
				'Development of business central applications',
				'Creation and maintenance of business solutions for clients',
				'Collaboration with the development team',
			],
		},
		{
			name: 'Villacampa - School of Technology',
			position: 'Tech Professor',
			url: 'https://www.instagram.com/villacampast/',
			startDate: '2019-03-01',
			endDate: '2020-12-15',
			summary:
				"I taught programming and web development to students of all ages. I also created and maintained the school's website.",
			highlights: [
				'Taught programming and web development',
				"Created and maintained the school's website",
				"Collaborated with the school's development team",
			],
		},
	],
	volunteer: [],
	education: [
		{
			institution: 'Intituto Tecnologico de las Americas (ITLA)',
			url: 'https://itla.edu.do/',
			area: 'Software Engineer',
			studyType: 'Bachelor',
			startDate: '2022-02-01',
			endDate: '2024-04-01',
			scoreType: 'GPA',
			score: '3.7',
			courses: [
				'Data structures',
				'Database management',
				'Process optimization',
				'Web development',
			],
		},
		{
			institution: 'Mescyt - English Immersion Program',
			area: 'Foreign languages',
			studyType: 'Certificate',
			startDate: '2023-02-01',
			endDate: '2023-12-01',
			scoreType: 'Level',
			score: 'B2',
			courses: [
				'Intensive English program for one year provided by the Ministry of Education',
			],
		},
	],
	skills: [
		{
			name: 'HTML',
			level: 'Advanced',
			keywords: ['Frontend'],
		},
		{
			name: 'CSS',
			level: 'Mid',
			keywords: ['Frontend'],
		},
		{
			name: 'JavaScript',
			level: 'Mid',
			keywords: ['Fullstack'],
		},
		{
			name: 'Tailwind',
			level: 'Mid',
			keywords: ['Frontend'],
		},
		{
			name: 'TypeScript',
			level: 'Mid',
			keywords: ['Fullstack'],
		},
		{
			name: 'Node',
			level: 'Mid',
			keywords: ['Backend'],
		},
		{
			name: 'React',
			level: 'Mid',
			keywords: ['Frontend'],
		},
		{
			name: 'Next.js',
			level: 'Mid',
			keywords: ['Fullstack'],
		},
		{
			name: 'MSSQL',
			level: 'Mid',
			keywords: ['Backend'],
		},
		{
			name: 'OOP',
			level: 'Advanced',
			keywords: ['Fullstack', 'Architecture'],
		},
		{
			name: 'Clean Architecture',
			level: 'Mid',
			keywords: ['Fullstack', 'Architecture'],
		},
		{
			name: 'SOLID',
			level: 'Advanced',
			keywords: ['Fullstack', 'Architecture'],
		},
		{
			name: 'SCRUM',
			level: 'Mid',
			keywords: ['Fullstack', 'Collaboration'],
		},
		{
			name: 'Flutter',
			level: 'Beginner',
			keywords: ['Frontend', 'Mobile'],
		},
		{
			name: 'Dart',
			level: 'Beginner',
			keywords: ['Frontend', 'Mobile'],
		},
		{
			name: 'GraphQL',
			level: 'Beginner',
			keywords: ['Fullstack'],
		},
		{
			name: 'CSharp',
			level: 'Mid',
			keywords: ['Backend', 'Architecture'],
		},
		{
			name: 'DotNet',
			level: 'Mid',
			keywords: ['Backend'],
		},
		{
			name: 'Git',
			level: 'Mid',
			keywords: ['Collaboration'],
		},
		{
			name: 'GitHub',
			level: 'Mid',
			keywords: ['Collaboration'],
		},
		{
			name: 'Docker',
			level: 'Beginner',
			keywords: ['Collaboration'],
		},
		{
			name: 'Cypress',
			level: 'Mid',
			keywords: ['Fullstack'],
		},
		{
			name: 'Postgres',
			level: 'Mid',
			keywords: ['Backend'],
		},
		{
			name: 'MongoDB',
			level: 'Beginner',
			keywords: ['Backend'],
		},
		{
			name: 'Redis',
			level: 'Beginner',
			keywords: ['Backend'],
		},
		{
			name: 'React Native',
			level: 'Beginner',
			keywords: ['Mobile', 'Frontend'],
		},
	],
	languages: [
		{
			language: 'Spanish',
			fluency: 'Native speaker',
		},
		{
			language: 'English',
			fluency: 'Advanced',
		},
	],
	interests: [
		{
			name: 'Basketball',
			keywords: ['NBA'],
		},
	],
	projects: [
		{
			name: 'RNC Contributors',
			isActive: true,
			description:
				'RNC Contributors is an open-source api that allows users to view the contributors of `Registro Nacional de Contribuyentes` (RNC) in the Dominican Republic. ',
			highlights: ['NextJs', 'sqlite', 'Hono', 'Turso'],
			url: 'https://rnc-contributors.vercel.app/api',
			github: 'https://github.com/ImRLopezAG/rnc-contributors',
		},
		{
			name: 'SHurl',
			isActive: true,
			description:
				'SHurl is a URL shortener and also have a image optimizer api, which allows you to optimize images in a simple way',
			highlights: ['NextJs', 'postgres'],
			url: 'https://shurl-links.vercel.app/',
			github: 'https://github.com/ImRLopezAG/links-shorter',
		},
		{
			name: 'Image Optimizer',
			isActive: true,
			description:
				'Image Optimizer, a web application that allows you to optimize images in a simple way',
			highlights: ['NextJs', 'TRPC', 'TailwindCss'],
			url: 'https://img-opt.vercel.app/',
			github: '',
		},
		{
			name: 'EMP (English Immersion Program)',
			isActive: true,
			description:
				'A web made for admin attendance, scores, quizzes and activities and homeworks',
			highlights: ['NextJs', 'TRPC', 'TailwindCss', 'postgres', 'drizzle'],
			url: '',
			github: '',
		},
		{
			name: 'Crime App',
			isActive: true,
			description:
				'CrimeTrackRD is an innovative platform with the primary goal of enhancing citizen security in the Dominican Republic.',
			highlights: ['NextJs', 'TRPC', 'TailwindCss', 'postgres', 'drizzle'],
			url: 'https://crime-app.vercel.app',
			github: '',
		},
		{
			name: 'Tech Path',
			isActive: true,
			description:
				'An optimized alternative to the ITLA student page, which is the university where I studied.',
			highlights: ['NextJs', 'TRPC', 'TailwindCss'],
			url: 'https://tech-path.vercel.app/',
			github: '',
		},
		{
			name: 'GNX/utilities',
			isActive: true,
			description:
				'A set of utility libraries made in TypeScript, which serve to develop a backend in a straightforward manner and all  with generics',
			highlights: ['Typescript', 'Node', 'Express'],
			url: 'https://gnx-udocs.vercel.app/',
			github: 'https://github.com/ImRLopezAG/gnx-core',
		},
		{
			name: 'cy-utilities',
			isActive: true,
			description:
				'A set of utility out of the box for cypress but it provides a way to extend it and make the tests easier to write',
			highlights: ['Typescript', 'Node', 'Cypress'],
			url: 'https://www.npmjs.com/package/cy-utilities',
			github: 'https://github.com/ImRLopezAG/cy-utilities',
		},
		{
			name: 'try-handler',
			isActive: true,
			description:
				'Try handler is a powerful utility that wraps try-catch blocks in a function, allowing you to handle errors in a more elegant way.',
			highlights: ['Typescript', 'Node', 'Error handling', 'Safe code'],
			url: 'https://www.npmjs.com/package/try-handler',
			github: 'https://github.com/ImRLopezAG/try-handler',
		},
		{
			name: 'Real Estate',
			isActive: true,
			description:
				'Real estate application where you can manage properties, clients, and sales.',
			highlights: ['.Net', 'TailwindCss', 'SQL database'],
			url: '',
			github: '',
		},
		{
			name: 'Internet Banking',
			isActive: true,
			description:
				'Banking administrator, where clients can manage their accounts, payments, loans. The administrator can manage the clients, accounts, and loans.',
			highlights: [
				'.Net',
				'TailwindCss',
				'Identity',
				'React',
				'Flutter',
				'SQL and NoSQL database',
			],
			url: '',
			github: 'https://github.com/ImRLopezAG/InternetBanking-Project',
		},
		{
			name: 'Task Manager',
			isActive: true,
			description:
				'A task manager I developed for my personal use, where I can manage my tasks, projects, and goals.',
			highlights: [
				'NextJs',
				'TailwindCss',
				'TRPC',
				'NextAuth',
				'Google Gemini AI',
				'SQL database',
			],
			url: '',
			github: 'https://github.com/ImRLopezAG/task-ai',
		},
		{
			name: 'Chat Bot',
			isActive: true,
			description:
				'Chatbot using Google Gemini AI with chat persistence in local storage using zustand.',
			highlights: ['NextJs', 'TailwindCss', 'Google Gemini AI', 'Zustand'],
			url: '',
			github: 'https://github.com/ImRLopezAG/gpt-next',
		},
	],
}
