"use client";

import { useEffect, useState } from "react";

const KEY = "adminEditMode";

export function useEditMode() {
  const [editMode, setEditModeState] = useState(false);

  useEffect(() => {
    setEditModeState(localStorage.getItem(KEY) === "true");
  }, []);

  function setEditMode(value: boolean) {
    localStorage.setItem(KEY, String(value));
    setEditModeState(value);
  }

  return { editMode, setEditMode };
}
