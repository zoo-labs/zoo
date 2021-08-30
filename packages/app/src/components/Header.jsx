import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/zoo-labs/zoo" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="lab"
        subTitle=""
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
