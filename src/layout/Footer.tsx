import tw from 'twin.macro';

const Footer: React.FC = () => {
    const FooterCenter = tw.div`mx-auto max-w-screen-lg dark:text-slate-800`;

    return (
        <footer css={tw`w-full relative overflow-hidden py-36 bg-no-repeat bg-cover h-[400px] md:min-h-[100vh]`}>
            <div css={tw`relative`}>
                <div css={tw`absolute left-1/2 lg:top-[200px] z-20 -translate-x-1/2 translate-y-[68%] md:-translate-y-1/2 min-w-[300px]`}>
                    <FooterCenter>
                        <a tw="hover:text-blue-500" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                            CC BY-NC-SA 4.0
                        </a>
                        <span tw="ml-2">2016-present © varHarrie</span>
                    </FooterCenter>
                </div>
                <div css={tw`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen top-[300px] md:top-[0px] h-[773px] md:h-auto`}>
                    <svg width="100%" viewBox="0 0 1577 4307" fill="none" css={tw`absolute sm:z-10`} xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ffa500">
                            <animate attributeName="d" dur="30s" repeatCount="indefinite" values="M0 356.759V2126H1577V218.07C1514.33 161.85 1445.22 112.053 1369.5 72.4841C993.38 -124.064 412.605 117.161 0 356.759Z; M0 300.446V2126H1577V504.101C1360.04 335.784 1108.8 171.677 918.5 72.2294C571.912 -108.886 269.554 81.8469 0 300.446Z; M0 283.735V2056H1577V317.047C1369.34 129.452 1125.7 -19.1374 918.5 2.22934C525.4 42.7656 247.64 143.295 0 283.735Z; M0 356.759V2126H1577V218.07C1514.33 161.85 1445.22 112.053 1369.5 72.4841C993.38 -124.064 412.605 117.161 0 356.759Z"></animate>
                        </path>
                    </svg>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
