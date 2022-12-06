import { observable, makeObservable, runInAction } from 'mobx';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import parseFrontMatter from 'remark-parse-yaml';
import remarkGfm from 'remark-gfm';

const markdownPaths = require.context('../assets/posts', false, /\.md$/);

export class BlogPostStore {
  @observable blogPosts: BlogPostModel[] = [];

  constructor() {
    makeObservable(this);
    this.loadPosts();
  }

  private async loadPosts() {
    const markdownModules = markdownPaths.keys().sort().reverse(); // sort by newest firsst
    const markdownFilesContents: string[] = await Promise.all(this.readTexts(markdownModules));
    const blogPosts = await Promise.all(
      markdownFilesContents.map((x) => BlogPostModel.fromRawMarkdown(x)),
    );

    runInAction(() => {
      this.blogPosts = blogPosts;
      console.log(blogPosts);
    });
  }

  private readTexts(paths: string[]): Promise<string>[] {
    return paths.map((x) => fetch(x).then((res) => res.text()));
  }
}

export class BlogPostModel {
  readonly attributes: HeaderData;
  readonly body: string;

  constructor(attributes: HeaderData, body: string) {
    this.body = body;
    this.attributes = attributes;
  }

  static async fromRawMarkdown(rawContent: string) {
    const pipeline = unified()
      .use(remarkParse)
      .use(remarkFrontmatter)
      .use(parseFrontMatter)
      .use(remarkGfm);

    const attributes = pipeline
      .runSync(pipeline.parse(rawContent))
      .children.find((child) => child.type == 'yaml').data.parsedValue as HeaderData;

    const body = rawContent.replace(/---(.|\n)*?---/, ''); // strip off frontmatter
    console.log(body);
    return new BlogPostModel(attributes, body);
  }
}

export interface HeaderData {
  [key: string]: string | string[];
}

const blogPostStore = new BlogPostStore();
export { blogPostStore };
