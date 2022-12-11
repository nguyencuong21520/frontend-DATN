import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USER } from "../../global/enum";
import { useGetUser } from "../../utils/Hook";
import { UserAction } from "../../redux-saga/user/action";
import { USER_LOGOUT_CLEAR } from "../../redux-saga/user/reducer";
import { ReactComponent as Ellipse1 } from "../../assets/svg/Ellipse1.svg";
import { ReactComponent as Vector1 } from "../../assets/svg/Vector1.svg";
import { ReactComponent as Polygon1 } from "../../assets/svg/Polygon1.svg";
import { ReactComponent as Tluc } from "../../assets/svg/Tluc.svg";
import { ReactComponent as Rectangle1 } from "../../assets/svg/Rectangle1.svg";
import { ReactComponent as Homepage } from "../../assets/svg/Homepage.svg";
import { ReactComponent as ListCources } from "../../assets/svg/ListCources.svg";
import { ReactComponent as Mess } from "../../assets/svg/Mess.svg";
import { ReactComponent as Headset } from "../../assets/svg/Headset.svg";
import { ReactComponent as Settings } from "../../assets/svg/Settings.svg";
import { ReactComponent as User } from "../../assets/svg/User.svg";
import { ReactComponent as Leave } from "../../assets/svg/Leave.svg";
import { Users } from "../../assets/img";
import "./style.scss";

interface NavigationBar {
  icon: React.ReactElement;
  title: string;
  key: string;
  route: string;
}
enum Page {
  HOME_PAGE = "HOME_PAGE",
  COURSES = "COURSES",
  MESS = "MESS",
  SUPPORT = "SUPPORT",
  SETTING = "SETTING",
  ACCOUNT = "ACCOUNT",
  LOGOUT = "LOGOUT",
  DASHBOARD = "DASHBOARD",
  STUDENTS = "STUDENTS",
}
const navigation: Array<NavigationBar> = [
  {
    icon: <Homepage className="icon-cpn" />,
    title: "Trang chủ",
    key: Page.HOME_PAGE,
    route: "",
  },
  {
    icon: <ListCources className="icon-cpn" />,
    title: "Khoá học của tôi",
    key: Page.COURSES,
    route: "cources",
  },
  {
    icon: <Mess className="icon-cpn" />,
    title: "Tin nhắn",
    key: Page.MESS,
    route: "messenger",
  },
  {
    icon: <Headset className="icon-cpn" />,
    title: "Hỗ trợ",
    key: Page.SUPPORT,
    route: "support",
  },
  {
    icon: <Settings className="icon-cpn" />,
    title: "Cài đặt",
    key: Page.SETTING,
    route: "setting",
  },
  {
    icon: <User className="icon-cpn" />,
    title: "Tài khoản",
    key: Page.ACCOUNT,
    route: "my-profile",
  },
  {
    icon: <Leave className="icon-cpn" />,
    title: "Đăng xuất",
    key: Page.LOGOUT,
    route: "/account/login",
  },
];

const navigationForTeacher: Array<NavigationBar> = [
  {
    icon: <Homepage className="icon-cpn" />,
    title: "Lớp học của tôi",
    key: Page.HOME_PAGE,
    route: "manager/courses",
  },
  {
    icon: <Mess className="icon-cpn" />,
    title: "Tin nhắn",
    key: Page.MESS,
    route: "messenger",
  },
  {
    icon: <Settings className="icon-cpn" />,
    title: "Cài đặt",
    key: Page.SETTING,
    route: "setting",
  },
  {
    icon: <Leave className="icon-cpn" />,
    title: "Đăng xuất",
    key: Page.LOGOUT,
    route: "/account/login",
  },
];
const navigationForAdmin: Array<NavigationBar> = [
  {
    icon: <Homepage className="icon-cpn" />,
    title: "Dashboard",
    key: Page.DASHBOARD,
    route: "admin/dashboard",
  },
  {
    icon: <ListCources className="icon-cpn" />,
    title: "Danh sách khoá học",
    key: Page.COURSES,
    route: "admin/collection/courses",
  },
  {
    icon: <img src={Users} alt="user" className="icon-user" />,
    title: "Danh sách tài khoản",
    key: Page.STUDENTS,
    route: "admin/collection/users",
  },
  {
    icon: <Mess className="icon-cpn" />,
    title: "Tin nhắn",
    key: Page.MESS,
    route: "admin/messenger",
  },
];

export const SideBar = () => {
  const [currentPage, setCurrentPage] = useState<string>(Page.HOME_PAGE);
  const navigate = useNavigate();
  const currentRoute = useLocation();
  const dispatch = useDispatch();
  const currentUser = useGetUser();
  useEffect(() => {
    setCurrentPage(
      currentRoute.pathname.slice(1, currentRoute.pathname.length)
    );
  }, [currentRoute]);
  const handleSwitchPage = (page: string) => {
    setCurrentPage(page);
  };
  const userLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(
      UserAction({
        type: USER_LOGOUT_CLEAR,
      })
    );
  };
  return (
    <div className="side-bar">
      <div className="icon-nav">
        <div className="icon-top">
          <div className="icon-left">
            <Ellipse1 className="elip" />
            <Vector1 className="cirlce" />
          </div>
          <div className="icon-right">
            <Polygon1 />
          </div>
        </div>
        <div className="logo">
          <Tluc />
        </div>
        <div className="rectangle1">
          <Rectangle1 />
        </div>
        <div className="part-top">
          <div className="top">
            {currentUser?.role === USER.STUDENT
              ? navigation.slice(0, 5).map((item) => {
                return (
                  <div
                    className={`nav-item ${currentPage === item.route ? "actived" : null
                      }`}
                    key={item.title}
                    onClick={() => {
                      handleSwitchPage(item.key);
                      navigate(item.route, { replace: true });
                    }}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                );
              })
              : currentUser?.role === USER.TEACHER
                ? navigationForTeacher.map((item) => {
                  return (
                    <div
                      className={`nav-item ${currentPage === item.route ? "actived" : null
                        }`}
                      key={item.title}
                      onClick={() => {
                        handleSwitchPage(item.key);
                        navigate(item.route, { replace: true });
                      }}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  );
                })
                : navigationForAdmin.map((item) => {
                  return (
                    <div
                      className={`nav-item ${currentPage === item.route ? "actived" : null
                        }`}
                      key={item.title}
                      onClick={() => {
                        handleSwitchPage(item.key);
                        navigate(item.route, { replace: true });
                      }}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
      <div className="navigation-bar">
        <div className="part-bottom">
          <div className="bottom">
            {navigation.slice(5, navigation.length).map((item) => {
              return (
                <div
                  className={`nav-item ${currentPage === item.route ? "actived" : null
                    }`}
                  key={item.title}
                  onClick={() => {
                    handleSwitchPage(item.key);
                    if (item.key === Page.LOGOUT) {
                      userLogout();
                    }
                    navigate(item.route, { replace: true });
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
