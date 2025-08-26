export default function Navigation() {
    const userRole = localStorage.getItem("role");    
    return (
        <div className="position-absolute w-100 bottom-0 z-3 b-0 p-0 ">
            <nav className="navbar navbar-expand py-0 navigation" style={{ minHeight: '50px' ,borderRadius: '50px 50px 0px 0px' }}>
                <div className="container-fluid">
                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav d-flex justify-content-around align-items-center  w-100">
                            <li className="buttonBar">
                                {userRole === "admin" ? (
                                    <a className="nav-link active" aria-current="page" href="/supposition/readall">
                                        <img src="/assets/plus.png" width={'40px'} alt=""/>
                                    </a>
                                ) : (
                                    <a className="nav-link active" aria-current="page" href="/supposition/create">
                                        <img src="/assets/plus.png" width={'40px'} alt=""/>
                                    </a>
                                )}
                                
                            </li>
                            <li className="buttonBar">
                                <a href="/" className="nav-link active" aria-current="page" style={{textDecorationSkipInk: 'none'}}>
                                <img src="/assets/point.png" height={'40px'} alt=""/>
                                </a>
                            </li>
                            
                            <li className="buttonBar">
                                <a className="nav-link" href="/parameters">
                                    <img src="/assets/user.png" width={'40px'} alt="" srcset="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}