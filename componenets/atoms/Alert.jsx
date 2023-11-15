import styled from "styled-components";
import { useEffect } from "react";

const AlertWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${(props) =>
    props.type === "success"
      ? "var(--alert-success-color)"
      : props.type === "danger"
      ? "var(--alert-danger-color)"
      : "var(--alert-default-color)"};
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
`;

export function Alert({ message, onClose, type, duration = 2000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <AlertWrapper type={type}>
      {message}
      <CloseButton onClick={onClose}>&times;</CloseButton>
    </AlertWrapper>
  );
}
