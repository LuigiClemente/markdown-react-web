import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import tw from 'twin.macro';
import ArticleItem from '../components/ArticleItem';
import ArticleSkeleton from '../components/ArticleSkeleton';
import Skeleton from '../components/Skeleton';
import useQuery from '../hooks/use-query';
import ArticleModel from '../models/ArticleModel';
import CategoryModel from '../models/CategoryModel';
import { createQueryURL } from '../utils';
import classes from '../styles/Article.module.css'
import useMD from '../hooks/use-md';
import { MARKDOWN_BASE_FOLDER, MARKDOWN_POST_FILE } from '../markdownConfig';

const Wrapper = tw.main`mx-auto w-full max-w-screen-lg px-8 py-12 mt-6`;

const Title = tw.h2`text-2xl text-slate-600`;
const List = tw.div`mt-8 overflow-y-auto `; 

const Foot = tw.div`mt-8 flex justify-center`;
export type ArticlesProps = {
  milestone: number;
};

function useArticlesQuery() {
  const { labels, page } = useQuery();

  return useMemo(
    () => ({
      labels: labels ?? undefined,
      page: parseInt(page ?? '1', 10),
      pageSize: parseInt(import.meta.env.VITE_ARTICLE_PAGE_SIZE, 10),
    }),
    [labels, page],
  );
}

export default function Articles(props: ArticlesProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const query = useArticlesQuery();
  const [loadingArticles, loadArticles] = useState(false)
  const [category, setCategory] = useState<CategoryModel>();
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const total = category?.articles ?? 0;

  useEffect(() => {
    const fetchData = async () => {
      loadArticles(true);

      const mdData: Array<any> = await useMD(`${MARKDOWN_BASE_FOLDER + MARKDOWN_POST_FILE}`, 1, "posts");

      const timer = setTimeout(() => {
        loadArticles(false);
        setArticles(mdData as unknown as ArticleModel[]);

      }, 1000);

      return () => clearTimeout(timer);
    };

    fetchData();
  }, []);

  const title = useMemo(() => {
    return category ? t(`tab.${category.title.toLowerCase()}` as any) : '';
  }, [category]);

  const location = useLocation();
  const getArticleLink = useCallback((id: number) => `${location.pathname}/${id}`, [location]);

  const getLabelLink = useCallback((labels: string) => {
    return createQueryURL({ labels, page: 1 });
  }, []);

  const onPageChange = useCallback(
    (page: number) => {
      navigate(createQueryURL({ page, labels: query.labels }));
    },
    [query.labels, props.milestone],
  );

  return (
    <Wrapper>
      <Skeleton tw="h-8 w-24">
        <Title>{t('tab.posts')}</Title>
      </Skeleton>

      <List className={classes.List}>
        {loadingArticles
          ? Array.from({ length: 8 }).map((_, i) => <ArticleSkeleton key={i} />)
          : articles.map((article) => (
            <ArticleItem
              key={article.id}
              article={article}
              getLink={getArticleLink}
              getLabelLink={getLabelLink}
            />
          ))}
      </List>
    </Wrapper>
  );
}
