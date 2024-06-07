import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useContext, useEffect, useRef } from "react";
import UserAvatar from "../../assets/images/user-avatar.png";
import { GiMicroscope } from "react-icons/gi";
import { MdLogin } from "react-icons/md";

import { AuthContext } from "./../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/labs",
    display: "Find a Lab",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  // {
  //   path: "/blogs",
  //   display: "Health Blogs",
  // },
];

const Restricted = ["Find a Doctor", "Services"];

const Header = () => {
  const { user, token, role } = useContext(AuthContext);

  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header ref={headerRef} className="header flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* =========== logo ========== */}
          <Link to="/" className="text-xl text-[#00008B] font-bold flex justify-center items-center gap-1">
            Elite Pathlabs<GiMicroscope className=" text-2xl" />

          </Link>
          {/* ========== nav menu =========== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <>
                  {role === "doctor" && Restricted.includes(link.display) ? (
                    ""
                  ) : (
                    <li key={index}>
                      <NavLink
                        to={link.path}
                        className={(navClass) =>
                          navClass.isActive
                            ? "text-[#0067FF] font-[600] text-[16px] leading-7"
                            : "text-textColor font-[500] text-[16px] leading-7"
                        }
                      >
                        {link.display}
                      </NavLink>
                    </li>
                  )}
                </>
              ))}
              {role === "doctor" ? (
                <NavLink
                  to="/otherdoctors"
                  className={(navClass) =>
                    navClass.isActive
                      ? "text-[#0067FF] font-[600] text-[16px] leading-7"
                      : "text-textColor font-[500] text-[16px] leading-7"
                  }
                >
                  Doctors
                </NavLink>
              ) : (
                ""
              )}
            </ul>
          </div>

          {/* ========= nav right ========== */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${role === "doctor" ? "/doctors/profile/me"
                      : role === "labAdmin" ? "/labdashboard"
                        : "/users/profile/me"
                    } `}
                >
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img
                      className="w-full rounded-full"
                      src={user?.photo || UserAvatar}
                      alt=""
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-buttonBgColor py-2 px-6 rounded-[50px] text-white font-[600] h-[44px] flex items-center justify-center gap-1">
                  Log In<MdLogin />

                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
