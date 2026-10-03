"use client";

import { useEffect } from "react";
import { initializeSite } from "../lib/site";

export default function SiteInteractions() {
  useEffect(() => initializeSite(), []);
  return null;
}
