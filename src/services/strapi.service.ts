import { localize } from '@lib/localize'
import { profile } from '@lib/schemas'
import { DEFAULT_LOCALE, type Locale } from '@/i18n/config'

const data = {
	basics: {
		name: 'Angel Gabriel Lopez Solano',
		label: {
			en: 'AI Engineer · Forward Deployed Engineer',
			es: 'Ingeniero de IA · Forward Deployed Engineer',
		},
		url: 'https://github.com/ImRLopezAG',
		phone: '8492679236',
		summary: [
			{
				text: {
					en: 'AI engineer with 3+ years of software development experience, focused on forward-deployed engineering, ontology-driven applications, and retrieval-augmented generation (RAG). I translate business requirements and domain knowledge into AI-powered products.',
					es: 'Ingeniero de IA con más de 3 años de experiencia en desarrollo de software, enfocado en forward-deployed engineering, aplicaciones basadas en ontologías y generación aumentada por recuperación (RAG). Convierto requisitos de negocio y conocimiento del dominio en productos con IA.',
				},
			},
			{
				text: {
					en: 'My work spans LLM agents, real-time voice workflows, semantic search, and integrations with existing systems. I connect data modeling, application development, and infrastructure to bring AI into practical business workflows.',
					es: 'Mi trabajo abarca agentes basados en LLM, flujos de voz en tiempo real, búsqueda semántica e integraciones con sistemas existentes. Conecto modelado de datos, desarrollo de aplicaciones e infraestructura para incorporar IA a los procesos de negocio.',
				},
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
	skills: [
		'LLM Engineering',
		'RAG',
		'Ontology Modeling',
		'AI Agents',
		'Voice AI',
		'Forward Deployed Engineering',
		'Prompt Engineering',
		'Embeddings & Semantic Search',
		'LLM Evaluation',
		'typescript',
		'nextjs',
		'openai',
		'ai sdk',
		'postgresql',
		'docker',
		'aws',
	],
	projects: [
		{
			name: 'Receptionist',
			state: 'WIP',
			desc: {
				en: 'An AI receptionist that answers and places calls for you. Run outbound campaigns, dial contact lists in batches, pick up incoming calls, and reply to customers on WhatsApp — with a realtime voice model holding the conversation instead of a phone menu.',
				es: 'Una recepcionista con IA que contesta y realiza llamadas por ti. Lanza campañas salientes, marca listas de contactos por lotes, atiende llamadas entrantes y responde a clientes por WhatsApp, con un modelo de voz en tiempo real llevando la conversación en lugar de un menú telefónico.',
			},
			color: 'rose',
			techStack: [
				'tanstack',
				'react',
				'hono',
				'tailwind',
				'convex',
				'redis',
				'workos',
				'openai',
				'xai',
				'twilio',
				'vercel',
			],
			icon: 'PhoneCall',
		},
		{
			name: 'QAlitycs',
			state: 'ACTIVE',
			desc: {
				en: 'Call center quality assurance platform that analyzes calls end to end — sentiment analysis, script adherence, and the surrounding call metrics teams need to score and coach agents on.',
				es: 'Plataforma de control de calidad para call centers que analiza las llamadas de principio a fin: análisis de sentimiento, adherencia al guion y las métricas que los equipos necesitan para evaluar y formar a sus agentes.',
			},
			color: 'amber',
			techStack: [
				'tanstack',
				'convex',
				'redis',
				'ai sdk',
				'tailwind',
				'hono',
				'workos',
			],
			icon: 'AudioLines',
		},
		{
			name: 'Sync4ge',
			url: 'https://github.com/Sync4ge',
			github: 'https://github.com/Sync4ge',
			state: 'WIP',
			desc: {
				en: 'ERP/CRM system designed to streamline business operations, enhance customer relationship management, and drive growth through integrated solutions.',
				es: 'Sistema ERP/CRM diseñado para agilizar las operaciones del negocio, mejorar la gestión de clientes e impulsar el crecimiento mediante soluciones integradas.',
			},
			color: 'blue',
			techStack: [
				'nextjs',
				'docker',
				'nest.js',
				'redis',
				'postgresql',
				'aws',
				'cloudflare',
			],
			icon: 'Cloud',
		},
		{
			name: 'LegalAi',
			url: 'https://serviciojudicial.com',
			icon: 'Brain',
			state: 'ACTIVE',
			desc: {
				en: 'LegalAi is an AI-powered legal assistant that helps users with legal research, document generation, and case analysis.',
				es: 'LegalAi es un asistente legal con IA que ayuda en la investigación jurídica, la generación de documentos y el análisis de casos.',
			},
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
			desc: {
				en: 'Tech - hub is a optimized website of ITLA that provides information about the scores of the students in real-time using their own api.',
				es: 'Tech - hub es una versión optimizada del sitio de ITLA que muestra las calificaciones de los estudiantes en tiempo real usando su propia api.',
			},
			color: 'violet',
			techStack: ['nextjs', 'tailwindcss', 'better-auth', 'shadcn'],
			icon: 'Rocket',
		},
		{
			name: 'RNC Contributors',
			url: 'https://rnc-contributors.vercel.app/api',
			github: 'https://github.com/ImRLopezAG/rnc-contributors',
			state: 'ACTIVE',
			desc: {
				en: 'RNC Contributors is an open-source api that allows users to view the contributors of `Registro Nacional de Contribuyentes` (RNC) in the Dominican Republic.',
				es: 'RNC Contributors es una api de código abierto que permite consultar los contribuyentes del Registro Nacional de Contribuyentes (RNC) de República Dominicana.',
			},
			color: 'emerald',
			techStack: ['hono', 'sqlite', 'redis', 'upstash'],
			icon: 'ServerCog',
		},
	],
	languages: [
		{ language: 'English', fluency: { en: 'ADVANCE', es: 'AVANZADO' } },
		{ language: 'Spanish', fluency: { en: 'NATIVE', es: 'NATIVO' } },
	],
	education: [
		{
			institution: 'Intituto Tecnologico de las Americas (ITLA)',
			url: 'https://itla.edu.do/',
			location: 'Santo Domingo, Dominican Republic',
			area: { en: 'Software Engineer', es: 'Ingeniería de Software' },
			studyType: { en: 'Bachelor', es: 'Licenciatura' },
			startDate: '2021-01-06',
			endDate: '2024-04-17',
			score: '3.7',
			courses: [
				{ text: { en: 'Data structures', es: 'Estructuras de datos' } },
				{
					text: { en: 'Database management', es: 'Gestión de bases de datos' },
				},
				{
					text: { en: 'Process optimization', es: 'Optimización de procesos' },
				},
				{ text: { en: 'Web development', es: 'Desarrollo web' } },
				{ text: { en: 'SCRUM', es: 'SCRUM' } },
			],
			scoreType: 'GPA',
		},
		{
			institution: 'Mescyt - English Immersion Program',
			url: 'https://mescyt.gob.do/',
			location: 'Santo Domingo, Dominican Republic',
			area: { en: 'Foreign languages', es: 'Idiomas extranjeros' },
			studyType: { en: 'Certificate', es: 'Certificado' },
			startDate: '2023-01-16',
			endDate: '2023-11-30',
			score: 'B2',
			courses: [
				{
					text: {
						en: 'Intensive English program for one year provided by the Ministry of Education',
						es: 'Programa intensivo de inglés de un año impartido por el Ministerio de Educación',
					},
				},
			],
			scoreType: 'level',
		},
	],
	work: [
		{
			name: 'AI - Robotix',
			position: {
				en: 'Technical Lead Engineer',
				es: 'Ingeniero Líder Técnico',
			},
			url: 'https://airobotix.net/',
			employmentType: 'Full-time',
			location: 'Cupertino, California, United States',
			workMode: 'Hybrid',
			skills: ['Software Quality and Test Assurance'],
			highlights: [
				{
					text: {
						en: 'Lead SaaS development and product engineering',
						es: 'Liderar el desarrollo SaaS y la ingeniería de producto',
					},
				},
				{
					text: {
						en: 'Design and manage application infrastructure as code (IaC)',
						es: 'Diseñar y gestionar la infraestructura de aplicaciones como código (IaC)',
					},
				},
				{
					text: {
						en: 'Build with Next.js, React, and TanStack Start',
						es: 'Construir con Next.js, React y TanStack Start',
					},
				},
				{
					text: {
						en: 'Develop an Ontology software project',
						es: 'Desarrollar un proyecto de software de Ontología',
					},
				},
				{
					text: {
						en: 'Conduct AI research and product management',
						es: 'Realizar investigación en IA y gestión de producto',
					},
				},
			],
			summary: [
				{
					text: {
						en: 'I lead SaaS development and application infrastructure as code (IaC), working with Next.js, React, and TanStack Start. I also drive an Ontology software project and contribute as an AI researcher and product manager.',
						es: 'Lidero el desarrollo SaaS y la infraestructura como código (IaC), trabajando con Next.js, React y TanStack Start. También impulso un proyecto de software de Ontología y aporto como investigador de IA y product manager.',
					},
				},
			],
			startedDate: '2026-02-01',
			endDate: null,
		},
		{
			// NOTE: drafted from the role's skills and the team's stack — review and
			// reword to match what you actually shipped before this goes public.
			name: 'AI - Robotix',
			position: { en: 'Software Engineer', es: 'Ingeniero de Software' },
			url: 'https://airobotix.net/',
			employmentType: 'Full-time',
			location: 'Cupertino, California, United States',
			workMode: 'Hybrid',
			skills: ['Vibe Coding', 'Data Structures'],
			highlights: [
				{
					text: {
						en: 'Build product features across the SaaS platform',
						es: 'Construir funcionalidades de producto en la plataforma SaaS',
					},
				},
				{
					text: {
						en: 'Ship UI with Next.js, React, and TanStack Start',
						es: 'Entregar interfaces con Next.js, React y TanStack Start',
					},
				},
				{
					text: {
						en: 'Model data structures backing core application flows',
						es: 'Modelar las estructuras de datos detrás de los flujos principales',
					},
				},
				{
					text: {
						en: 'Prototype rapidly with AI-assisted development',
						es: 'Prototipar rápido con desarrollo asistido por IA',
					},
				},
			],
			summary: [
				{
					text: {
						en: 'I built product features across the SaaS platform with Next.js, React, and TanStack Start, modelling the data structures behind core flows and prototyping quickly with AI-assisted development before stepping into the technical lead role.',
						es: 'Construí funcionalidades de producto en la plataforma SaaS con Next.js, React y TanStack Start, modelando las estructuras de datos de los flujos principales y prototipando rápido con desarrollo asistido por IA antes de pasar al rol de líder técnico.',
					},
				},
			],
			startedDate: '2025-11-01',
			endDate: '2026-02-01',
		},
		{
			name: 'Dextra',
			position: {
				en: 'Consultant developer',
				es: 'Desarrollador consultor',
			},
			url: 'https://dextra.com.do/',
			employmentType: 'Full-time',
			location: 'Santo Domingo, Distrito Nacional, Dominican Republic',
			workMode: 'On-site',
			skills: ['Linux', 'Analytical Skills'],
			highlights: [
				{
					text: {
						en: 'Development of business central applications',
						es: 'Desarrollo de aplicaciones en Business Central',
					},
				},
				{
					text: {
						en: 'Creation and maintenance of business solutions for clients',
						es: 'Creación y mantenimiento de soluciones de negocio para clientes',
					},
				},
				{
					text: {
						en: 'Collaboration with the development team',
						es: 'Colaboración con el equipo de desarrollo',
					},
				},
			],
			summary: [
				{
					text: {
						en: 'I work as a consultant in the development of business central applications, creating and maintaining business solutions for clients',
						es: 'Trabajo como consultor en el desarrollo de aplicaciones de Business Central, creando y manteniendo soluciones de negocio para clientes',
					},
				},
			],
			startedDate: '2023-10-08',
			endDate: '2025-04-17',
		},
		{
			name: 'Villacampa - School of Technology',
			position: { en: 'Tech Professor', es: 'Profesor de Tecnología' },
			url: 'https://www.instagram.com/villacampast/',
			location: 'Santo Domingo, Dominican Republic',
			highlights: [
				{
					text: {
						en: 'Taught programming and web development',
						es: 'Enseñé programación y desarrollo web',
					},
				},
				{
					text: {
						en: "Created and maintained the school's website",
						es: 'Creé y mantuve el sitio web de la escuela',
					},
				},
				{
					text: {
						en: "Collaborated with the school's development team",
						es: 'Colaboré con el equipo de desarrollo de la escuela',
					},
				},
			],
			summary: [
				{
					text: {
						en: "I taught programming and web development to students of all ages. I also created and maintained the school's website.",
						es: 'Enseñé programación y desarrollo web a estudiantes de todas las edades. También creé y mantuve el sitio web de la escuela.',
					},
				},
			],
			startedDate: '2021-06-22',
			endDate: null,
		},
	],
} satisfies ProfileInput
/**
 * djb2 over the *raw* data. Hashing the parsed profile wouldn't work: its ids
 * come from `performance.now()`, so they differ on every parse.
 */
function contentHash(input: string): string {
	let h = 5381
	for (let i = 0; i < input.length; i++) {
		h = ((h << 5) + h + input.charCodeAt(i)) | 0
	}
	return (h >>> 0).toString(36)
}

export const strapi = {
	/** Pass the active locale to resolve translatable fields; defaults to English. */
	profile: (locale: Locale = DEFAULT_LOCALE) =>
		localize(profile.parse(data), locale),
	/**
	 * Stable content version, used to cache-bust the generated resume URL so a
	 * previously cached PDF can never outlive an edit to this file.
	 */
	version: () => contentHash(JSON.stringify(data)),
} as const
