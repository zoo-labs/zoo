import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://cryptozoo.co" target="_blank" rel="noopener noreferrer">
      <PageHeader title="cryptozoo" subTitle="" style={{ cursor: "pointer" }} />
    </a>
  );
}
