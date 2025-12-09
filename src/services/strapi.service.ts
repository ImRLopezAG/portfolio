import { profile } from '@lib/schemas'

const data = {
	basics: {
		name: 'Angel Gabriel Lopez Solano',
		label:
			'Full-Stack developer with +3 years of experience & basketball player',
		url: 'https://github.com/ImRLopezAG',
		phone: '8492679236',
		summary: [
			{
				text: 'Results-driven software developer with 3+ years of experience crafting impactful, real-world applications in .NET, Next.js, and Dynamics 365. Recognized for designing reliable, scalable solutions in areas such as citizen safety, education, and fintech. Blending technical expertise with a proactive, solution-oriented mindset.',
			},
			{
				text: 'Skilled in collaborative and independent work environments, consistently delivering clean, efficient code that exceeds expectations. Eager to contribute technical insights and innovation to a dynamic team.',
			},
		],
		email: 'contact@imrlopez.dev',
		image: {
			url: 'https://bucket.imrlopez.dev/Profile.webp',
			caption:
				'A professional man poses for a headshot in a modern office environment.',
		},
		location: {
			countryCode: 'DOM',
			region: 'Santo Domingo',
			city: 'Distrito Nacional',
		},
		profiles: [
			{
				username: 'Angel Gabriel Lopez',
				url: 'https://www.linkedin.com/in/angel-gabriel-lopez/',
				network: 'LinkedIn',
			},
			{
				username: 'ImRLopezAG',
				url: 'https://github.com/ImRLopezAG',
				network: 'GitHub',
			},
		],
	},
	projects: [
		{
			name: 'Sync4ge',
			url: 'https://github.com/Sync4ge',
			github: 'https://github.com/Sync4ge',
			state: 'WIP',
			desc: 'ERP/CRM system designed to streamline business operations, enhance customer relationship management, and drive growth through integrated solutions.',
			color: 'blue',
			techStack: ['nextjs', 'docker', 'nest.js', 'redis', 'postgresql', 'aws', 'cloudflare'],
			icon: 'Cloud',
		},
		{
			name: 'LegalAi',
			url: 'https://serviciojudicial.com',
			icon: 'Brain',
			state: 'ACTIVE',
			desc: 'LegalAi is an AI-powered legal assistant that helps users with legal research, document generation, and case analysis.',
			color: 'cyan',
			techStack: [
				'tanstack',
				'sqlite',
				'socket.io',
				'hono',
				'upstash',
				'redis',
			],
		},
		{
			name: 'Tech - hub',
			url: 'https://tech-hub-imrlopezag.vercel.app',
			github: 'https://github.com/ImRLopezAG/tech-hub',
			state: 'ACTIVE',
			desc: 'Tech - hub is a optimized website of ITLA that provides information about the scores of the students in real-time using their own api.',
			color: 'violet',
			techStack: ['nextjs', 'tailwindcss', 'better-auth', 'shadcn'],
			icon: 'Rocket',
		},
		{
			name: 'RNC Contributors',
			url: 'https://rnc-contributors.vercel.app/api',
			github: 'https://github.com/ImRLopezAG/rnc-contributors',
			state: 'ACTIVE',
			desc: 'RNC Contributors is an open-source api that allows users to view the contributors of `Registro Nacional de Contribuyentes` (RNC) in the Dominican Republic.',
			color: 'emerald',
			techStack: ['hono', 'sqlite', 'redis', 'upstash'],
			icon: 'ServerCog',
		},
	],
	languages: [
		{ language: 'English', fluency: 'ADVANCE' },
		{ language: 'Spanish', fluency: 'NATIVE' },
	],
	education: [
		{
			institution: 'Intituto Tecnologico de las Americas (ITLA)',
			url: 'https://itla.edu.do/',
			area: 'Software Engineer',
			studyType: 'Bachelor',
			startDate: '2021-01-06',
			endDate: '2024-04-17',
			score: '3.7',
			courses: [
				{ text: 'Data structures' },
				{ text: 'Database management' },
				{ text: 'Process optimization' },
				{ text: 'Web development' },
				{ text: 'SCRUM' },
			],
			scoreType: 'GPA',
		},
		{
			institution: 'Mescyt - English Immersion Program',
			url: 'https://mescyt.gob.do/',
			area: 'Foreign languages',
			studyType: 'Certificate',
			startDate: '2023-01-16',
			endDate: '2023-11-30',
			score: 'B2',
			courses: [
				{
					text: 'Intensive English program for one year provided by the Ministry of Education',
				},
			],
			scoreType: 'level',
		},
	],
	work: [
		{
			name: 'Dextra',
			position: 'Consultant developer',
			url: 'https://dextra.com.do/',
			highlights: [
				{ text: 'Development of business central applications' },
				{
					text: 'Creation and maintenance of business solutions for clients',
				},
				{ text: 'Collaboration with the development team' },
			],
			summary: [
				{
					text: 'I work as a consultant in the development of business central applications, creating and maintaining business solutions for clients',
				},
			],
			startedDate: '2023-10-08',
			endDate: '2025-04-17',
		},
		{
			name: 'Villacampa - School of Technology',
			position: 'Tech Professor',
			url: 'https://www.instagram.com/villacampast/',
			highlights: [
				{ text: 'Taught programming and web development' },
				{ text: "Created and maintained the school's website" },
				{ text: "Collaborated with the school's development team" },
			],
			summary: [
				{
					text: "I taught programming and web development to students of all ages. I also created and maintained the school's website.",
				},
			],
			startedDate: '2021-06-22',
			endDate: null,
		},
	],
} satisfies ProfileInput
export const strapi = {
	profile: () => profile.parse(data),
} as const
