import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import ChangePassWord from "./ChangePassWord";
import "./Cronjob.css";
import PersonalInfo from "./PersonalInfo";

function CronJob() {
  return (
    <>
      {" "}
      <section className=" m-3 px-4">
        <Container className=" pb-4 dashboard__wrapper">
          <h3> Profile Info</h3>

          <Tabs
            defaultActiveKey="details"
            id="fill-tab-example"
            className="rounded-pill  mb-3 mx-auto "
            fill
          >
            <Tab eventKey="details" title="Personal Details">
              <PersonalInfo />
            </Tab>
            <Tab eventKey="password" title="Change Password">
              <ChangePassWord />
            </Tab>
          </Tabs>
        </Container>
      </section>
    </>
  );
}

export default CronJob;
