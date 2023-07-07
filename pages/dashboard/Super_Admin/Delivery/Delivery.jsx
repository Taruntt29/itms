import React from "react";
import { Button, Container, Tab, Tabs } from "react-bootstrap";
import BlueDart from "./BlueDart";
import "./Delivery.css";
import SafeX from "./SafeX";
import { useOutletContext } from "react-router-dom";

function Delivery() {
  const [outletContext] = useOutletContext();
  return (
    <>
      {" "}
      <section className=" m-3 px-4">
        <Container className=" pb-4 dashboard__wrapper">
          <div className="d-flex justify-content-between">
            <h3> Delivery Partner</h3>
            <Button
              variant="dark"
              onClick={() => {
                outletContext.setActiveTab(39);
              }}
            >
              Cancel
            </Button>
          </div>

          <br />
          <Tabs
            defaultActiveKey="details"
            id="fill-tab-example"
            className="rounded-pill  mb-3 mx-auto "
            fill
          >
            <Tab eventKey="details" title="BlueDart">
              <BlueDart />
            </Tab>
            <Tab eventKey="password" title="SafeX">
              <SafeX />
            </Tab>
          </Tabs>
        </Container>
      </section>
    </>
  );
}

export default Delivery;
