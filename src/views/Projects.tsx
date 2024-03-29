import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'twin.macro';

import ProjectItem from '../components/ProjectItem';
import ProjectSkeleton from '../components/ProjectSkeleton';
import useHandling from '../hooks/use-handling';
import ProjectModel from '../models/ProjectModel';
import github, { Direction, RepositorySort, RepositoryType } from '../services/github';
import projectsData from './proects.json'
import useMD from '../hooks/use-md';

const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12`;

const Title = tw.h2`text-2xl text-slate-700`;

const List = tw.div`mt-8 grid grid-cols-1 lg:grid-cols-2 gap-2`;

export default function Projects() {
  const { t } = useTranslation();
  // const [projects, setProjects] = useState<ProjectModel[]>([]);

  // const [loadingProjects, loadProject] = useHandling(
  //   useCallback(async () => {
  //     const list = await github.listRepositories({
  //       type: RepositoryType.All,
  //       sort: RepositorySort.Pushed,
  //       direction: Direction.Desc,
  //       page: 1,
  //       pageSize: 50,
  //     });

  //     setProjects(
  //       list
  //         .map(ProjectModel.from)
  //         .filter((p) => p.stargazersCount > 0 && !p.archived && !p.disabled)
  //         .sort((a, b) => b.stargazersCount - a.stargazersCount),
  //     );
  //   }, []),
  //   true,
  // );

  // useEffect(() => {
  //   loadProject();
  // }, []);

  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const mdData:Array<any> = await useMD('/src/markdowns/projects/project1.md',1);
      const mdData2:Array<any>= await useMD('/src/markdowns/projects/project2.md',2);
      const mdData3 :Array<any>= await useMD('/src/markdowns/projects/project3.md',3);

      const data = [mdData[0] ,mdData2[0] , mdData3[0]]
    const timer = setTimeout(() => {
      setLoadingProjects(false);
      setProjects(data as unknown as ProjectModel[]);

    }, 1000);

    return () => clearTimeout(timer); 
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
