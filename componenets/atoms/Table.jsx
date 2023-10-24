import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    font-size: 0.7rem;
  }
  td{
    border-top: 1px solid var(--main-night-color);
  }
`;

export default function Table(props) {
    return <StyledTable {...props} />
}