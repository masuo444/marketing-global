"use client";

import { useState, useCallback, useEffect } from "react";
import { HistoryEntry } from "@/types";

const STORAGE_KEY = "fomus-history";
const MAX_ENTRIES = 10;

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const addEntry = useCallback((entry: Omit<HistoryEntry, "id" | "timestamp">) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      timestamp: Date.now(),
    };

    setEntries((prev) => {
      const updated = [newEntry, ...prev].slice(0, MAX_ENTRIES);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setEntries([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { entries, addEntry, clearHistory };
}
