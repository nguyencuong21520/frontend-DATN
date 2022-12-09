import React from "react";
import { Badge, Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Obj } from "../../global/interface";
import { useSelector } from "react-redux";
import { State } from "../../redux-saga/reducer/reducer";
import { ReactComponent as ToolList } from "../../assets/svg/ToolList.svg";
import { ReactComponent as Search } from "../../assets/svg/search.svg";
import { ReactComponent as Bell } from "../../assets/svg/Bell.svg";
import { ReactComponent as AvatarHard } from "../../assets/svg/AvatarHard.svg";
import "./style.scss";
import { Link } from "react-router-dom";

const menu = (
  <Menu
    items={[
      {
        label: <Link to={"/account/my-profile"}>My Profile</Link>,
        key: "0",
      },
      {
        label: <a href="#">Edit Profile</a>,
        key: "1",
      },
    ]}
  />
);

export const Header = () => {
  const getUser = useSelector((state: State) => state.User);
  const currentUser = (getUser?.response as Obj)?.response.data;
  return (
    <div className="container-header">
      <div className="re-search">
        <ToolList className="tool-list" />
        <div className="search">
          <Search />
          <input type="search" placeholder="Search anything" />
        </div>
      </div>
      <div className="notifi-account">
        <Badge count={9}>
          <Bell />
        </Badge>
        <div className="user-account">
          <div className="avatar">
            <AvatarHard />
          </div>
          <div className="drop-down-account">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <span className="name-user">
                    {currentUser?.username as string} <br />
                    <i
                      style={{
                        fontStyle: "normal",
                        fontWeight: "normal",
                        color: "#767278",
                      }}
                    >
                      60TH4
                    </i>
                  </span>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};
