import { NavLink, Outlet } from "react-router-dom";
import '../layout/layout.css'

export default function Layout() {

    const setActive = ( { isActive } : {isActive: boolean} ) => isActive ? 'activeLink' : '';

    return (
        <>
            <header>
                <div className="header">
                    <NavLink to='/' className='logo'><span>Galery logo</span></NavLink>
                    <div className="header-right">
                        <NavLink to='/' className={setActive}>Home</NavLink>
                        <NavLink to='/albums' className={setActive}>Albums</NavLink>
                        <NavLink to='/about' className={setActive}>About</NavLink>
                        <NavLink to='/contacts' className={setActive}>Contacts</NavLink>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    )
}