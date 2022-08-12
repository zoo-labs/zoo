import styled from "styled-components";

export const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 16px;
    padding-left: 48px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #0f0f0f;
    color: white;
  }
`;
