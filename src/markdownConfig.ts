export const MARKDOWN_BASE_FOLDER = process.env.MARKDOWN_BASE_FOLDER ? process.env.MARKDOWN_BASE_FOLDER : '/src/markdowns/';
export const MARKDOWN_PROJECT_FOLDER = process.env.MARKDOWN_PROJECT_FOLDER ? process.env.MARKDOWN_PROJECT_FOLDER : 'projects';
export const MARKDOWN_PROJECT_FILES = process.env.MARKDOWN_PROJECT_FILES ? process.env.MARKDOWN_PROJECT_FILES.split(','): ['project1.md','project2.md','project3.md' ];
export const MARKDOWN_POST_FILE = process.env.MARKDOWN_POST_FILE ? process.env.MARKDOWN_POST_FILE : 'posts.md';
