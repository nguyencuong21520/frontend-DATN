import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Obj } from "../../global/interface";
import { State } from "../../redux-saga/reducer/reducer";

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};
const useGetUser = () => {
  const getUser = useSelector((state: State) => state.User);
  const currentUser = (getUser?.response as Obj)?.response?.data;
  return currentUser;
};
const getData = (dataState: null | Obj | Record<string, unknown>) => {
  const data = (dataState?.response as Obj)?.response?.data;
  return data;
};
export { useQuery, useGetUser, getData };
