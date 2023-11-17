import { normalDate } from "@/utils/date";
import styled from "styled-components";

const StyledOrder = styled.div`
  margin: 2px 0;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color-for-under);
  display: flex;
  gap: 50px;
  align-items: center;
  flex-wrap: wrap;
`;

const Address = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
  color: var(--gray-color);
`;

export default function SingleOrder({ line_items, createdAt, ...rest }) {
  return (
    <StyledOrder>
      <div>
        {normalDate(createdAt)}
        <Address>
          {rest.name}
          <br />
          {rest.email}
          <br />
          {rest.streetAddress}
          <br />
          {rest.postalCode} {rest.city}, {rest.country}
        </Address>
      </div>
      <div>
        {line_items.map((item, index) => (
          <div key={index}>
            <p>
              {item.quantity} x {item.price_data.product_data.name}
            </p>
            <p>{item.price_data.product_data.description}</p>
          </div>
        ))}
      </div>
    </StyledOrder>
  );
}
