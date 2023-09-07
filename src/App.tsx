import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Checkbox, Flex, Text, Toggle } from "quantumai-design-system";
import React, { useState, useEffect } from "react";

interface UsersDataProps {
  id: number | string;
  name: string;
  age: string;
  gender: boolean;
  dateToJoin: string;
  count: number;
}

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [usersData, setUsersData] = useState<UsersDataProps[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UsersDataProps[]>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [isClickChecked, setIsClickChecked] = useState<boolean>(false);
  const [isAnimation, setIsAnimation] = useState<boolean>(false);
  const [winUser, setWinUser] = useState<UsersDataProps>();

  const getUsers = async () => {
    const response = await fetch("http://localhost:4000/db", { method: "GET" });
    const jsonData = await response.json();

    setUsersData(jsonData.users);
  };

  const selectToUsers = (user: UsersDataProps) => {
    if (selectedUsers.includes(user))
      return setSelectedUsers(
        selectedUsers.filter((selectedUser) => user !== selectedUser)
      );
    setSelectedUsers((prev) => [...prev, user]);
  };

  const shuffle = () => {
    const selectedLength = selectedUsers.length;
    const randomIndex = Math.floor(Math.random() * selectedLength);
    shuffleAnimation();
    setWinUser(selectedUsers[Number(randomIndex)]);
    return selectedUsers[Number(randomIndex)]?.name;
  };

  const shuffleAnimation = () => {
    setIsAnimation(true);
    setTimeout(() => {}, 1000);
  };

  useEffect(() => {
    setIsLoading(true);
    getUsers().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isClickChecked) setSelectedUsers(selectedAll ? [...usersData] : []);
  }, [selectedAll]);

  useEffect(() => {
    if (usersData.length)
      setSelectedAll(usersData.length === selectedUsers.length);
  }, [selectedUsers]);

  if (isLoading) return <div>...Loading</div>;

  return (
    <UsersContainer height={"100vh"}>
      <InnerWrapper direction="column" justifyContent="between" height={"100%"}>
        <div className="titleLine">
          <Text display="block" type="headline1">
            퀀텀 제비뽑기
          </Text>

          <Checkbox
            label="전체 선택"
            mr="auto"
            checked={selectedAll}
            onClick={() => setSelectedAll((prev) => !prev)}
            onFocus={() => setIsClickChecked(true)}
            onBlur={() => setIsClickChecked(false)}
          />
        </div>

        <Flex
          data-effect={isAnimation}
          className="animationTarget"
          flexWrap="wrap"
          gap={20}
          data-type="1"
        >
          {usersData.map((user) => (
            <SelectHumanButton
              key={user.id}
              isSelected={selectedUsers.includes(user)}
              isWin={user === winUser}
              gender={user.gender}
              name={user.name}
              onClick={() => selectToUsers(user)}
            />
          ))}
        </Flex>

        {isAnimation ? (
          <Button label="다시하기" onClick={() => window.location.reload()} />
        ) : (
          <Button
            label={
              selectedUsers.length < 2
                ? `${selectedUsers.length}명은 너무 적음;`
                : `${selectedUsers.length}명 제비뽑기 고고싱`
            }
            disabled={selectedUsers.length < 2}
            onClick={shuffle}
          />
        )}
      </InnerWrapper>
    </UsersContainer>
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

const CustomFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  outline: 1px solid #ddd;
  border-radius: 8px;
  transition: ouline 0.4s;
  width: calc(20% - 20px);
  padding: 10px;
  box-sizing: border-box;

  &[data-active="true"] {
    outline: 2px solid #0078fe;
    background-color: #0078fe10;
  }

  &:nth-of-type(5n) {
    width: 20%;
  }

  :hover {
    outline: 2px solid royalblue;
  }

  figure {
    max-width: 120px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      object-fit: cover;
    }
  }
`;

interface SelectHumanButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  gender: boolean;
  name: string;
  isSelected: boolean;
  isWin: boolean;
}

const SelectHumanButton = ({
  gender,
  name,
  onClick,
  isSelected,
  isWin,
}: SelectHumanButtonProps) => {
  return (
    <CustomFlex
      className="animationTargetItem"
      onClick={onClick}
      data-active={isSelected}
      data-win={isWin}
    >
      <figure>
        <img src={`public/${gender ? "male" : "female"}-profile.png`} />
      </figure>
      <Text type="headline2">{name}</Text>
    </CustomFlex>
  );
};
