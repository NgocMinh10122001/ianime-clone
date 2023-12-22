import Link from "next/link";
import React from "react";
import "./404.css";

export default function NotFound() {
  return (
    <div className="text-black">
      <h1>404 Error Page</h1>
      <p className="zoom-area">
        <b>CSS</b> animations to make a cool 404 page.{" "}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link href="/layout/home" className="more-link">
          Visit the original article
        </Link>
      </div>
    </div>
  );
}
