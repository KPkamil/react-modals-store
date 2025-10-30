import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Allows 'describe', 'it', 'expect' to be used globally
    environment: "jsdom", // Simulates a DOM environment for React
    setupFiles: "./src/tests/setup.ts", // Runs this file before each test
  },
});
