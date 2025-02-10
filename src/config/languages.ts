import en from './languages/en.json';
import id from './languages/id.json';
import es from './languages/es.json';
import fr from './languages/fr.json';

export const languages = {
  en,
  id,
  es,
  fr
};

export type LanguageKey = keyof typeof languages;

export interface Language {
  welcome: string;
  createPost: string;
  editPost: string;
  reportPost: string;
  cancel: string;
  post: string;
  saveChanges: string;
  report: string;
  describeViolation: string;
  selectFont: string;
  username: string;
  agreeGuidelines: string;
  startYapping: string;
  skip: string;
  readCommunityGuidelines: string;
  communityGuidelines: string;
  freedomOfExpression: string;
  privacy: string;
  prohibitedContent: string;
  responsibility: string;
  freedomOfExpressionDesc: string;
  privacyDesc: string;
  prohibitedContentDesc: string;
  responsibilityDesc: string;
  noLoginRequired: string;
  noLoginRequiredDesc: string;
  pureExpression: string;
  pureExpressionDesc: string;
  lightningFast: string;
  lightningFastDesc: string;
}
