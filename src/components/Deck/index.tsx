import { Button, Checkbox, Flex, Material } from "quantumai-design-system";
import HumanCard from "../HumanCard";
import { UsersProps } from "../../App";
import { useEffect, useRef, useState } from "react";
import { DeckContainer, DeckFooter, DeckGrid, DeckHeader } from "./styles";
import { gsap } from "gsap";

interface DeckProps {
  users: UsersProps[];
}

const Deck = ({ users, ...props }: DeckProps) => {
  const deckRef = useRef<HTMLDivElement>(null);

  const [selectedUsers, setSelectedUsers] = useState<UsersProps[]>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const [isClickChecked, setIsClickChecked] = useState<boolean>(false);
  const [winnerLength, setWinnerLength] = useState<number>(1);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (isClickChecked) setSelectedUsers(selectedAll ? [...users] : []);
  }, [selectedAll]);

  useEffect(() => {
    if (users.length) setSelectedAll(users.length === selectedUsers.length);
  }, [selectedUsers]);

  const updateSelectedUsers = (user: UsersProps) => {
    if (selectedUsers.includes(user))
      return setSelectedUsers(
        selectedUsers.filter((selectedUser) => user !== selectedUser)
      );
    setSelectedUsers((prev) => [...prev, user]);
  };

  const shuffle = (array: UsersProps[]) => {
    const temporary = [...array];

    for (let i = temporary.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temporary[i], temporary[j]] = [temporary[j], temporary[i]];
    }

    return temporary;
  };

  const fadeOutCards = () => {
    const elements = deckRef.current?.children;
    const selectedUserIds = selectedUsers.map((user) => user.id);

    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        const elementId = elements[i].getAttribute("data-id");

        if (!selectedUserIds.includes(Number(elementId))) {
          const el = elements[i] as HTMLElement;

          gsap.to(el, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      }
    }
  };

  const flipCards = () => {
    const elements = deckRef.current?.children;
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        gsap.to(elements[i], {
          rotationY: 180,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
        });
      }
    }
  };

  const gatherCards = () => {
    const container = deckRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;

      const elements = container.children;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;

        const cardWidth = el.offsetWidth;
        const cardHeight = el.offsetHeight;

        const moveToX = containerWidth / 2 - cardWidth / 2 - el.offsetLeft;
        const moveToY = containerHeight / 2 - cardHeight / 2 - el.offsetTop;

        gsap.to(el, {
          x: moveToX,
          y: moveToY,
          duration: 1.5,
          delay: 1.5,
          ease: "power2.inOut",
        });
      }
    }
  };

  const flipBackCard = (element: HTMLElement) => {
    const flipCard = () => {
      gsap.to(element, {
        rotationY: 0,
        duration: 1,
        ease: "power2.inOut",
      });
    };

    element.addEventListener("click", flipCard);

    return () => {
      element.removeEventListener("click", flipCard);
    };
  };

  const positionCardsBelow = (n: number, winnerIds: (string | number)[]) => {
    const container = deckRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;

      const winnerElements = Array.from(container.children).filter((el) => {
        return winnerIds.includes(Number(el.getAttribute("data-id")));
      });

      for (let i = 0; i < winnerElements.length; i++) {
        const el = winnerElements[i] as HTMLElement;
        const cardWidth = el.offsetWidth;

        const spacing = (containerWidth - n * cardWidth) / (n + 1);
        const moveToX = i * (cardWidth + spacing) + spacing - el.offsetLeft;
        const moveToY = container.offsetHeight - el.offsetHeight - el.offsetTop;

        gsap.to(el, {
          x: moveToX,
          y: moveToY,
          duration: 1.5,
          delay: 0.5 + i * 0.3,
          ease: "power2.inOut",
        });

        flipBackCard(el);
      }
    }
  };

  const handleClick = () => {
    fadeOutCards();
    flipCards();
    gatherCards();

    setIsGameStarted(true);

    const shuffledUsers = shuffle(selectedUsers);
    const selectedWinners = shuffledUsers.slice(0, winnerLength);

    const winnerIds = selectedWinners.map((user) => user.id);

    setTimeout(() => {
      positionCardsBelow(winnerLength, winnerIds);
    }, 3000);
  };

  const handleRestart = () => {
    // setIsGameStarted(false);
    window.location.reload();
  };

  return (
    <DeckContainer>
      <DeckHeader data-opacity={isGameStarted}>
        <Checkbox
          label="전체 선택"
          mr="auto"
          checked={selectedAll}
          onClick={() => setSelectedAll((prev) => !prev)}
          onFocus={() => setIsClickChecked(true)}
          onBlur={() => setIsClickChecked(false)}
        />
        <Material.Input
          type="number"
          label="당첨 인원"
          max={selectedUsers.length - 1}
          min={1}
          value={winnerLength}
          onValue={(value) =>
            winnerLength !== +value && setWinnerLength(+value)
          }
        />
      </DeckHeader>

      <DeckGrid ref={deckRef}>
        {users.map((user) => (
          <HumanCard
            key={user.id}
            userId={user.id}
            isSelected={selectedUsers.includes(user)}
            gender={user.gender}
            name={user.name}
            onClick={() => updateSelectedUsers(user)}
          />
        ))}
      </DeckGrid>

      <DeckFooter>
        <Button
          label={
            isGameStarted
              ? "다시하기"
              : selectedUsers.length < 2
              ? `${selectedUsers.length}명은 너무 적음;`
              : `${selectedUsers.length}명 제비뽑기 고고싱`
          }
          disabled={!isGameStarted && selectedUsers.length < 2}
          onClick={isGameStarted ? handleRestart : handleClick}
        />
      </DeckFooter>
    </DeckContainer>
  );
};

export default Deck;
