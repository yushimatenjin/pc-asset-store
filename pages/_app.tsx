import React from "react";
import App from "next/app";
import { ModalProvider } from "react-modal-hook";
import "../src/styles/scss/app.scss";

class Page extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    );
  }
}
export default Page;
