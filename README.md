# A11y WCAG Game (Angular)

เรียนรู้ Web Accessibility ตามมาตรฐาน WCAG 2.2 ผ่านมินิเกม 10 ด่าน สะสม 100 คะแนน สร้างด้วย Angular 17

## ต้องมีพร้อมก่อนเริ่ม
- Node.js 18.13 ขึ้นไป (แนะนำ LTS)
- npm 9 ขึ้นไป

## เริ่มต้นใช้งาน
- ติดตั้งแพ็กเกจ: `npm install`
- โหมดพัฒนา: `npm start` แล้วเปิด `http://localhost:4200/`
- ตรวจสอบโค้ด: `npm run lint`
- รันทดสอบ: `npm test`

## สคริปต์ที่ใช้บ่อย
- `npm start` — รัน dev server ด้วย Angular CLI
- `npm run build` — สร้างไฟล์สำหรับ production ที่ `dist/a11y-wcag-game`
- `npm test` — รันทดสอบด้วย Jasmine/Karma
- `npm run lint` — ตรวจสอบโค้ดด้วย Angular ESLint (ผ่าน CLI)

หมายเหตุ: สามารถใช้ `npx ng <command>` ได้เช่นกัน หากไม่ได้ติดตั้ง Angular CLI แบบ global

## โครงสร้างโปรเจกต์โดยย่อ
- `src/` — ซอร์สโค้ดหลักของแอป
- `angular.json` — การตั้งค่า Angular workspace และการ build
- `tsconfig*.json` — การตั้งค่า TypeScript
- `dist/` — โฟลเดอร์ผลลัพธ์หลัง build (ถูก ignore ใน git)

## การ build และ deploy
- สร้าง production build: `npm run build` หรือ `ng build -c production`
- ไฟล์ผลลัพธ์จะอยู่ที่ `dist/a11y-wcag-game` พร้อมสำหรับนำไป deploy บน static hosting

## ใบอนุญาต

