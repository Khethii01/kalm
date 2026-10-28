import { createContext } from "react";
import type { HeadSink } from "./headSink";

/** Provides a HeadSink during static pre-render. null in the browser. */
export const HeadContext = createContext<HeadSink | null>(null);
