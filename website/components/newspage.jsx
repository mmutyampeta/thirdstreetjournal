"use client";

import React, { useState } from "react";
import { Carousel } from "flowbite-react";
import NewsTile from "./newstile";

export default function NewsPage({ input }) {
  return (
    <>
      <div id="carouselExample" class="carousel slide" className="bg-gray-800">
        <div class="carousel-inner">
          {input.map((item, i) => (
            <div class={i === 0 ? "carousel-item active" : "carousel-item"}>
              <NewsTile input={item} />
            </div>
          ))}
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
