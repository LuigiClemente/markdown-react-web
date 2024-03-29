import ArticleModel from "../models/ArticleModel";
import ProjectModel from "../models/ProjectModel";

function getVal(str: string): string  {
    const parts = str.split(":**");
    if (parts.length > 1) {
        const value = parts[1].trim();
        return value;
    } else {
        return "";
    }
}

function extractInfo(str: string): { username: string, fullName: string, email: string } | null {
    const regex = /\[([^[]+)\]\(([^()]+)\)\s*\(([^()]+)\)/;
    const match = str.match(regex);
    if (match && match.length === 4) {
        const fullName = match[1].trim();
        const username = match[2].split('/').pop()?.trim() || '';
        const email = match[3].trim();
        return { username, fullName, email };
    } else {
        return null;
    }
}

function cleanString(str: string): string | undefined {
    if (typeof str !== 'string') return undefined;
    const cleanedString = str.replace(/# /g, '').replace(/\r/g, '');

    return cleanedString;
}

function stringToInteger(str: string ): number | undefined {
    const parsedInt = parseInt(str, 10);

    if (isNaN(parsedInt)) {
        return undefined;
    } else {
        return parsedInt;
    }
}

function extractLabels(str:string) {
    const regex = /<span style="color:(#[a-fA-F\d]{6});">([^<]+)<\/span>/g;
    let match;
    const result = [];
    let id = 1;
    
    while ((match = regex.exec(str)) !== null) {
        const color = match[1];
        const name = match[2];
        result.push({id, name, color});
        id++;
    }
    
    return result;
}


async function useMD(fileUrl: string,index:number,type?:string): Promise<Array<any>> {
    try {
        const response = await fetch(fileUrl);
        const markdownContent = await response.text();
        const repositories = markdownContent.split('---');
        if(type === "posts"){
            const posts: any = repositories.map((repo,index) =>{
                const lines = repo.trim().split('\n');
                const post: any = {};
                post.id = index
                post.number = stringToInteger(getVal(lines[2]))
                post.title = cleanString(lines[0])
                post.body = getVal(lines[1])
                post.comments = stringToInteger(getVal(lines[7]))
                post.labels = extractLabels(lines[3])
                const regex = /\[(.*?)\]\((.*?)\)/;
                const match = lines[4].match(regex);
                if (match && match.length === 3) {
                    const htmlUrl = match[2];
                    post.htmlUrl = htmlUrl;
                }
                post.createdAt =getVal(lines[5])
                post.updatedAt =getVal(lines[6])
                return post;
            })
            return posts;
        }
        else{
            const projects: ProjectModel[] = repositories.map((repo) => {
                const lines = repo.trim().split('\n');
                const project: any = {};
                project.id = index;
                project.owner =  extractInfo(lines[2]);
                project.fullName = cleanString(lines[0])
                const regex = /\[(.*?)\]\((.*?)\)/;
                const match = lines[10].match(regex);
                if (match && match.length === 3) {
                    const name = match[1];
                    const htmlUrl = match[2];
                    project.name = name;
                    project.htmlUrl = htmlUrl;
                }
                project.description = getVal(lines[3])
                project.language = getVal(lines[4])
                project.forksCount = stringToInteger(getVal(lines[5]))
                project.stargazersCount = stringToInteger(getVal(lines[6]))
                project.openIssuesCount = stringToInteger(getVal(lines[7]))
                project.archived = false;
                project.disabled = false;
                project.pushedAt  =getVal(lines[9])
                project.createdAt =getVal(lines[8])
                project.updatedAt =getVal(lines[9])
                return project;
            });
            return projects;
        }
    } catch (error) {
        console.error('Error in useMD Hook:', error);
        throw error;
    }
}

export default useMD;
