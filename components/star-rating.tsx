"use client";

import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

interface Props {
  defaultRating?: number;
  clickHandler?: (rate: number) => void;
  readonly?: boolean;
  showTooltip?: boolean;
  size?: number;
}

export function StarRating({
  defaultRating,
  clickHandler,
  readonly,
  showTooltip,
  size,
}: Props) {
  // Catch Rating value
  const handleRating = (rate: number) => {
    clickHandler && clickHandler(rate);
  };

  return (
    <div
      style={{
        direction: "ltr",
        fontFamily: "sans-serif",
        touchAction: "none",
      }}
      className="-mt-1"
    >
      <Rating
        onClick={handleRating}
        allowFraction
        readonly={readonly}
        initialValue={defaultRating}
        showTooltip={showTooltip}
        size={size || 20}
        tooltipArray={[
          "Terrible",
          "Terrible+",
          "Bad",
          "Bad+",
          "Average",
          "Average+",
          "Great",
          "Great+",
          "Awesome",
          "Awesome+",
        ]}
        transition
      />
    </div>
  );
}
