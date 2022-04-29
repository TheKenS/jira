import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import * as qs from "qs";
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "utils/http";

const headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("users").then(setUsers);
  }, []);

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
