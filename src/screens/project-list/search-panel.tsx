/* @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import { Input, Select, Form } from "antd";

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) => {
            setParam({
              ...param,
              name: evt.target.value,
            });
          }}
        />
      </Form.Item>

      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value: string) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => {
            return (
              <Select.Option key={user.id} value={String(user.id)}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
