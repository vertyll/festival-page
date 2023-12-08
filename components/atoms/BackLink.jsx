import styled from "styled-components";
import Link from "next/link";

const Back = styled(Link)`
    margin-top: 15px;
    font-weight: bold;
    font-size: 0.9em;
    text-decoration: none;
    color: var(--dark-text-color);
`;

export default function BackLink({link}) {
  return (
    <Back href={link}>&#8592; powrót</Back>
  )
}