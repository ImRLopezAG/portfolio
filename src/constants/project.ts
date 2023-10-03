import type { Projects } from '@/types'

export const PROJECTS: Projects[] = [
  {
    title: 'Pokedex',
    tech: 'JavaScript',
    description:
      'A simple website that allows you manage CRUD operations on your Pokedex and has some pokemons by default.',
    repo: 'Pokedex-Manager',
    techs: ['JavaScript', 'SQL', 'Sequelize', 'Node', 'Express', 'Bootstrap'],
    images: ['/web/pokedex.png']
  },
  {
    title: 'Gifts App',
    tech: 'React',
    description: 'An app to search for gifts using the Giphy API.',
    repo: 'Gif-expert-app',
    techs: ['React', 'TailwindCss'],
    images: ['/web/gif.png']
  },
  {
    title: 'Medical Manager',
    tech: '.Net',
    description:
      'This web app allows you to manage a medical center with patients, doctors and appointments.',
    repo: 'MedicalManager',
    techs: ['.Net', 'SQL', 'C-Sharp', 'Bootstrap']
  },
  {
    title: 'Social Network',
    tech: '.Net',
    description:
      'A social network that allows you to create posts, comments and add friends.',
    repo: 'SocialNetworkApp-ASP.Net',
    techs: ['.Net', 'SQL', 'C-Sharp', 'Bootstrap'],
    images: [
      '/web/social.jpg',
      '/web/social-1.jpg',
      '/web/social-2.jpg',
      '/web/social-3.jpg'
    ]
  },
  {
    title: 'Movies app',
    tech: 'Flutter',
    description:
      'A simple movies app using the TMDB API to show the recent movies and shows',
    repo: 'movies_app',
    techs: ['Dart', 'Flutter'],
    images: ['/mobile/movie.jpg', '/mobile/movie-1.jpg']
  },
  {
    title: 'Air Estate',
    tech: '.Net',
    description:
      'This project allows you to manage a real estate agency, create properties and clients.',
    repo: 'Real-Estate-App',
    techs: ['.Net', 'SQL', 'C-Sharp', 'Bootstrap', 'TailwindCss']
  },
  {
    title: 'TS Api Template',
    tech: 'TypeScript',
    description:
      'A typescript api template that makes your development easier using generic repositories and services with dependency injection, a simple authentication system and with support for SQL and NoSQL databases.',
    repo: 'Ts-Api-Template',
    techs: ['TypeScript', 'MongoDb', 'SQL', 'Express', 'Node'],
    images: ['/web/ts-api.jpg', '/web/ts-api-1.jpg']
  },
  {
    title: 'Todo app',
    tech: 'Flutter',
    description: 'A simple todo app using sqlite to manage the data',
    repo: 'todo_app',
    techs: ['Dart', 'Flutter', 'SQL'],
    images: ['/mobile/todo.jpg', '/mobile/todo-1.jpg', '/mobile/todo-2.jpg']
  },
  {
    title: 'Clients App',
    tech: 'Flutter',
    description:
      'This app allows you to manage your clients and its contact information using a php server.',
    repo: 'Clients-app',
    techs: ['Dart', 'Flutter', 'SQL'],
    images: ['/mobile/client.jpg', '/mobile/client-1.jpg']
  },
  {
    title: 'Scientific Calculator',
    tech: 'Flutter',
    description: 'A simple scientific calculator',
    repo: 'sci_calculator',
    techs: ['Dart', 'Flutter'],
    images: ['/mobile/calculator.jpg', '/mobile/calculator-1.jpg']
  },
  {
    title: 'Cash Banking',
    tech: 'Flutter',
    description:
      'This is a mvp of a banking app that allows you to manage money as a bank.',
    repo: 'InternetBanking-Project',
    techs: [
      'Dart',
      'Flutter',
      'MongoDb',
      'Express',
      'Node',
      'React',
      'TailwindCss',
      'TypeScript'
    ],
    images: ['/mobile/banking.jpg', '/mobile/banking-1.jpg']
  },
  {
    title: 'Tech Path',
    tech: 'NextJs',
    description:
      'This project was created to upgrade the performance of students scores web page of the university where I study, in the backend I used Apollo Server with GraphQL.',
    repo: 'tech-path',
    techs: ['NextJs', 'React', 'TailwindCss', 'Express', 'TypeScript']
  },
  {
    title: 'Forget',
    tech: 'React',
    description:
      'This is a E-commerce app that allows you to buy and sell products.',
    repo: 'Forget-Project',
    techs: [
      'React',
      'TailwindCss',
      '.Net',
      'C-Sharp',
      'TypeScript',
      'MongoDb',
      'SQL',
      'Express',
      'Node'
    ],
    images: [
      '/web/forget.png',
      '/web/forget-1.png',
      '/web/forget-2.png',
      '/web/forget-3.png'
    ]
  }
]
