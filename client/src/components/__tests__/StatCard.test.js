// StatCard.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import StatCard from "../StatCard";

describe("StatCard", () => {
  test("renders the main title and value", () => {
    render(
      <StatCard title="Main Title" value={1234} prefix="$" />
    );

    const titleElement = screen.getByText(/Main Title/i);
    const valueElement = screen.getByText(/\$1234/i);

    expect(titleElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
  });

  test("renders the secondary title and value when provided", () => {
    render(
      <StatCard
        title="Main Title"
        value={1234}
        prefix="$"
        otherTitle="Secondary Title"
        otherValue={5678}
      />
    );

    const secondaryTitleElement = screen.getByText(/Secondary Title/i);
    const secondaryValueElement = screen.getByText(/\$5678/i);

    expect(secondaryTitleElement).toBeInTheDocument();
    expect(secondaryValueElement).toBeInTheDocument();
  });

  test("does not render the secondary title and value when not provided", () => {
    render(
      <StatCard title="Main Title" value={1234} prefix="$" />
    );

    const secondaryTitleElement = screen.queryByText(/Secondary Title/i);
    const secondaryValueElement = screen.queryByText(/\$5678/i);

    expect(secondaryTitleElement).not.toBeInTheDocument();
    expect(secondaryValueElement).not.toBeInTheDocument();
  });
});