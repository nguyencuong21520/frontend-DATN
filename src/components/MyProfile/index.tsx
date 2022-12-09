import React from "react";
import { Avatar } from "antd";
import { useGetUser } from "../../utils/Hook";
import { AvatarUser } from "../../assets/img";
import "./style.scss";

export const MyProfile = () => {
  const currentUser = useGetUser();
  return (
    <div className="container-my-profile">
      <div className="top">
        <div className="avatar">
          <Avatar icon={<img src={AvatarUser} alt="avatar" />} size={200} />
        </div>
        <div className="name-info">Học sinh: Trần Cường</div>
      </div>
    </div>
  );
};
