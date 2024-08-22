import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // alias: {
    //   // 경로 alias를 설정하여 디자인 시스템 경로를 쉽게 참조 가능하게 함
    //   "@design-system": path.resolve(
    //     __dirname,
    //     "../packages/design-system/src"
    //   ),
    // },
    // 확장자를 지정하여 .web.tsx 확장자가 먼저 선택되도록 설정
    extensions: [".tsx", ".ts", ".web.tsx", ".web.ts", ".jsx", ".js"],
  },
});
