import { useState, useEffect } from "react";
import { Button, Checkbox, Flex, Text } from "quantumai-design-system";
import styled from "@emotion/styled";
import Deck from "./components/Deck";
import Header from "./components/Header";
import Content from "./components/Content";

export interface UsersProps {
  id: number | string;
  name: string;
  age: string;
  gender: boolean;
  dateToJoin: string;
  count: number;
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [users, setUsers] = useState<UsersProps[]>([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:4000/db", { method: "GET" });
    const jsonData = await response.json();

    setUsers(jsonData.users);
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers().finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>...Loading</div>;

  return (
    <>
      <Header label="퀀텀 제비 뽑기" />

      <Content>
        <Deck users={users} />
      </Content>
    </>
  );
}

export default App;
