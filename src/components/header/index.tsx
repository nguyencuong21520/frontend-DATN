import React from "react";
import { Avatar, Badge, Dropdown, Menu, Space } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { useGetUser } from "../../utils/Hook";
import { ReactComponent as ToolList } from "../../assets/svg/ToolList.svg";
import { ReactComponent as Search } from "../../assets/svg/search.svg";
import { ReactComponent as Bell } from "../../assets/svg/Bell.svg";
import { ReactComponent as AvatarHard } from "../../assets/svg/AvatarHard.svg";
import "./style.scss";

const menu = (
  <Menu
    items={[
      {
        label: <Link to={"/my-profile"}>My Profile</Link>,
        key: "0",
      },
      {
        label: <Link to={"#"}>Edit Profile</Link>,
        key: "1",
      },
    ]}
  />
);

export const Header = () => {
  const currentUser = useGetUser();
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
            <Badge>
              <Avatar shape="circle" size="large" src={currentUser ? currentUser.img as string : ''} />
            </Badge>
          </div>
          <div className="drop-down-account">
            <Dropdown overlay={menu} trigger={["click"]}>
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
                    {currentUser?.role || ''}
                  </i>
                </span>
                <DownOutlined />
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};
