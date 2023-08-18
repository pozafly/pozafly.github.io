export type WebsiteConfig = {
  title: string;
  description: string;
  coverImage?: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  instagram?: string;
  /**
   * full url, no username
   */
  github?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
  /**
   * Shows all post tags in main index view and post view if true
   * Otherwise only shows first (primary) tag
   */
  showAllTags: boolean;
};

const config: WebsiteConfig = {
  title: 'Pozafly Blog',
  description: '기록 여정',
  // NOTE: templates/index.tsx 161 line에도 변경해야 함.
  coverImage: './src/content/img/common/back3.png',
  logo: 'img/common/pozafly.png',
  lang: 'ko',
  siteUrl: 'https://pozafly.github.io',
  instagram: 'https://www.instagram.com/pozafly_/',
  github: 'https://github.com/pozafly',
  googleSiteVerification: 'GoogleCode',
  footer: 'is based on Gatsby Casper',
  showAllTags: true,
};

export default config;
