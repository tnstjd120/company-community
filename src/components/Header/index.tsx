import { HeaderContainer } from "./styles";
import { Text } from "quantumai-design-system";

interface HeaderProps {
  label: string;
}

const Header = ({ label, ...props }: HeaderProps) => {
  return (
    <HeaderContainer>
      <Text display="block" type="headline1">
        {label}
      </Text>
    </HeaderContainer>
  );
};

export default Header;
