import React from "react";
import { Brown, Red } from "./sample-components";

import { Component, Flexbox, View } from "./layout";

import "./styles.css";

export default function App() {
  return (
    <Flexbox column style={{ height: 1000, width: 1200 }}>
      <Flexbox style={{ flex: 1 }} id="jim-bob">
        <Component
          id="cornflowerblue"
          resizeable
          style={{ backgroundColor: "cornflowerblue", flex: 1 }}
        />
        <Component
          id="palegoldenrod"
          resizeable
          style={{ backgroundColor: "palegoldenrod", flex: 1 }}
        />
      </Flexbox>
      <Component
        id="green-footer"
        style={{ backgroundColor: "green", height: 32 }}
      />
    </Flexbox>
  );
}

/*
    <Flexbox column style={{ height: 1000, width: 1200 }}>
      <Flexbox style={{ flex: 1 }} id="jim-bob">
        <View resizeable style={{ minWidth: 50, width: 100 }}>
          <Red style={{ height: "100%" }} />
        </View>
        <Flexbox resizeable column style={{ flex: 1 }}>
          <Flexbox resizeable style={{ flex: 1 }}>
            <View header resizeable style={{ minWidth: 50, width: 150 }}>
              <Brown style={{ height: "100%" }} />
            </View>
            <Component
              id="cornflowerblue"
              resizeable
              style={{ backgroundColor: "cornflowerblue", flex: 1 }}
            />
            <Component
              id="palegoldenrod"
              resizeable
              style={{ backgroundColor: "palegoldenrod", flex: 1 }}
            />
            <Flexbox resizeable column style={{ flex: 1 }}>
              <Component
                id="purple"
                resizeable
                style={{ backgroundColor: "purple", flex: 1 }}
              />
              <Component
                id="lightgrey"
                resizeable
                style={{ backgroundColor: "lightgrey", flex: 1 }}
              />
            </Flexbox>
          </Flexbox>
          <Component
            id="pink"
            resizeable
            style={{ backgroundColor: "pink", flex: 1 }}
          />
          <Component
            id="yellow"
            resizeable
            style={{ backgroundColor: "yellow", flex: 1 }}
          />
        </Flexbox>
      </Flexbox>
      <Component style={{ backgroundColor: "green", height: 32 }} />
    </Flexbox>

*/
