import { Text } from "quantumai-design-system";
import { CardBack, CardContainer, CardFront } from "./styles";

interface SelectHumanButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  userId: string | number;
  gender: boolean;
  name: string;
  isSelected: boolean;
}

const HumanCard = ({
  userId,
  gender,
  name,
  isSelected,
  ...props
}: SelectHumanButtonProps) => {
  return (
    <CardContainer data-id={userId} {...props}>
      <CardFront data-active={isSelected}>
        <figure>
          <img src={`public/${gender ? "male" : "female"}-profile.png`} />
          <figcaption>
            <Text type="headline2">{name}</Text>
          </figcaption>
        </figure>
      </CardFront>

      <CardBack>
        <div className="qtLogo"></div>
      </CardBack>
    </CardContainer>
  );
};

export default HumanCard;
