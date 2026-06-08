// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    format: 'file',  // produces module1/viz-1-1-counting.html — same URL shape as old site
  },
});
