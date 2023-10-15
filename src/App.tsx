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

const UsersContainer = styled(Flex)`
  width: 100vw;
  padding: 20px;

  .animationTarget {
    position: relative;
    background-color: #fff;
    transition: all 0.5s;

    @keyframes effect {
      0% {
        position: relative;
        z-index: 99;
        transform: scale(1);
      }

      20% {
        transform: scale(0);
        filter: blur(10px);
        border-radius: 50%;
        overflow: hidden;
        background-color: #0078fe;
      }

      40% {
        transform: scale(1);
        background-color: #ffc328;
        border-radius: 50%;
        width: 500px;
        height: 500px;
        overflow: hidden;
      }

      41% {
        transform: rotate(0);
        background-color: #ffc328;
        border-radius: 50%;
        overflow: hidden;
      }

      60% {
        background-color: #f32d2d;
        border-radius: 50%;
        overflow: hidden;
      }

      80% {
        transform: rotate(3000deg);
        background-color: #88ef22;
        border-radius: 50%;
        overflow: hidden;
      }

      100% {
        transform: rotate(0);
        border-radius: 50%;
        overflow: hidden;
        width: 500px;
        height: 500px;
      }
    }

    .animationTargetItem {
      transition: opacity 0.5s;
      transition-delay: 1s;
    }

    &[data-effect="true"] {
      @keyframes itemTrueEffect {
        0% {
          opacity: 1;
        }

        50% {
          opacity: 0;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        100% {
          opacity: 1;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 220px;
        }
      }

      @keyframes itemFalseEffect {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }

        51% {
          display: none;
        }
        100% {
          display: none;
        }
      }

      .animationTargetItem {
        &[data-win="true"] {
          animation: itemTrueEffect 3s ease-in-out forwards;
        }

        &[data-win="false"] {
          animation: itemFalseEffect 3s ease-in-out forwards;
        }
      }

      animation: effect 5s ease-in-out forwards;
    }
  }
`;

const InnerWrapper = styled(Flex)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .titleLine {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    width: 100%;
  }
`;
