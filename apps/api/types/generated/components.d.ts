import type { Schema, Struct } from '@strapi/strapi';

export interface BasicsLocation extends Struct.ComponentSchema {
  collectionName: 'components_basics_locations';
  info: {
    displayName: 'location';
  };
  attributes: {
    address: Schema.Attribute.String;
    city: Schema.Attribute.String;
    countryCode: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    region: Schema.Attribute.String;
  };
}

export interface BasicsProfile extends Struct.ComponentSchema {
  collectionName: 'components_basics_profiles';
  info: {
    displayName: 'profile';
  };
  attributes: {
    network: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    username: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PostMetadata extends Struct.ComponentSchema {
  collectionName: 'components_post_metadata';
  info: {
    displayName: 'metadata';
    icon: 'bulletList';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Required;
    desc: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'files' | 'images'>;
    posting: Schema.Attribute.Date & Schema.Attribute.Required;
    slug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    tags: Schema.Attribute.Blocks;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProfileBasics extends Struct.ComponentSchema {
  collectionName: 'components_profile_basics';
  info: {
    displayName: 'basics';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    location: Schema.Attribute.Component<'basics.location', false> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    profiles: Schema.Attribute.Component<'basics.profile', true> &
      Schema.Attribute.Required;
    summary: Schema.Attribute.Blocks;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProfileEducation extends Struct.ComponentSchema {
  collectionName: 'components_profile_educations';
  info: {
    displayName: 'education';
  };
  attributes: {
    area: Schema.Attribute.String & Schema.Attribute.Required;
    courses: Schema.Attribute.Blocks;
    endDate: Schema.Attribute.Date;
    institution: Schema.Attribute.String & Schema.Attribute.Required;
    score: Schema.Attribute.String & Schema.Attribute.Required;
    scoreType: Schema.Attribute.String & Schema.Attribute.Required;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
    studyType: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProfileLanguage extends Struct.ComponentSchema {
  collectionName: 'components_profile_languages';
  info: {
    displayName: 'language';
  };
  attributes: {
    fluency: Schema.Attribute.String & Schema.Attribute.Required;
    language: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProfileProject extends Struct.ComponentSchema {
  collectionName: 'components_profile_projects';
  info: {
    displayName: 'project';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<
      [
        'black',
        'white',
        'slate',
        'gray',
        'zinc',
        'neutral',
        'stone',
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'emerald'>;
    desc: Schema.Attribute.String & Schema.Attribute.Required;
    github: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    state: Schema.Attribute.Enumeration<
      ['ACTIVE', 'INACTIVE', 'WIP', 'PRACTICE']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'ACTIVE'>;
    techStack: Schema.Attribute.Relation<'oneToMany', 'api::skill.skill'>;
    url: Schema.Attribute.String;
  };
}

export interface ProfileSkill extends Struct.ComponentSchema {
  collectionName: 'components_profile_skills';
  info: {
    displayName: 'skill';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.Required;
    logo: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ProfileWork extends Struct.ComponentSchema {
  collectionName: 'components_profile_works';
  info: {
    displayName: 'work';
  };
  attributes: {
    endDate: Schema.Attribute.Date;
    highlights: Schema.Attribute.Blocks;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
    startedDate: Schema.Attribute.Date & Schema.Attribute.Required;
    summary: Schema.Attribute.Blocks;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'basics.location': BasicsLocation;
      'basics.profile': BasicsProfile;
      'post.metadata': PostMetadata;
      'profile.basics': ProfileBasics;
      'profile.education': ProfileEducation;
      'profile.language': ProfileLanguage;
      'profile.project': ProfileProject;
      'profile.skill': ProfileSkill;
      'profile.work': ProfileWork;
    }
  }
}
