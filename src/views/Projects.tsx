import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';
import ProjectItem from '../components/ProjectItem';
import ProjectSkeleton from '../components/ProjectSkeleton';
import ProjectModel from '../models/ProjectModel';
import useMD from '../hooks/use-md';
import { MARKDOWN_BASE_FOLDER, MARKDOWN_PROJECT_FOLDER, MARKDOWN_PROJECT_FILES } from '../markdownConfig';

const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12`;

const Title = tw.h2`text-2xl text-slate-700`;
const List = tw.div`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-2`;

export default function Projects() {
  const { t } = useTranslation();

  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse: ProjectModel[] = [];
        MARKDOWN_PROJECT_FILES.forEach(async (filePath, fileIndex) => {
          const data = await useMD(`${MARKDOWN_BASE_FOLDER + MARKDOWN_PROJECT_FOLDER + '/' + filePath}`, fileIndex + 1);
          projectsResponse.push(data[0]);
        })
        const timer = setTimeout(() => {
          setLoadingProjects(false);
          setProjects(projectsResponse);
        }, 1000);

        return () => clearTimeout(timer);


      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchData();
  }, []);

return (
  <Wrapper>
    <Title>{t('projects.title')}</Title>
    {loadingProjects && (
      <List>
        {Array.from({ length: 10 }).map((_, i) => (
          <ProjectSkeleton key={i} />
        ))}
      </List>
    )}

    {!!projects.length && (
      <List>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </List>
    )}
  </Wrapper>
);
}
