import { observable, makeObservable, runInAction } from 'mobx';

const markdownContext = require.context('../assets/posts', false, /\.md$/);

export class BlogPostStore {
  @observable blogPosts: BlogPostModel[] = [];

  constructor() {
    makeObservable(this);
    this.loadPosts();
  }

  private async loadPosts() {
    const getModules = (context: __WebpackModuleApi.RequireContext) =>
      context.keys().map(context) as BlogPostModel[];
    const markdownModules: BlogPostModel[] = getModules(markdownContext);

    runInAction(() => {
      this.blogPosts = markdownModules;
    });
  }
}

export class BlogPostModel {
  readonly attributes: FrontMatterSchema;
  readonly body: string;

  constructor(attributes: FrontMatterSchema, body: string) {
    this.body = body;
    this.attributes = attributes;
  }
}

export type FrontMatterSchema = {
  title: string | undefined;
  description: string | undefined;
  date: string | undefined;
  author: string | undefined;
  readtime: string | undefined;
  tags: string[] | undefined;
};

const blogPostStore = new BlogPostStore();
export { blogPostStore };
