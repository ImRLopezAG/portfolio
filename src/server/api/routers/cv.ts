import { createTRPCRouter, publicProcedure } from '@server/api/trpc'
import {
	basics,
	education,
	interests,
	languages,
	projects,
	skills,
	volunteer,
	work,
} from '@shared/cv.json'

export const cvRouter = createTRPCRouter({
	getBasics: publicProcedure.query(() => {
		return basics
	}),
	getEducation: publicProcedure.query(() => {
		return education
	}),
	getInterests: publicProcedure.query(() => {
		return interests
	}),
	getLanguages: publicProcedure.query(() => {
		return languages
	}),
	getProjects: publicProcedure.query(() => {
		return projects
	}),
	getSkills: publicProcedure.query(() => {
		return skills
	}),
	getVolunteer: publicProcedure.query(() => {
		return volunteer
	}),
	getWork: publicProcedure.query(() => {
		return work
	}),
})
