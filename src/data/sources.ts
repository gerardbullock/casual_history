import { Source } from '../types';

export const featuredSources: Source[] = [
  {
    id: 's1',
    title: 'The Color of Law',
    author: 'Richard Rothstein',
    year: 2017,
    source_type: 'book',
    url: '',
    description: 'Definitive account of how federal, state, and local governments racially segregated metropolitan America through explicit policy, not just private action.',
  },
  {
    id: 's2',
    title: 'Slavery by Another Name',
    author: 'Douglas A. Blackmon',
    year: 2008,
    source_type: 'book',
    url: '',
    description: 'Pulitzer Prize-winning history documenting the re-enslavement of thousands of Black Americans through convict leasing from the Civil War to World War II.',
  },
  {
    id: 's3',
    title: 'The New Jim Crow',
    author: 'Michelle Alexander',
    year: 2010,
    source_type: 'book',
    url: '',
    description: 'Argues that mass incarceration constitutes a new racial caste system that functions analogously to Jim Crow segregation.',
  },
  {
    id: 's4',
    title: 'Stamped from the Beginning',
    author: 'Ibram X. Kendi',
    year: 2016,
    source_type: 'book',
    url: '',
    description: 'National Book Award winner tracing the history of racist ideas in America from their European origins to the present.',
  },
  {
    id: 's5',
    title: 'HOLC Residential Security Maps, 1935–1940',
    author: 'Federal Home Loan Bank Board',
    year: 1940,
    source_type: 'archive',
    url: 'https://dsl.richmond.edu/panorama/redlining/',
    description: 'Primary source maps used to determine mortgage eligibility, now digitized by the Mapping Inequality project at University of Richmond.',
  },
  {
    id: 's6',
    title: 'Just Mercy',
    author: 'Bryan Stevenson',
    year: 2014,
    source_type: 'book',
    url: '',
    description: 'Memoir and legal analysis documenting wrongful convictions, death row, and the structural failures of American criminal justice for Black defendants.',
  },
];

export const discoverySuggestions = [
  {
    question: 'Why do Black neighborhoods have lower home values than white ones with similar incomes?',
    slug: 'redlining-to-wealth-gap',
    theme: 'Housing',
    era: '1930s → Today',
    node_count: 5,
  },
  {
    question: 'How did the U.S. build the world\'s largest prison system in one generation?',
    slug: 'convict-leasing-to-mass-incarceration',
    theme: 'Criminal Justice',
    era: '1865 → Today',
    node_count: 5,
  },
  {
    question: 'Why can\'t the Voting Rights Act stop voter suppression anymore?',
    slug: 'reconstruction-to-voting-rights',
    theme: 'Political Power',
    era: '1865 → Today',
    node_count: 5,
  },
  {
    question: 'Is medical mistrust in Black communities rooted in history?',
    slug: 'medical-racism-to-health-disparities',
    theme: 'Health',
    era: '1845 → Today',
    node_count: 4,
  },
  {
    question: 'How did school desegregation go so wrong?',
    slug: 'school-segregation-to-education-gap',
    theme: 'Education',
    era: '1954 → Today',
    node_count: 5,
  },
  {
    question: 'What happened to Black Wall Street — and why does it matter today?',
    slug: 'tulsa-massacre-to-economic-exclusion',
    theme: 'Economics',
    era: '1921 → Today',
    node_count: 4,
  },
];

export const thenNowIssues = [
  {
    id: 'tn1',
    then: {
      year: '1865',
      title: 'Black Codes',
      description: 'Southern states criminalize unemployment, "vagrancy," and assembly after emancipation to re-subordinate freed people.',
    },
    now: {
      title: 'Broken Windows Policing',
      description: 'Minor quality-of-life offenses — fare evasion, loitering, open containers — become grounds for stops, arrests, and escalation predominantly in Black neighborhoods.',
    },
    thread_slug: 'convict-leasing-to-mass-incarceration',
    theme: 'Criminal Justice',
  },
  {
    id: 'tn2',
    then: {
      year: '1934',
      title: 'Redlining Maps',
      description: 'Federal agencies grade neighborhoods by racial composition, directing investment away from Black communities.',
    },
    now: {
      title: 'Algorithmic Lending Bias',
      description: 'Mortgage algorithms trained on historical data perpetuate geographic exclusion. Black applicants are denied mortgages at twice the rate of white applicants with comparable credit profiles.',
    },
    thread_slug: 'redlining-to-wealth-gap',
    theme: 'Housing',
  },
  {
    id: 'tn3',
    then: {
      year: '1877',
      title: 'Poll Taxes & Literacy Tests',
      description: 'After Reconstruction, Southern states erect procedural barriers specifically designed to disenfranchise Black voters.',
    },
    now: {
      title: 'Voter ID Laws & Polling Place Closures',
      description: 'Since Shelby County v. Holder (2013), states have closed 1,600+ polling places and enacted strict ID requirements in districts with higher Black voter registration.',
    },
    thread_slug: 'reconstruction-to-voting-rights',
    theme: 'Political Power',
  },
  {
    id: 'tn4',
    then: {
      year: '1932',
      title: 'Tuskegee Syphilis Study',
      description: 'U.S. Public Health Service withholds treatment from 399 Black men with syphilis for 40 years to observe disease progression.',
    },
    now: {
      title: 'COVID-19 Vaccine Hesitancy & Mortality Gaps',
      description: 'Black Americans died from COVID-19 at 1.7x the rate of white Americans. Documented medical distrust — rooted in historical exploitation — shaped vaccine uptake disparities.',
    },
    thread_slug: 'medical-racism-to-health-disparities',
    theme: 'Health',
  },
];
