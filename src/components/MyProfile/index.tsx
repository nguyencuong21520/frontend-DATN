import React from "react";
import { Avatar } from "antd";
import { useGetUser } from "../../utils/Hook";
import { AvatarUser } from "../../assets/img";
import { USER } from "../../global/enum";
import "./style.scss";

export const MyProfile = () => {
  const currentUser = useGetUser();
  return (
    <div className="container-my-profile">
      <div className="top">
        <div className="avatar">
          <Avatar icon={<img src={AvatarUser} alt="avatar" />} size={200} />
        </div>
        <div className="name-info">{USER[currentUser?.role as USER]}: {currentUser?.username}</div>
      </div>
    </div>
  );
};
