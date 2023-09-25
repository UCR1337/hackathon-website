import Popup from "@/components/admin/Popup";
import React from "react";
import { useState } from "react";

describe("Popup Component", () => {
  it("Open", () => {
    const Parent = () => {
      const [popup, setPopup] = useState({
        title: "Sample Popup",
        text: "This is a test popup.",
        color: "green",
        visible: true,
      });
      const onClick = () => {};

      return (
        <div>
          {popup.visible && (
          <Popup
            popup={popup}
            setPopup={setPopup}
            text="confirm"
            onClick={onClick}
          />
          )}
        </div>
      );
    };

    cy.mount(<Parent />);
    cy.get('[data-cy="popup"]').should("be.visible");
    cy.contains("Sample Popup").should("be.visible");
    cy.contains("This is a test popup.").should("be.visible");
  });

  it("Close", () => {
    const Parent = () => {
      const [popup, setPopup] = useState({
        title: "Sample Popup",
        text: "This is a test popup.",
        color: "green",
        visible: true,
      });

      const onClick = cy.stub();

      return (
        <div>
          {popup.visible && (
          <Popup
            popup={popup}
            setPopup={setPopup}
            text="confirm"
            onClick={onClick}
          />
          )}
        </div>
      );
    };

    cy.mount(<Parent />);
    cy.get('[data-cy="popup"]').should("be.visible");
    cy.get('[data-cy="cancel-button"]').click();
    cy.get('[data-cy="popup"]').should("not.exist");
  });

  it("Confirm", () => {
    const Parent = () => {
      const [popup, setPopup] = useState({
        title: "Sample Popup",
        text: "This is a test popup.",
        color: "green",
        visible: true,
      });

      const onClick = cy.stub();

      return (
        <div>
          {popup.visible && (
          <Popup
            popup={popup}
            setPopup={setPopup}
            text="confirm"
            onClick={onClick}
          />
          )}
        </div>
      );
    };

    cy.mount(<Parent />);
    cy.get('[data-cy="popup"]').should("be.visible");
    cy.get('[data-cy="confirm-button"]').click();
    cy.get('[data-cy="popup"]').should("not.exist");
  });
});
