import mdDark from 'github-markdown-css/github-markdown-dark.css?raw';
import mdLight from 'github-markdown-css/github-markdown-light.css?raw';
import { changeLanguage } from 'i18next';
import prismLight from 'prism-themes/themes/prism-vs.css?raw';
import prismDark from 'prism-themes/themes/prism-vsc-dark-plus.css?raw';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro';
import IconPosts from '~icons/ri/article-line';
import IconProjects from '~icons/ri/function-line';
import IconGithub from '~icons/ri/github-line';
import IconLanguage from '~icons/ri/global-line';
import IconEmail from '~icons/ri/mail-line';
import IconDark from '~icons/ri/moon-line';
import IconSnippets from '~icons/ri/sticky-note-line';
import IconLight from '~icons/ri/sun-line';
import logo from '../favicon.svg'
import useDarkMode, { DarkModeValueContext } from '../hooks/use-dark-mode';
import i18n from '../i18n';
import { loadThemeStyles } from '../utils';
import Footer from '../layout/Footer';
import HeaderNew from '../layout/Header';

const title = import.meta.env.VITE_TITLE;
const email = import.meta.env.VITE_EMAIL;
const githubUrl = import.meta.env.VITE_GITHUB_URL;

const Wrapper = styled.div`
  ${tw`relative pb-16 min-h-screen flex flex-col`},
  
`;

// const Wrapper = styled.div`
//   ${tw`relative pb-16 min-h-screen flex flex-col`}
//   background-color: black; /* Set background color to black */
// `;
const Header = tw.header`h-20 w-full`;

const HeaderCenter = tw.div`mx-auto max-w-screen-lg flex px-8 items-center h-full text-slate-500 font-semibold`;

const TitleLink = styled(Link)`
  ${tw`text-lg`}
`;

const Title = tw.span`mx-0.5 text-blue-500`;

const Nav = tw.nav`grid gap-3 lg:gap-6 grid-flow-col ml-auto leading-5`;

const navItemStyle = tw`  
inline-block
text-2xl
font-thin
px-32 py-2
uppercase
no-underline
transition-all duration-300

hover:(bg-[100%] text-[#ffb900] transform translate-x-4 cursor-pointer)`;

const NavItem = styled.a`
  ${navItemStyle}
`;

const NavLinkItem = styled(NavLink)`
  ${navItemStyle}

  &.active {
    ${tw`opacity-100 text-blue-500`}
  }
`;

const Divider = tw.div`w-[1px] h-full bg-gray-200 dark:bg-gray-800`;

// const Footer = tw.footer`
//   absolute bottom-4 left-0 
//   space-x-2 w-full
//   text-sm text-center text-slate-300
//   select-none
// `;

const FooterCenter = tw.div`mx-auto max-w-screen-lg dark:text-slate-800`;

const NavigationList = tw.ul`
  fixed
  bg-white
  top-1/2 left-1/2
  transition-transform duration-1000 ease-in-out
  transform -translate-x-1/2 -translate-y-1/2
  list-none
  text-center
  w-full
  z-50
  h-screen 
  flex
  flex-col
  justify-center 
  items-center 
  dark:bg-black
`;

const NavigationItem = tw.li`
  my-1
`;
export default function Main() {
  const { t } = useTranslation();

  const [darkModeEnabled, setDarkModelEnabled] = useDarkMode();

  useEffect(() => {
    loadThemeStyles('prism-theme', darkModeEnabled ? prismDark : prismLight);
    loadThemeStyles('markdown-theme', darkModeEnabled ? mdDark : mdLight);
  }, [darkModeEnabled]);

  const onToggleDarkMode = useCallback(() => {
    setDarkModelEnabled(!darkModeEnabled);
  }, [darkModeEnabled]);

  const onToggleLanguage = useCallback(() => {
    changeLanguage(i18n.language === 'cn' ? 'en' : 'cn');
    localStorage.setItem('language', i18n.language);
  }, []);

  return (
    <DarkModeValueContext.Provider value={darkModeEnabled}>
      <Wrapper>
        <HeaderNew >
          <NavigationList>
            <NavLinkItem to="/">
              <NavigationItem>
                <img loading='lazy' width={100} height={100} src={logo} alt='Logo'/>
              </NavigationItem>
            </NavLinkItem>
            <NavLinkItem to="/posts">
              <NavigationItem>
                <span >{t('tab.posts')}</span>
              </NavigationItem>
            </NavLinkItem>
            <NavLinkItem to="/snippets">
              <NavigationItem>
                <span >{t('tab.snippets')}</span>
              </NavigationItem>
            </NavLinkItem>
            <NavLinkItem to="/projects">
              <NavigationItem>
                <span >{t('tab.projects')}</span>
              </NavigationItem>
            </NavLinkItem>
            <NavItem href={`mailto:${email}`}>
              <NavigationItem>
                <span >
                  <IconEmail /></span>
              </NavigationItem>
            </NavItem>
            <NavItem onClick={onToggleLanguage}>
              <NavigationItem>
                <span >
                  <IconLanguage /></span>
              </NavigationItem>
            </NavItem>
            <NavItem onClick={onToggleDarkMode}>
              <NavigationItem>
                <span >
                  {darkModeEnabled ? <IconLight /> : <IconDark />}</span>
              </NavigationItem>
            </NavItem>
          </NavigationList>
        </HeaderNew>
        <Outlet />
      </Wrapper>
      <Footer />
    </DarkModeValueContext.Provider>
  );
}
