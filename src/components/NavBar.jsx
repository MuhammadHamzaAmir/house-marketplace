import {useNavigate, useLocation} from 'react-router-dom';
import {ReactComponent as OfferIcon} from "../assets/svg/localOfferIcon.svg"
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";




function NavBar() {

    const navigate = useNavigate();
    const location = useLocation();

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true;
        }
    
    }

    return (
      <footer className="navbar">
        <nav className="navbarNav">
          <ul className="navbarListItems">
            <li className="navbarListItem">
              <ExploreIcon
                width="36px"
                height="36px"
                fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}
                onClick={() => navigate("/")}
              />
              <p
                className={
                  pathMatchRoute("/")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Explore
              </p>
            </li>
            <li className="navbarListItem">
              <OfferIcon
                width="36px"
                height="36px"
                fill={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"}
                onClick={() => navigate("/offers")}
              />
              <p
                className={
                  pathMatchRoute("/offers")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }
              >
                Offers
              </p>
            </li>
            <li className="navbarListItem">
              <PersonOutlineIcon
                width="36px"
                height="36px"
                fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
                onClick={() => navigate("/profile")}
              />
              <p className={
                  pathMatchRoute("/profile")
                    ? "navbarListItemNameActive"
                    : "navbarListItemName"
                }>Profile</p>
            </li>
          </ul>
        </nav>
      </footer>
    );
}

export default NavBar