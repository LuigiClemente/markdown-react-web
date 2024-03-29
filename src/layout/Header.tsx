import tw from 'twin.macro';
import { ReactNode, useState } from 'react';
import './navigation.css'
interface NewHeaderProps {
    children?: ReactNode;
}


const HeaderNew: React.FC<NewHeaderProps> = ({ children }) => {
    const [show, toggleShow] = useState(false);
    const handleToggleMenu = () => {
        toggleShow(!show)
    }
    return (
        <div className='navigation__nav' onClick={()=> toggleShow(!show)}>
            <label onClick={handleToggleMenu} className={`navigation__button ${show && 'navOpen'}`}>
                <span className="navigation__icon">&nbsp;</span>
            </label>
            {show &&
                children
            }
            <div className="navigation__background">&nbsp;</div>
        </div>

    )
}

export default HeaderNew;
