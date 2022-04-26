import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
});

export const LoginScreen = () => {
  const login = async (param: { username: string; password: string }) => {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(param),
    });
    if (response.ok) {
      const data = await response.json();
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const username = (evt.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (evt.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
