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
   * hide or show all email subscribe boxes
   */
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
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
  title: `Pozafly's 블로그`,
  description: '우물쭈물하다 내 이럴줄 알았지🙃',
  coverImage: 'img/common/back.png',
  // coverImage: 'img/blog-cover.png',
  logo: 'img/common/pozafly.png',
  lang: 'ko',
  siteUrl: 'https://pozafly.github.io',
  instagram: 'https://www.instagram.com/pozafly_/',
  github: 'https://github.com/pozafly',
  showSubscribe: false,
  mailchimpAction:
    'https://twitter.us19.list-manage.com/subscribe/post?u=a89b6987ac248c81b0b7f3a0f&amp;id=7d777b7d75',
  mailchimpName: 'b_a89b6987ac248c81b0b7f3a0f_7d777b7d75',
  mailchimpEmailFieldName: 'MERGE0',
  googleSiteVerification: 'GoogleCode',
  footer: 'is based on Gatsby Casper',
  showAllTags: true,
};

export default config;
