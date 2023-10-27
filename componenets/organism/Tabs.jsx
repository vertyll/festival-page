import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
    margin: 0 35px;
  }
`;
const StyledTab = styled.span`
  font-size: 1.4rem;
  cursor: pointer;
  ${(props) =>
    props.$active
      ? `
    color:black;
    border-bottom: 2px solid var(--dark-text-color);
  `
      : `
    color: var(--gray-color);
  `}
`;

export default function Tabs({ tabs, active, onChange }) {
  return (
    <StyledTabs>
      {tabs.map((tabName, index) => (
        <StyledTab
          key={index}
          onClick={() => {
            onChange(tabName);
          }}
          $active={tabName === active}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
}
