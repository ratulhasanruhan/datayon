"use client";

import { useEffect } from "react";

/** কভার-অনলি রুটে সাইট হেডার/ফুটার লুকোয় */
export function MagazineCoverExportMount() {
  useEffect(() => {
    document.body.classList.add("magazine-cover-export");
    return () => document.body.classList.remove("magazine-cover-export");
  }, []);
  return null;
}
