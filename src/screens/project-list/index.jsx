import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import * as qs from "qs";
import { cleanObject } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

const headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}/users`, {
        method: "GET",
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsers(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${apiUrl}/projects?${qs.stringify(cleanObject(param))}`
      );
      if (response.ok) {
        const data = await response.json();
        setList(data);
      }
    };
    fetchData();
  }, [param]);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
