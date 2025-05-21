# JavaScript modules

## Previous  
คู่มือนี้ให้ทุกสิ่งที่คุณต้องการเพื่อเริ่มต้นกับไวยากรณ์ของ JavaScript module

## A background on modules  
โปรแกรม JavaScript เริ่มต้นจากขนาดเล็กมาก — ในช่วงแรกๆ มักใช้ทำสคริปต์แบบแยกส่วน เพื่อเพิ่มความโต้ตอบให้กับหน้าเว็บในจุดที่จำเป็น ดังนั้นโดยทั่วไปแล้วไม่จำเป็นต้องมีสคริปต์ขนาดใหญ่  
ผ่านไปไม่กี่ปี เราก็มีแอปพลิเคชันเต็มรูปแบบที่ทำงานในเบราว์เซอร์โดยใช้ JavaScript จำนวนมาก รวมถึงการใช้งาน JavaScript ในบริบทอื่น ๆ (เช่น Node.js)

โปรเจกต์ที่ซับซ้อนจำเป็นต้องมีวิธีแยกโปรแกรม JavaScript ออกเป็นโมดูลที่สามารถนำเข้าได้ตามต้องการ  
Node.js รองรับความสามารถนี้มานานแล้ว และยังมีไลบรารีกับเฟรมเวิร์กจำนวนมากที่ช่วยให้สามารถใช้งานโมดูลได้ (เช่น ระบบโมดูลแบบ CommonJS และ AMD อย่าง RequireJS, webpack, และ Babel)

เบราว์เซอร์สมัยใหม่ทุกรุ่นรองรับฟีเจอร์โมดูลโดยตรงโดยไม่ต้องแปลงโค้ดล่วงหน้า (transpile)  
ถือเป็นข้อดี — เบราว์เซอร์สามารถเพิ่มประสิทธิภาพในการโหลดโมดูล ทำให้รวดเร็วกว่าการใช้ไลบรารีที่ต้องประมวลผลฝั่ง client และต้องร้องขอข้อมูลหลายรอบ  
แต่นั่นไม่ได้ทำให้ bundler อย่าง webpack หมดความจำเป็น — bundler ยังจัดการแบ่งโค้ดเป็นชิ้นส่วนที่เหมาะสมได้ดี และยังทำการปรับปรุงอื่น ๆ เช่น ย่อขนาดไฟล์ ลบโค้ดที่ไม่ใช้ และ tree-shaking

## Introducing an example  
เพื่อแสดงการใช้งานของโมดูล เราได้สร้างชุดตัวอย่างไว้ ซึ่งคุณสามารถดูได้บน GitHub  
ตัวอย่างเหล่านี้แสดงชุดของโมดูลที่สร้าง element `<canvas>` บนหน้าเว็บ แล้วทำการวาด (และรายงานข้อมูลเกี่ยวกับ) รูปร่างต่าง ๆ บน canvas

ตัวอย่างอาจดูง่าย แต่ตั้งใจให้เรียบง่ายเพื่อแสดงการทำงานของโมดูลอย่างชัดเจน
## Basic example structure  
ในตัวอย่างแรกของเรา (ดูที่ basic-modules) เรามีโครงสร้างไฟล์ดังนี้:
```
index.html  
main.js  
modules/  
  canvas.js  
  square.js
```
## The modules directory's two modules are described below:

**canvas.js** — มีฟังก์ชันที่เกี่ยวข้องกับการตั้งค่า canvas:

- `create()` — สร้าง canvas ที่มีความกว้างและความสูงตามที่กำหนดไว้ภายใน `<div>` ตัวหนึ่งที่มี ID ที่ระบุไว้ ซึ่งจะถูกเพิ่มเข้าไปใน element แม่ที่กำหนดไว้เช่นกัน ฟังก์ชันนี้จะคืนค่า object ที่มี context แบบ 2D ของ canvas และ ID ของ wrapper นั้น
- `createReportList()` — สร้างรายการแบบ unordered list ที่ถูกเพิ่มเข้าไปใน wrapper element ที่กำหนดไว้ ซึ่งสามารถใช้สำหรับแสดงผลข้อมูลรายงาน ฟังก์ชันนี้จะคืนค่า ID ของ list นั้น

**square.js** — ประกอบด้วย:

- `name` — ค่าคงที่ (constant) ที่เก็บสตริง `'square'`
- `draw()` — วาดสี่เหลี่ยมจัตุรัสลงบน canvas ที่ระบุไว้ โดยกำหนดขนาด, ตำแหน่ง และสี ฟังก์ชันนี้จะคืนค่า object ที่มีขนาด, ตำแหน่ง, และสีของสี่เหลี่ยมจัตุรัสนั้น
- `reportArea()` — เขียนค่าพื้นที่ของสี่เหลี่ยมจัตุรัสลงใน list รายงานที่ระบุ โดยใช้ความยาวของด้าน
- `reportPerimeter()` — เขียนค่าความยาวรอบรูปของสี่เหลี่ยมจัตุรัสลงใน list รายงานที่ระบุ โดยใช้ความยาวของด้าน

## Aside — .mjs versus .js  
ตลอดบทความนี้ เราใช้ไฟล์นามสกุล `.js` สำหรับไฟล์โมดูล แต่ในแหล่งข้อมูลอื่น ๆ คุณอาจเห็นว่าใช้ `.mjs` แทน (เช่นในเอกสารของ V8 ที่แนะนำแบบนี้)  
เหตุผลที่ให้ไว้คือ:

- เพื่อความชัดเจนว่าไฟล์ไหนคือโมดูล และไฟล์ไหนคือ JavaScript ทั่วไป
- เพื่อให้แน่ใจว่าไฟล์โมดูลของคุณจะถูกแยกแยะและประมวลผลเป็น module อย่างถูกต้องใน runtime อย่าง Node.js หรือใน build tools อย่าง Babel

อย่างไรก็ตาม เราตัดสินใจใช้ `.js` ต่อไปก่อน อย่างน้อยในตอนนี้  
การจะให้โมดูลทำงานได้ในเบราว์เซอร์ ต้องมั่นใจว่าเซิร์ฟเวอร์ส่ง header `Content-Type` ที่มี MIME type ของ JavaScript เช่น `text/javascript`  
หากไม่ตั้งไว้ เบราว์เซอร์จะแจ้งข้อผิดพลาด MIME ว่า "The server responded with a non-JavaScript MIME type" และจะไม่รัน JavaScript

เซิร์ฟเวอร์ส่วนใหญ่จะตั้ง type ให้กับ `.js` อย่างถูกต้องอยู่แล้ว แต่สำหรับ `.mjs` ยังไม่แน่เสมอ  
เซิร์ฟเวอร์ที่สามารถให้บริการ `.mjs` ได้อย่างถูกต้อง เช่น GitHub Pages และ `http-server` ของ Node.js

กรณีที่คุณใช้ environment ที่รองรับอยู่แล้ว หรือสามารถตั้งค่าเซิร์ฟเวอร์เองได้ (เช่นกำหนด MIME type ให้กับ `.mjs`) ก็ไม่มีปัญหา  
แต่อาจเกิดความสับสนได้ หากคุณไม่สามารถควบคุมเซิร์ฟเวอร์ที่ให้บริการไฟล์เหล่านี้ หรือหากเผยแพร่ไฟล์ให้ผู้อื่นใช้ เช่นเดียวกับกรณีของเรา

**ด้วยเหตุผลด้านการเรียนรู้และความสะดวกในการพกพา (portability) เราจึงเลือกใช้ `.js` ต่อไป**

หากคุณให้ความสำคัญกับความชัดเจนในการใช้ `.mjs` สำหรับโมดูล และ `.js` สำหรับโค้ดปกติ  
แต่ไม่อยากเจอปัญหา MIME ข้างต้น คุณอาจพัฒนาโดยใช้ `.mjs` แล้วแปลงเป็น `.js` ระหว่างขั้นตอน build ก็ได้

**เพิ่มเติม:**

- เครื่องมือบางตัวอาจไม่รองรับ `.mjs` เลย
- ใช้ attribute `<script type="module">` เพื่อระบุว่า script นั้นคือโมดูล (ดูตัวอย่างด้านล่าง)

## Exporting module features  
สิ่งแรกที่ต้องทำเพื่อให้ใช้คุณสมบัติของ module ได้คือการ `export`  
ใช้คำสั่ง `export` เพื่อส่งออกฟีเจอร์จาก module

วิธีที่ง่ายที่สุดคือใส่ `export` หน้ารายการที่คุณต้องการส่งออก เช่น:
```
export const name = "square";

export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return { length, x, y, color };
}
```
คุณสามารถ export ฟังก์ชัน, var, let, const และ — อย่างที่เราจะเห็นภายหลัง — คลาสได้  
พวกมันจำเป็นต้องอยู่ในระดับบนสุด: ตัวอย่างเช่น คุณไม่สามารถใช้ export ภายในฟังก์ชันได้

วิธีที่สะดวกกว่าสำหรับการ export รายการทั้งหมดที่คุณต้องการ export คือการใช้คำสั่ง export เดียวตอนท้ายของไฟล์โมดูล  
โดยตามด้วยรายการฟีเจอร์ที่คุณต้องการ export แบบคั่นด้วยจุลภาคและอยู่ภายในวงเล็บปีกกา  
ตัวอย่างเช่น:
```
export { name, draw, reportArea, reportPerimeter };
```
## การนำเข้าฟีเจอร์เข้าสู่สคริปต์ของคุณ  
เมื่อคุณได้ export ฟีเจอร์บางอย่างออกจากโมดูลของคุณแล้ว คุณจำเป็นต้อง import มันเข้าสู่สคริปต์ของคุณเพื่อที่จะสามารถใช้งานได้  
วิธีที่ง่ายที่สุดในการทำสิ่งนี้คือดังนี้:
```
import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
```
คุณใช้คำสั่ง import ตามด้วยรายการฟีเจอร์ที่คุณต้องการ import คั่นด้วยจุลภาคและอยู่ในวงเล็บปีกกา  
ตามด้วยคีย์เวิร์ด from แล้วตามด้วยตัวระบุโมดูล (module specifier)

ตัวระบุโมดูลจะให้สตริงที่ JavaScript environment สามารถแก้ให้กลายเป็น path ไปยังไฟล์โมดูล  
ในเบราว์เซอร์ path นี้อาจเป็น path ที่สัมพันธ์กับ root ของเว็บไซต์  
ซึ่งในตัวอย่าง basic-modules ของเราก็คือ /js-examples/module-examples/basic-modules  
อย่างไรก็ตาม ที่นี่เราจะใช้ไวยากรณ์ dot (.) แทนเพื่อหมายถึง “ตำแหน่งปัจจุบัน”  
แล้วตามด้วย path แบบ relative ไปยังไฟล์ที่เราพยายามจะหา  
วิธีนี้ดีกว่าการเขียน path แบบ absolute ทุกครั้ง เพราะ path แบบ relative สั้นกว่าและทำให้ URL สามารถเคลื่อนย้ายได้  
— ตัวอย่างจะยังคงทำงานได้แม้คุณจะย้ายมันไปยังตำแหน่งอื่นในโครงสร้างของเว็บไซต์

ดังนั้นตัวอย่างเช่น:
```
/js-examples/module-examples/basic-modules/modules/square.js
```
กลายเป็น
```
./modules/square.js
```
คุณสามารถเห็นบรรทัดแบบนี้ในการทำงานจริงได้ในไฟล์ main.js
> 💡 **Note:**  
> ในระบบโมดูลบางประเภท คุณสามารถใช้ตัวระบุโมดูล (module specifier) เช่น `modules/square`  
> ซึ่งไม่ใช่ path แบบ relative หรือ absolute และไม่มีนามสกุลไฟล์ได้  
> ตัวระบุประเภทนี้สามารถใช้งานได้ในสภาพแวดล้อมของเบราว์เซอร์  
> หากคุณได้กำหนด **import map** ไว้ก่อน
## การนำเข้าโมดูลโดยใช้ import map
ข้างต้นเราได้เห็นแล้วว่าเบราว์เซอร์สามารถนำเข้าโมดูลโดยใช้ module specifier  
ซึ่งอาจเป็น URL แบบสัมบูรณ์ (absolute) หรือ URL แบบสัมพัทธ์ (relative)  
ซึ่งจะถูกแปลงโดยอิงจาก base URL ของเอกสาร
```
import { name as squareName, draw } from "./shapes/square.js";
import { name as circleName } from "https://example.com/shapes/circle.js";
```
`import map` ช่วยให้นักพัฒนาสามารถระบุข้อความเกือบอะไรก็ได้ใน module specifier ตอนที่ import โมดูล  
โดยที่ map จะให้ค่าที่ตรงกันเพื่อใช้แทนข้อความนั้นเมื่อ URL ของโมดูลถูกแก้ไข (resolved)

ตัวอย่างเช่น `imports` key ใน `import map` ด้านล่าง  
นิยาม JSON object สำหรับ "module specifier map"  
ซึ่งชื่อของ property สามารถใช้เป็น module specifier ได้  
และค่าที่ตรงกันจะถูกแทนที่เมื่อเบราว์เซอร์ทำการ resolve URL ของโมดูล

ค่าที่กำหนดต้องเป็น URL แบบ absolute หรือ relative  
URL แบบ relative จะถูกแปลงเป็น URL แบบ absolute โดยอิงจาก base URL ของเอกสารที่มี import map อยู่
```
<script type="importmap">
  {
    "imports": {
      "shapes": "./shapes/square.js",
      "shapes/square": "./modules/shapes/square.js",
      "https://example.com/shapes/square.js": "./shapes/square.js",
      "https://example.com/shapes/": "/shapes/square/",
      "../shapes/square": "./shapes/square.js"
    }
  }
</script>
```
`import map` ถูกกำหนดโดยใช้ JSON object ภายในแท็ก `<script>`  
โดยมี attribute `type` ถูกตั้งค่าเป็น `importmap`  
โปรดทราบว่า import map จะมีผลเฉพาะกับ document เท่านั้น  
สเปกนี้ไม่ได้ครอบคลุมการใช้งาน import map ในบริบทของ worker หรือ worklet

เมื่อมี map นี้แล้ว คุณสามารถใช้ชื่อ property ที่กล่าวมาข้างต้นเป็น module specifier ได้  
ถ้าคีย์ของ module specifier ไม่มีเครื่องหมาย `/` ท้ายสุด  
ระบบจะจับคู่ทั้งคีย์แบบเต็มและแทนที่มันทั้งหมด

ตัวอย่างเช่น ด้านล่างนี้เราทำการแมปชื่อโมดูลแบบสั้น (bare module names)  
และทำการ remap URL ไปยัง path อื่น
```
// Bare module names as module specifiers
import { name as squareNameOne } from "shapes";
import { name as squareNameTwo } from "shapes/square";

// Remap a URL to another URL
import { name as squareNameThree } from "https://example.com/shapes/square.js";
```
ถ้า module specifier มีเครื่องหมาย `/` ท้ายสุด  
ค่าที่กำหนดให้ก็ต้องมี `/` ท้ายสุดเช่นกัน  
โดยคีย์จะถูกจับคู่ในลักษณะของ "path prefix"

สิ่งนี้ช่วยให้สามารถ remap URL ทั้งกลุ่มได้
```
// Remap a URL as a prefix ( https://example.com/shapes/)
import { name as squareNameFour } from "https://example.com/shapes/moduleshapes/square.js";
```
เป็นไปได้ที่คีย์หลายรายการใน import map จะตรงกับ module specifier ได้อย่างถูกต้อง  
ตัวอย่างเช่น module specifier `shapes/circle/` อาจตรงกับคีย์ `shapes/` และ `shapes/circle/`  
ในกรณีนี้ เบราว์เซอร์จะเลือกคีย์ของ module specifier ที่ตรงที่สุด (ยาวที่สุด)

`import map` ช่วยให้สามารถ import โมดูลโดยใช้ชื่อแบบ bare module name (เช่นเดียวกับใน Node.js)  
และยังสามารถจำลองการ import โมดูลจากแพ็กเกจ ทั้งแบบมีและไม่มีนามสกุลไฟล์ได้  
แม้จะไม่ได้แสดงในตัวอย่างด้านบน แต่ import map ยังสามารถระบุเวอร์ชันเฉพาะของไลบรารีที่จะ import ได้  
โดยอ้างอิงจาก path ของสคริปต์ที่กำลัง import โมดูลนั้น

โดยรวมแล้ว import maps ช่วยให้นักพัฒนาสามารถเขียนโค้ด import ได้สะดวกขึ้น  
และทำให้การจัดการเวอร์ชันและ dependency ต่าง ๆ ของโมดูลในเว็บไซต์ง่ายขึ้น  
สิ่งนี้ช่วยลดความยุ่งยากในการใช้ JavaScript library เดียวกันทั้งในฝั่งเบราว์เซอร์และฝั่งเซิร์ฟเวอร์

---

## การตรวจสอบความสามารถ (Feature detection)

คุณสามารถตรวจสอบว่าเบราว์เซอร์รองรับ import maps หรือไม่  
โดยใช้เมธอดแบบ static `HTMLScriptElement.supports()` (ซึ่งโดยทั่วไปได้รับการรองรับอย่างกว้างขวาง)
```
if (HTMLScriptElement.supports?.("importmap")) {
  console.log("Browser supports import maps.");
}
```
## การนำเข้าโมดูลโดยใช้ชื่อแบบ bare (bare names)

ในบางสภาพแวดล้อมของ JavaScript เช่น Node.js  
คุณสามารถใช้ชื่อแบบ bare เป็น module specifier ได้  
สิ่งนี้สามารถทำงานได้เพราะ environment สามารถ resolve ชื่อของโมดูลให้ไปยังตำแหน่งมาตรฐานในระบบไฟล์

ตัวอย่างเช่น คุณอาจใช้ไวยากรณ์ต่อไปนี้เพื่อ import โมดูลชื่อ "square":
```
<script type="importmap">
  {
    "imports": {
      "shapes": "./shapes/square.js",
      "shapes/square": "./modules/shapes/square.js",
      "https://example.com/shapes/square.js": "./shapes/square.js",
      "https://example.com/shapes/": "/shapes/square/",
      "../shapes/square": "./shapes/square.js"
    }
  }
</script>
```
`import map` ถูกกำหนดโดยใช้ JSON object ภายในแท็ก `<script>`  
โดยมี attribute `type` ถูกตั้งค่าเป็น `importmap`

โปรดทราบว่า import map จะมีผลเฉพาะกับ document เท่านั้น  
สเปกไม่ได้ครอบคลุมถึงการใช้งาน import map ใน context ของ worker หรือ worklet

เมื่อใช้ map นี้แล้ว คุณสามารถใช้ชื่อ property ด้านบนเป็น module specifier ได้  
หาก module specifier key ไม่มีเครื่องหมาย `/` ท้ายสุด  
จะมีการจับคู่ทั้ง key แบบเต็มและแทนที่ทั้งหมด

ตัวอย่างเช่น ด้านล่างนี้เราทำการจับคู่ชื่อโมดูลแบบ bare  
และ remap URL ไปยัง path อื่น
```
// Bare module names as module specifiers
import { name as squareNameOne } from "shapes";
import { name as squareNameTwo } from "shapes/square";

// Remap a URL to another URL
import { name as squareNameThree } from "https://example.com/shapes/square.js";
```
ถ้า module specifier มีเครื่องหมาย `/` ท้ายสุด  
ค่าที่กำหนดก็ต้องมีเครื่องหมาย `/` ท้ายสุดเช่นกัน  
โดยคีย์จะถูกจับคู่ในลักษณะของ “path prefix”  
สิ่งนี้ช่วยให้สามารถ remap URL ทั้งกลุ่มได้
```
// Remap a URL as a prefix ( https://example.com/shapes/)
import { name as squareNameFour } from "https://example.com/shapes/moduleshapes/square.js";
```
อาจมีหลายคีย์ใน import map ที่สามารถตรงกับ module specifier ได้อย่างถูกต้อง  
ตัวอย่างเช่น module specifier `shapes/circle/` อาจตรงกับคีย์ `shapes/` และ `shapes/circle/`  
ในกรณีนี้ เบราว์เซอร์จะเลือกคีย์ที่ตรงที่สุด (และยาวที่สุด) ของ module specifier

`import map` ช่วยให้สามารถ import โมดูลโดยใช้ชื่อแบบ bare module name (เหมือนใน Node.js)  
และยังสามารถจำลองการ import โมดูลจากแพ็กเกจได้ ทั้งแบบมีและไม่มีนามสกุลไฟล์  
แม้จะไม่ได้แสดงไว้ด้านบน แต่ยังสามารถระบุเวอร์ชันเฉพาะของไลบรารีเพื่อ import ได้  
โดยอิงจาก path ของสคริปต์ที่ทำการ import โมดูลนั้น

โดยทั่วไป import maps ช่วยให้นักพัฒนาสามารถเขียนโค้ด import ได้สะดวกขึ้น  
และทำให้การจัดการเวอร์ชันและ dependency ของโมดูลในเว็บไซต์ง่ายขึ้น  
สิ่งนี้ช่วยลดความยุ่งยากในการใช้ไลบรารี JavaScript เดียวกันทั้งในเบราว์เซอร์และบนเซิร์ฟเวอร์

---

## การตรวจสอบความสามารถ (Feature detection)

คุณสามารถตรวจสอบการรองรับ import maps ได้โดยใช้เมธอด static `HTMLScriptElement.supports()`  
(ซึ่งโดยทั่วไปได้รับการรองรับอย่างแพร่หลาย)
```
if (HTMLScriptElement.supports?.("importmap")) {
  console.log("Browser supports import maps.");
}
```
## การนำเข้าโมดูลโดยใช้ชื่อแบบ bare (bare names)

ในบางสภาพแวดล้อมของ JavaScript เช่น Node.js  
คุณสามารถใช้ชื่อแบบ bare เป็น module specifier ได้  
สิ่งนี้สามารถทำงานได้เพราะ environment สามารถ resolve ชื่อของโมดูลไปยังตำแหน่งมาตรฐานในระบบไฟล์ได้

ตัวอย่างเช่น คุณอาจใช้ไวยากรณ์ต่อไปนี้เพื่อ import โมดูลชื่อ "square":
```
import { name, draw, reportArea, reportPerimeter } from "square";
```
ในการใช้ชื่อแบบ bare บนเบราว์เซอร์ คุณจำเป็นต้องมี import map  
ซึ่งจะให้ข้อมูลที่เบราว์เซอร์ใช้ในการ resolve module specifier ไปยัง URL  
(หาก JavaScript พยายาม import module specifier ที่ไม่สามารถ resolve ไปยังตำแหน่งของโมดูลได้  
JavaScript จะโยน TypeError)

ด้านล่างนี้คือ map ที่กำหนดคีย์ module specifier ชื่อ `square`  
ซึ่งในกรณีนี้จะ map ไปยังค่าที่เป็นที่อยู่แบบ relative
```
<script type="importmap">
  {
    "imports": {
      "square": "./shapes/square.js"
    }
  }
</script>
```
ด้วย map นี้ เราสามารถใช้ชื่อแบบ bare ได้เมื่อเรา import โมดูล:
```
import { name as squareName, draw } from "square";
```
## การ remap เส้นทางของโมดูล (Remapping module paths)

รายการใน module specifier map ที่ทั้ง key และค่าที่เกี่ยวข้องมีเครื่องหมาย `/` ท้ายสุด  
สามารถถูกใช้เป็น path-prefix ได้

สิ่งนี้ช่วยให้สามารถ remap ชุดของ import URL ทั้งหมดจากตำแหน่งหนึ่งไปยังอีกตำแหน่งหนึ่งได้  
และยังสามารถใช้จำลองการทำงานกับ “แพ็กเกจและโมดูล”  
เหมือนกับที่คุณอาจเห็นในระบบของ Node


> 📝 **หมายเหตุ:**  
> เครื่องหมาย `/` ท้ายสุดแสดงว่า key ของ module specifier สามารถถูกแทนที่เป็นส่วนหนึ่งของ module specifier ได้  
> หากไม่มีเครื่องหมายนี้ เบราว์เซอร์จะจับคู่ (และแทนที่) เฉพาะทั้ง key ของ module specifier เท่านั้น

## แพ็กเกจของโมดูล (Packages of modules)

การกำหนด import map แบบ JSON ด้านล่าง  
ทำการแมป `lodash` เป็นชื่อแบบ bare  
และแมป prefix ของ module specifier `lodash/` ไปยัง path `/node_modules/lodash-es/`  
(ซึ่งจะถูก resolve โดยอิงจาก base URL ของเอกสาร)



```
{
  "imports": {
    "lodash": "/node_modules/lodash-es/lodash.js",
    "lodash/": "/node_modules/lodash-es/"
  }
}
```
ด้วยการแมปนี้ คุณสามารถ import ได้ทั้ง "แพ็กเกจ" ทั้งหมดโดยใช้ชื่อแบบ bare  
และโมดูลภายในแพ็กเกจนั้น (โดยใช้ path ที่ถูกแมปไว้)
```
import _ from "lodash";
import fp from "lodash/fp.js";
```
สามารถ import `fp` ด้านบนได้โดยไม่ต้องใส่นามสกุลไฟล์ `.js`  
แต่คุณจะต้องสร้างคีย์แบบ bare module specifier สำหรับไฟล์นั้น เช่น `lodash/fp`  
แทนที่จะใช้ path โดยตรง

สิ่งนี้อาจเหมาะสมในกรณีที่มีเพียงโมดูลเดียว  
แต่จะไม่เหมาะหากคุณต้องการ import โมดูลจำนวนมาก

---

## การ remap URL ทั่วไป (General URL remapping)

คีย์ของ module specifier ไม่จำเป็นต้องเป็น path เสมอไป  
มันสามารถเป็น URL แบบ absolute ได้  
(หรือ path แบบ relative ที่มีลักษณะคล้าย URL เช่น `./`, `../`, `/`)

สิ่งนี้อาจมีประโยชน์หากคุณต้องการ remap โมดูลที่อ้างถึง resource แบบ absolute  
ให้ชี้ไปยัง resource ที่อยู่ในเครื่องของคุณเอง
```
{
  "imports": {
    "https://www.unpkg.com/moment/": "/node_modules/moment/"
  }
}
```
## โมดูลแบบมีขอบเขตสำหรับการจัดการเวอร์ชัน (Scoped modules for version management)

ระบบนิเวศอย่าง Node ใช้ตัวจัดการแพ็กเกจ เช่น `npm` เพื่อจัดการโมดูลและ dependency ของมัน  
ตัวจัดการแพ็กเกจจะทำให้แน่ใจว่าแต่ละโมดูลถูกแยกออกจากโมดูลอื่น ๆ และ dependency ของพวกมัน

ผลที่ตามมาก็คือ ในขณะที่แอปพลิเคชันที่ซับซ้อนอาจมีการรวมโมดูลเดียวกันหลายครั้ง  
โดยมีหลายเวอร์ชันในส่วนต่าง ๆ ของกราฟโมดูล  
ผู้ใช้ไม่จำเป็นต้องคิดถึงความซับซ้อนนี้เลย
> 📝 **หมายเหตุ:**  
> คุณสามารถจัดการเวอร์ชันได้โดยใช้ path แบบ relative ก็ได้  
> แต่วิธีนี้ไม่ค่อยดีนัก เพราะนอกจากอย่างอื่นแล้ว  
> มันยังบังคับให้คุณต้องใช้โครงสร้างโครงการแบบเฉพาะเจาะจง  
> และทำให้ไม่สามารถใช้ชื่อโมดูลแบบ bare ได้
`import maps` ช่วยให้คุณสามารถมี dependency หลายเวอร์ชันในแอปพลิเคชันของคุณได้เช่นกัน  
และสามารถอ้างอิงพวกมันด้วย module specifier เดียวกัน

คุณสามารถทำสิ่งนี้ได้โดยใช้ key ชื่อ `scopes`  
ซึ่งช่วยให้คุณกำหนด module specifier map แบบเฉพาะ  
ที่จะถูกใช้งานขึ้นอยู่กับ path ของสคริปต์ที่ทำการ import

ตัวอย่างด้านล่างแสดงให้เห็นวิธีการนี้
```json
{
  "imports": {
    "cool-module": "/node_modules/cool-module/index.js"
  },
  "scopes": {
    "/node_modules/dependency/": {
      "cool-module": "/node_modules/some/other/location/cool-module/index.js"
    }
  }
}
```
ด้วยการแมปนี้ หากสคริปต์ที่มี URL ซึ่งมี `/node_modules/dependency/` อยู่ใน path  
ทำการ import `cool-module`  
เวอร์ชันที่อยู่ที่ `/node_modules/some/other/location/cool-module/index.js` จะถูกใช้งาน

map ที่อยู่ใน `imports` จะถูกใช้เป็น fallback  
หากไม่มี scope ที่ตรงใน scoped map  
หรือ scope ที่ตรงไม่มี specifier ที่ตรงกัน

ตัวอย่างเช่น  
ถ้า `cool-module` ถูก import จากสคริปต์ที่อยู่ใน path ซึ่งไม่ตรงกับ scope ใด ๆ  
map ของ module specifier ใน `imports` จะถูกใช้แทน  
โดยจะ map ไปยังเวอร์ชันที่อยู่ที่ `/node_modules/cool-module/index.js`

> 🔸 โปรดทราบว่า path ที่ใช้ในการเลือก scope  
> จะไม่ส่งผลต่อการ resolve ที่อยู่ของโมดูล  
> ค่าที่อยู่ใน path ที่ถูกแมปไม่จำเป็นต้องตรงกับ path ของ scope  
> และ path แบบ relative จะยังคงถูก resolve โดยอิงจาก base URL  
> ของสคริปต์ที่มี import map อยู่

เช่นเดียวกับ module specifier map  
คุณสามารถมี key ของ scope ได้หลายรายการ  
และ key เหล่านี้อาจมี path ที่ซ้อนทับกันได้

หากมีหลาย scope ที่ตรงกับ referrer URL  
เบราว์เซอร์จะตรวจสอบ scope ที่ตรงที่สุด (key ที่ยาวที่สุด) ก่อน  
เพื่อหาว่ามี specifier ที่ตรงกันหรือไม่  
หากไม่มี เบราว์เซอร์จะ fallback ไปยัง scope ที่ตรงรองลงมา  
และทำแบบนี้ต่อไปเรื่อย ๆ

หากไม่มี scope ไหนเลยที่มี specifier ที่ตรง  
เบราว์เซอร์จะตรวจสอบใน module specifier map ที่อยู่ใน key `imports`

## ปรับปรุงการแคชโดยการแมปชื่อไฟล์ที่มีแฮชออก (Improve caching by mapping away hashed filenames)

ไฟล์สคริปต์ที่เว็บไซต์ใช้งานมักจะมีชื่อไฟล์ที่มีแฮช  
เพื่อช่วยให้การแคชง่ายขึ้น

ข้อเสียของแนวทางนี้คือ  
หากโมดูลมีการเปลี่ยนแปลง  
โมดูลใด ๆ ที่ import มันโดยใช้ชื่อไฟล์ที่มีแฮช  
ก็จะต้องได้รับการอัปเดตหรือสร้างใหม่ด้วยเช่นกัน

สิ่งนี้อาจนำไปสู่การอัปเดตแบบลูกโซ่  
ซึ่งสิ้นเปลืองทรัพยากรเครือข่ายโดยไม่จำเป็น

`import map` ให้ทางแก้ที่สะดวกต่อปัญหานี้  
แทนที่จะพึ่งพาชื่อไฟล์ที่มีแฮชแบบเฉพาะ  
แอปพลิเคชันและสคริปต์จะพึ่งพาโมดูลเวอร์ชันที่ไม่มีแฮชในชื่อแทน

จากนั้น import map เช่นตัวอย่างด้านล่าง  
จะทำหน้าที่แมปชื่อโมดูลนั้นไปยังไฟล์สคริปต์จริง

```json
{
  "imports": {
    "main_script": "/node/srcs/application-fg7744e1b.js",
    "dependency_script": "/node/srcs/dependency-3qn7e4b1q.js"
  }
}
```
หาก `dependency_script` มีการเปลี่ยนแปลง  
แฮชที่อยู่ในชื่อไฟล์ของมันก็จะเปลี่ยนไปด้วย

ในกรณีนี้ เราเพียงแค่ต้องอัปเดต import map  
เพื่อให้สะท้อนถึงชื่อใหม่ของโมดูลที่เปลี่ยนไป

เราไม่จำเป็นต้องอัปเดต source code JavaScript ใด ๆ ที่พึ่งพาโมดูลนั้น  
เพราะ specifier ในคำสั่ง import ยังคงเดิม

## การโหลดทรัพยากรที่ไม่ใช่ JavaScript (Loading non-JavaScript resources)

หนึ่งในฟีเจอร์ที่น่าตื่นเต้นของสถาปัตยกรรมโมดูลแบบ unified  
คือความสามารถในการโหลดทรัพยากรที่ไม่ใช่ JavaScript เป็นโมดูลได้

ตัวอย่างเช่น คุณสามารถ import ไฟล์ JSON ให้กลายเป็น JavaScript object  
หรือ import ไฟล์ CSS ให้กลายเป็นวัตถุ `CSSStyleSheet` ได้

คุณต้องระบุอย่างชัดเจนว่าคุณกำลัง import ทรัพยากรประเภทใด  
โดยปกติแล้ว เบราว์เซอร์จะถือว่าทรัพยากรที่ import เข้ามาเป็น JavaScript  
และจะโยน error หากไฟล์ที่ resolve ได้ไม่ใช่ JavaScript

หากต้องการ import JSON, CSS หรือทรัพยากรชนิดอื่น ๆ  
ให้ใช้ไวยากรณ์ `import attributes` ดังนี้:
```
import colors from "./colors.json" with { type: "json" };
import styles from "./styles.css" with { type: "css" };
```
เบราว์เซอร์จะทำการตรวจสอบชนิดของโมดูลด้วย  
และจะล้มเหลวหากตัวอย่างเช่น `./data.json` ไม่สามารถ resolve เป็นไฟล์ JSON ได้

สิ่งนี้ช่วยให้คุณไม่เผลอรันโค้ดโดยไม่ตั้งใจ  
ในกรณีที่คุณตั้งใจจะ import ข้อมูลเท่านั้น

เมื่อ import ได้สำเร็จแล้ว  
คุณสามารถใช้งานค่าที่ import มาได้เหมือนกับ JavaScript object หรือ `CSSStyleSheet` object ปกติ
```
console.log(colors.map((color) => color.value));
document.adoptedStyleSheets = [styles];
```
## การนำโมดูลไปใช้งานกับ HTML ของคุณ (Applying the module to your HTML)

ตอนนี้เราจำเป็นต้องนำโมดูล `main.js` ไปใช้กับหน้า HTML ของเรา  
ซึ่งคล้ายกับการแนบสคริปต์ปกติเข้ากับหน้าเว็บ แต่มีความแตกต่างที่สำคัญบางอย่าง

อย่างแรกเลย คุณต้องใส่ `type="module"` ลงในแท็ก `<script>`  
เพื่อประกาศว่าสคริปต์นี้คือโมดูล

ในการ import สคริปต์ `main.js` เราใช้ดังนี้:
```
<script type="module" src="main.js"></script>
```
คุณยังสามารถฝังสคริปต์ของโมดูลลงในไฟล์ HTML โดยตรง  
โดยวางโค้ด JavaScript ไว้ภายในแท็ก `<script>` ดังนี้:
```
<script type="module">
  /* JavaScript module code here */
</script>
```
คุณสามารถใช้คำสั่ง `import` และ `export` ได้เฉพาะภายในโมดูลเท่านั้น ไม่สามารถใช้ในสคริปต์ปกติได้  
หากแท็ก `<script>` ของคุณไม่มี attribute `type="module"`  
และพยายาม import โมดูลอื่น เบราว์เซอร์จะโยน error

ตัวอย่างเช่น:
```
<script>
  import _ from "lodash"; // SyntaxError: import declarations may only appear at top level of a module
  // …
</script>
<script src="a-module-using-import-statements.js"></script>
<!-- SyntaxError: import declarations may only appear at top level of a module -->
```
โดยทั่วไปคุณควรประกาศโมดูลทั้งหมดไว้ในไฟล์แยกต่างหาก

โมดูลที่ประกาศแบบ inline ใน HTML  
สามารถ import โมดูลอื่นได้  
แต่สิ่งที่พวกมัน export จะไม่สามารถเข้าถึงได้จากโมดูลอื่น  
(เพราะพวกมันไม่มี URL)
> 📝 **หมายเหตุ:**  
> โมดูลและ dependency ของมันสามารถถูก preload ล่วงหน้า  
> โดยระบุไว้ในแท็ก `<link>` ที่มี `rel="modulepreload"`  
> สิ่งนี้สามารถช่วยลดเวลาในการโหลดได้อย่างมากเมื่อมีการใช้งานโมดูลเหล่านั้น
## ความแตกต่างอื่นระหว่างโมดูลกับสคริปต์แบบคลาสสิก 
## (Other differences between modules and classic scripts)

คุณต้องให้ความสำคัญกับการทดสอบแบบ local —  
หากคุณพยายามโหลดไฟล์ HTML แบบ local (เช่นด้วย URL แบบ `file://`)  
คุณจะเจอ CORS error เนื่องจากข้อกำหนดด้านความปลอดภัยของ JavaScript modules  
คุณจำเป็นต้องทดสอบผ่านเซิร์ฟเวอร์เท่านั้น

นอกจากนี้ โปรดทราบว่า คุณอาจได้พฤติกรรมที่แตกต่างกัน  
ระหว่างสคริปต์ที่อยู่ภายในโมดูลกับสคริปต์แบบคลาสสิก  
เนื่องจากโมดูลจะใช้ strict mode โดยอัตโนมัติ

ไม่จำเป็นต้องใช้ attribute `defer` (ดูเพิ่มเติมที่ `script` attributes) เมื่อโหลดสคริปต์โมดูล  
เพราะโมดูลจะถูกเลื่อนการประมวลผล (deferred) โดยอัตโนมัติอยู่แล้ว

โมดูลจะถูก execute เพียงครั้งเดียวเท่านั้น  
แม้ว่าจะถูกอ้างอิงจาก `<script>` หลายแท็กก็ตาม

สุดท้ายแต่ไม่ท้ายสุด — ขอให้ชัดเจนว่า  
ฟีเจอร์ของโมดูลจะถูก import เข้ามาใน **scope ของสคริปต์เดียวเท่านั้น**  
พวกมันจะไม่อยู่ใน global scope

ดังนั้น คุณจะสามารถเข้าถึงฟีเจอร์ที่ import มาได้เฉพาะในสคริปต์ที่ import เท่านั้น  
และคุณจะไม่สามารถเข้าถึงมันจาก JavaScript console ได้ เช่นใน DevTools

คุณจะยังคงเห็น syntax errors แสดงใน DevTools ได้  
แต่คุณอาจไม่สามารถใช้เทคนิคการดีบักบางอย่างที่คุณเคยใช้ได้

ตัวแปรที่ถูกกำหนดภายในโมดูลจะอยู่ใน scope ของโมดูลนั้น  
เว้นแต่คุณจะผูกมันเข้ากับ global object อย่างชัดเจน  
ในทางกลับกัน ตัวแปรที่ถูกกำหนดไว้ใน global scope  
จะสามารถเข้าถึงได้จากภายในโมดูล

ตัวอย่างเช่น จากโค้ดต่อไปนี้:
```
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <title></title>
    <link rel="stylesheet" href="" />
  </head>
  <body>
    <div id="main"></div>
    <script>
      // A var statement creates a global variable.
      var text = "Hello";
    </script>
    <script type="module" src="./render.js"></script>
  </body>
</html>
```
```
/* render.js */
document.getElementById("main").innerText = text;
```
หน้ายังคงจะแสดงคำว่า "Hello"  
เพราะตัวแปร global อย่าง `text` และ `document` สามารถเข้าถึงได้ภายในโมดูล

(โปรดสังเกตจากตัวอย่างนี้ด้วยว่า  
โมดูลไม่จำเป็นต้องมีคำสั่ง `import` หรือ `export` เสมอไป —  
สิ่งเดียวที่จำเป็นคือ entry point ต้องมี `type="module"` เท่านั้น)
## การ export แบบ default เทียบกับ named export (Default exports versus named exports)

ฟังก์ชันที่เรา export มาจนถึงตอนนี้เป็นแบบ named export  
นั่นคือแต่ละรายการ (ไม่ว่าจะเป็นฟังก์ชัน, const ฯลฯ)  
จะถูกอ้างอิงโดยชื่อของมันขณะ export และใช้ชื่อนั้นตอน import เช่นกัน

ยังมีรูปแบบของ export อีกประเภทหนึ่งที่เรียกว่า **default export**  
ซึ่งถูกออกแบบมาเพื่อให้ง่ายต่อการกำหนดฟังก์ชันหลักเริ่มต้นจากโมดูล  
และยังช่วยให้ JavaScript modules สามารถทำงานร่วมกับระบบโมดูลแบบ CommonJS และ AMD ที่มีอยู่เดิมได้ด้วย  
(อธิบายไว้อย่างดีใน *ES6 In Depth: Modules* โดย Jason Orendorff — ค้นหาคำว่า "Default exports")

เรามาดูตัวอย่างเพื่ออธิบายวิธีการทำงานของมันกัน

ใน `square.js` ของ basic-modules ของเรา  
คุณจะพบฟังก์ชันชื่อ `randomSquare()` ที่สร้างสี่เหลี่ยมจัตุรัสโดยมีสี, ขนาด และตำแหน่งแบบสุ่ม

เราต้องการ export ฟังก์ชันนี้เป็น default  
ดังนั้นที่ด้านล่างของไฟล์เราจะเขียนแบบนี้:
```
export default randomSquare;
```

> 📝 โปรดสังเกตว่าไม่มีวงเล็บปีกกา (curly braces)

เรายังสามารถใส่ `export default` ไว้หน้าฟังก์ชัน  
และกำหนดให้เป็นฟังก์ชันแบบไม่มีชื่อ (anonymous function) ได้เช่นนี้:
```
export default function (ctx) {
  // …
}
```
ที่ฝั่งไฟล์ `main.js` ของเรา  
เราจะ import ฟังก์ชัน default โดยใช้บรรทัดนี้:
```
import randomSquare from "./modules/square.js";
```
อีกครั้ง — โปรดสังเกตว่าไม่มีวงเล็บปีกกา  
เนื่องจากแต่ละโมดูลสามารถมี default export ได้เพียงหนึ่งรายการเท่านั้น  
และเราแน่ใจว่า `randomSquare` คือ default นั้น

บรรทัดด้านบนจึงถือเป็นรูปแบบย่อของ:
```
import { default as randomSquare } from "./modules/square.js";
```
> 📝 **หมายเหตุ:**  
> ไวยากรณ์ `as` สำหรับการเปลี่ยนชื่อสิ่งที่ export  
> จะมีอธิบายอยู่ด้านล่างในหัวข้อ **Renaming imports and exports**

## การหลีกเลี่ยงชื่อซ้ำกัน (Avoiding naming conflicts)

จนถึงตอนนี้ โมดูลสำหรับวาดรูปร่างบน canvas ของเราดูเหมือนจะทำงานได้ดี  
แต่จะเกิดอะไรขึ้นถ้าเราพยายามเพิ่มโมดูลที่เกี่ยวกับการวาดรูปร่างอื่น เช่น วงกลมหรือสามเหลี่ยม?

รูปร่างเหล่านี้ก็น่าจะมีฟังก์ชันที่เกี่ยวข้องคล้ายกัน เช่น `draw()`, `reportArea()` เป็นต้น  
ถ้าเราพยายาม import ฟังก์ชันชื่อเดียวกันจากหลายโมดูลเข้าสู่ไฟล์โมดูลระดับบนสุดเดียวกัน  
เราจะเจอปัญหาชื่อซ้ำและเกิด error

โชคดีที่มีหลายวิธีในการหลีกเลี่ยงปัญหานี้  
เราจะไปดูวิธีต่าง ๆ เหล่านี้ในหัวข้อถัดไป

## การเปลี่ยนชื่อในการ import และ export (Renaming imports and exports)

ภายในวงเล็บปีกกาของคำสั่ง `import` และ `export`  
คุณสามารถใช้คีย์เวิร์ด `as` ร่วมกับชื่อใหม่ของฟีเจอร์  
เพื่อเปลี่ยนชื่อที่คุณจะใช้เรียกฟีเจอร์นั้นภายในโมดูลระดับบนสุด

ตัวอย่างเช่น ทั้งสองตัวอย่างด้านล่างนี้ทำงานเหมือนกัน  
แม้จะเขียนต่างกันเล็กน้อย:
```
// inside module.js
export { function1 as newFunctionName, function2 as anotherNewFunctionName };

// inside main.js
import { newFunctionName, anotherNewFunctionName } from "./modules/module.js";
```
```
// inside module.js
export { function1, function2 };

// inside main.js
import {
  function1 as newFunctionName,
  function2 as anotherNewFunctionName,
} from "./modules/module.js";
```
ลองมาดูตัวอย่างจริงกันบ้าง  
ในไดเรกทอรี `renaming` คุณจะเห็นระบบโมดูลแบบเดียวกับในตัวอย่างก่อนหน้า  
ยกเว้นว่าเราได้เพิ่มโมดูล `circle.js` และ `triangle.js`  
เพื่อใช้วาดและรายงานข้อมูลของวงกลมกับสามเหลี่ยม

ภายในแต่ละโมดูลเหล่านี้ เรามีฟีเจอร์ที่ใช้ชื่อเดียวกันถูก export ออกมา  
ดังนั้นแต่ละไฟล์จึงมีคำสั่ง export ที่เหมือนกันอยู่ด้านล่างไฟล์:
```
export { name, draw, reportArea, reportPerimeter };
```
เมื่อทำการ import โมดูลเหล่านี้เข้าใน `main.js` ถ้าเราพยายามใช้:

```
import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
import { name, draw, reportArea, reportPerimeter } from "./modules/circle.js";
import { name, draw, reportArea, reportPerimeter } from "./modules/triangle.js";
```

เบราว์เซอร์จะโยน error เช่น `"SyntaxError: redeclaration of import name"` (Firefox)

ดังนั้นเราจำเป็นต้องเปลี่ยนชื่อของ import เหล่านั้น  
เพื่อให้แต่ละชื่อไม่ซ้ำกัน:

```
import {
  name as squareName,
  draw as drawSquare,
  reportArea as reportSquareArea,
  reportPerimeter as reportSquarePerimeter,
} from "./modules/square.js";

import {
  name as circleName,
  draw as drawCircle,
  reportArea as reportCircleArea,
  reportPerimeter as reportCirclePerimeter,
} from "./modules/circle.js";

import {
  name as triangleName,
  draw as drawTriangle,
  reportArea as reportTriangleArea,
  reportPerimeter as reportTrianglePerimeter,
} from "./modules/triangle.js";
```
> 📝 **หมายเหตุ:**  
> คุณสามารถแก้ปัญหานี้ในไฟล์โมดูลแทนก็ได้ เช่น:
```
// in square.js
export {
  name as squareName,
  draw as drawSquare,
  reportArea as reportSquareArea,
  reportPerimeter as reportSquarePerimeter,
};
```
```
// in main.js
import {
  squareName,
  drawSquare,
  reportSquareArea,
  reportSquarePerimeter,
} from "./modules/square.js";
```
และมันจะทำงานได้เหมือนกันทุกประการ  
ว่าจะใช้รูปแบบไหนก็ขึ้นอยู่กับคุณ  
อย่างไรก็ตาม โดยทั่วไปแล้วการปล่อยให้โค้ดในโมดูลคงเดิม  
แล้วไปเปลี่ยนชื่อในฝั่งที่ import จะดูสมเหตุสมผลมากกว่า

สิ่งนี้ยิ่งมีเหตุผลมากขึ้น  
เมื่อคุณ import มาจากโมดูลของ third party ที่คุณไม่สามารถแก้ไขได้เอง

## การสร้างอ็อบเจกต์ของโมดูล (Creating a module object)

วิธีที่กล่าวมาก่อนหน้านี้ก็ใช้งานได้ดี  
แต่ดูค่อนข้างรกและยืดยาวเล็กน้อย

วิธีที่ดีกว่าคือ import ฟีเจอร์ทั้งหมดของแต่ละโมดูลไว้ภายในอ็อบเจกต์ของโมดูลนั้น

ไวยากรณ์ต่อไปนี้จะทำสิ่งนั้น:

```
import * as Module from "./modules/module.js";
```
คำสั่งนี้จะดึงเอา export ทั้งหมดจาก `module.js`  
และทำให้สามารถเรียกใช้งานได้ในฐานะสมาชิกของอ็อบเจกต์ `Module`  
ซึ่งโดยผลลัพธ์แล้วจะเป็นเหมือนการสร้าง namespace ของตัวเอง

ดังนั้น ตัวอย่างเช่น:

```
Module.function1();
Module.function2();
```
ลองมาดูตัวอย่างจริงกันอีกครั้ง  
หากคุณไปที่ไดเรกทอรี `module-objects`  
คุณจะเห็นตัวอย่างเดิมอีกครั้ง แต่ถูกเขียนใหม่เพื่อใช้ประโยชน์จากไวยากรณ์แบบใหม่นี้

ในแต่ละโมดูล การ export ทั้งหมดจะอยู่ในรูปแบบง่าย ๆ ดังนี้:
```
export { name, draw, reportArea, reportPerimeter };
```
ส่วนคำสั่ง import จะมีหน้าตาแบบนี้:
```
import * as Canvas from "./modules/canvas.js";

import * as Square from "./modules/square.js";
import * as Circle from "./modules/circle.js";
import * as Triangle from "./modules/triangle.js";
```
ในแต่ละกรณี ตอนนี้คุณสามารถเข้าถึงสิ่งที่ import มาจากโมดูล  
ผ่านทางชื่ออ็อบเจกต์ที่ระบุไว้ได้ เช่น:
```
const square1 = Square.draw(myCanvas.ctx, 50, 50, 100, "blue");
Square.reportArea(square1.length, reportList);
Square.reportPerimeter(square1.length, reportList);
```
ดังนั้นตอนนี้คุณสามารถเขียนโค้ดได้เหมือนเดิมทุกประการ  
(ตราบใดที่คุณใส่ชื่ออ็อบเจกต์ไว้ในจุดที่จำเป็น)  
และการ import ก็จะดูเป็นระเบียบมากขึ้น

## โมดูลและคลาส (Modules and classes)

อย่างที่เราได้บอกใบ้ไว้ก่อนหน้านี้  
คุณสามารถ export และ import คลาสได้เช่นกัน  
ซึ่งเป็นอีกทางเลือกหนึ่งในการหลีกเลี่ยงปัญหาชื่อซ้ำในโค้ดของคุณ  
และมีประโยชน์อย่างยิ่งหากคุณเขียนโค้ดของโมดูลในรูปแบบเชิงวัตถุ (object-oriented) อยู่แล้ว

คุณสามารถดูตัวอย่างของโมดูลวาดรูปร่างที่เขียนใหม่โดยใช้ ES class ได้ในไดเรกทอรี `classes`  
ตัวอย่างเช่น ไฟล์ `square.js` จะรวมฟังก์ชันทั้งหมดไว้ภายในคลาสเดียว:
```
class Square {
  constructor(ctx, listId, length, x, y, color) {
    // …
  }

  draw() {
    // …
  }

  // …
}
```
ซึ่งเราจะทำการ export ดังนี้:
```
export { Square };
```
และจากนั้นใช้คลาสนี้เพื่อวาดสี่เหลี่ยมของเรา:
```
const square1 = new Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, "blue");
square1.draw();
square1.reportArea();
square1.reportPerimeter();
```
## การรวมโมดูล (Aggregating modules)

บางครั้งคุณอาจต้องการรวมโมดูลหลายตัวเข้าด้วยกัน  
เช่นในกรณีที่มี dependency หลายระดับ  
และคุณต้องการทำให้ทุกอย่างง่ายขึ้น  
โดยรวม submodule หลายตัวเข้าเป็นโมดูลหลักตัวเดียว

สิ่งนี้สามารถทำได้โดยใช้ไวยากรณ์ `export` รูปแบบต่าง ๆ ภายในโมดูลหลัก ดังนี้:
```
export * from "x.js";
export { name } from "x.js";
```
ตัวอย่างสามารถดูได้ในไดเรกทอรี `module-aggregation`  
ในตัวอย่างนี้ (ซึ่งอ้างอิงจากตัวอย่าง classes ก่อนหน้านี้)  
เรามีโมดูลเพิ่มเติมชื่อ `shapes.js`  
ซึ่งทำหน้าที่รวมฟังก์ชันทั้งหมดจาก `circle.js`, `square.js` และ `triangle.js` เข้าด้วยกัน

เรายังได้ย้าย submodule เหล่านี้ไปไว้ในไดเรกทอรีย่อยชื่อ `shapes`  
ซึ่งอยู่ภายในไดเรกทอรี `modules`

ดังนั้นโครงสร้างของโมดูลในตัวอย่างนี้คือ:
```
modules/
  canvas.js
  shapes.js
  shapes/
    circle.js
    square.js
    triangle.js
```
ในแต่ละ submodule การ export จะอยู่ในรูปแบบเดียวกัน ตัวอย่างเช่น:
```
export { Square };
```
ถัดไปคือส่วนของการรวมโมดูล (aggregation)  
ภายในไฟล์ `shapes.js` เราใส่บรรทัดโค้ดต่อไปนี้:
```
export { Square } from "./shapes/square.js";
export { Triangle } from "./shapes/triangle.js";
export { Circle } from "./shapes/circle.js";
```
บรรทัดเหล่านี้จะดึงเอา export จากแต่ละ submodule  
และทำให้สามารถเรียกใช้งานได้ผ่านโมดูล `shapes.js` โดยตรง
> 📝 **หมายเหตุ:**  
> export ที่ถูกอ้างอิงใน `shapes.js`  
> จะถูกส่งผ่าน (redirected) ไปยังไฟล์อื่น  
> และไม่ได้มีอยู่จริงภายในไฟล์นั้นโดยตรง  
> ดังนั้นคุณจะไม่สามารถเขียนโค้ดที่เกี่ยวข้องกับ export เหล่านั้นภายในไฟล์นี้ได้
ดังนั้นตอนนี้ ในไฟล์ `main.js`  
เราสามารถเข้าถึงคลาสจากทั้งสามโมดูลได้  
โดยแทนที่บรรทัดเดิมด้วย:
```
import { Square } from "./modules/square.js";
import { Circle } from "./modules/circle.js";
import { Triangle } from "./modules/triangle.js";
```
ด้วยบรรทัดเดียวต่อไปนี้:
```
import { Square, Circle, Triangle } from "./modules/shapes.js";
```
## การโหลดโมดูลแบบไดนามิก (Dynamic module loading)

ฟีเจอร์ใหม่ล่าสุดของ JavaScript modules คือการโหลดโมดูลแบบไดนามิก  
สิ่งนี้ช่วยให้คุณสามารถโหลดโมดูลเมื่อจำเป็นต้องใช้เท่านั้น  
แทนที่จะต้องโหลดทุกอย่างล่วงหน้า

แน่นอนว่าสิ่งนี้มีข้อดีในแง่ของประสิทธิภาพที่ชัดเจน  
ลองอ่านต่อเพื่อดูว่าใช้งานอย่างไร

ฟีเจอร์ใหม่นี้ช่วยให้คุณเรียก `import()` ได้เหมือนกับฟังก์ชัน  
โดยส่ง path ของโมดูลที่ต้องการโหลดเป็นพารามิเตอร์

มันจะคืนค่าเป็น `Promise`  
ซึ่งเมื่อสำเร็จ จะให้ module object (ดูหัวข้อ Creating a module object)  
ซึ่งจะทำให้คุณสามารถเข้าถึง exports ของอ็อบเจกต์นั้นได้

ตัวอย่างเช่น:
```
import("./modules/myModule.js").then((module) => {
  // Do something with the module.
});
```
> 📝 **หมายเหตุ:**  
> การ import แบบไดนามิก (`import()`) สามารถใช้งานได้ใน main thread ของเบราว์เซอร์  
> รวมถึงใน shared worker และ dedicated worker  
> อย่างไรก็ตาม `import()` จะเกิดข้อผิดพลาด (throw)  
> หากเรียกใช้งานภายใน service worker หรือ worklet

ลองมาดูตัวอย่างกัน  
ในไดเรกทอรี `dynamic-module-imports` เรามีอีกหนึ่งตัวอย่างที่อ้างอิงจากตัวอย่าง `classes` ก่อนหน้านี้

แต่คราวนี้ เราจะไม่วาดอะไรลงบน canvas ทันทีที่โหลดหน้าเว็บ  
แทนที่จะเป็นแบบนั้น เราเพิ่มปุ่ม 3 ปุ่ม — "Circle", "Square" และ "Triangle"  
ซึ่งเมื่อผู้ใช้กดแต่ละปุ่ม  
จะมีการโหลดโมดูลที่จำเป็นแบบไดนามิก แล้วใช้โมดูลนั้นวาดรูปร่างที่เกี่ยวข้อง

ในตัวอย่างนี้ เราได้ทำการเปลี่ยนแปลงเฉพาะในไฟล์ `index.html` และ `main.js` เท่านั้น  
ส่วน exports ของโมดูลยังคงเหมือนเดิมทุกประการ

ที่ฝั่ง `main.js` เราใช้ `document.querySelector()` เพื่อดึงอ้างอิงถึงแต่ละปุ่ม  
ตัวอย่างเช่น:
```
const squareBtn = document.querySelector(".square");
```
จากนั้นเราจะผูก event listener ให้กับแต่ละปุ่ม  
เพื่อให้เมื่อถูกกด โมดูลที่เกี่ยวข้องจะถูกโหลดแบบไดนามิก  
และถูกใช้งานเพื่อวาดรูปร่าง:
```
squareBtn.addEventListener("click", () => {
  import("./modules/square.js").then((Module) => {
    const square1 = new Module.Square(
      myCanvas.ctx,
      myCanvas.listId,
      50,
      50,
      100,
      "blue",
    );
    square1.draw();
    square1.reportArea();
    square1.reportPerimeter();
  });
});
```
> 📝 **หมายเหตุ:**  
> เนื่องจาก `Promise` ที่สำเร็จจะคืนค่าเป็น module object  
> คลาสจึงกลายเป็นฟีเจอร์ย่อยภายในอ็อบเจกต์นั้น  
> ดังนั้นเราจึงต้องเรียก constructor โดยมี `Module.` นำหน้า เช่น:  
> `Module.Square(/* … */)`
ข้อดีอีกอย่างของการ import แบบไดนามิกคือ  
มันสามารถใช้งานได้เสมอ แม้ในสภาพแวดล้อมของสคริปต์ปกติ

ดังนั้น หากคุณมีแท็ก `<script>` ที่ไม่มี `type="module"` อยู่ใน HTML  
คุณก็ยังสามารถนำโค้ดที่ถูกแจกจ่ายเป็นโมดูลกลับมาใช้ใหม่ได้  
โดยการ import แบบไดนามิก
```
<script>
  import("./modules/square.js").then((module) => {
    // Do something with the module.
  });
  // Other code that operates on the global scope and is not
  // ready to be refactored into modules yet.
  var btn = document.querySelector(".square");
</script>
```
## Top level await

`Top level await` เป็นฟีเจอร์ที่สามารถใช้งานได้ภายในโมดูล  
ซึ่งหมายความว่าสามารถใช้คีย์เวิร์ด `await` ได้โดยตรงในระดับบนสุดของโมดูล

สิ่งนี้ทำให้โมดูลทำงานเหมือนกับฟังก์ชันแบบ asynchronous ขนาดใหญ่  
โดยที่โค้ดสามารถประเมินผลล่วงหน้าได้ก่อนถูกใช้งานในโมดูลแม่  
แต่ไม่ทำให้โมดูลพี่น้องที่อยู่ข้าง ๆ ถูกบล็อกไม่ให้โหลด

ลองมาดูตัวอย่างกัน  
คุณสามารถดูไฟล์และโค้ดทั้งหมดที่อธิบายในส่วนนี้ได้ในไดเรกทอรี `top-level-await`  
ซึ่งต่อยอดมาจากตัวอย่างก่อนหน้า

ขั้นแรก เราจะประกาศชุดสีของเราภายในไฟล์ `colors.json` แยกต่างหาก:
```json
{
  "yellow": "#F4D03F",
  "green": "#52BE80",
  "blue": "#5499C7",
  "red": "#CD6155",
  "orange": "#F39C12"
}
```
จากนั้นเราจะสร้างโมดูลชื่อ `getColors.js`  
ซึ่งจะใช้คำสั่ง `fetch` เพื่อโหลดไฟล์ `colors.json`  
และคืนค่าข้อมูลในรูปแบบของอ็อบเจกต์
```
// fetch request
const colors = fetch("../data/colors.json").then((response) => response.json());

export default await colors;
```
โปรดสังเกตบรรทัด `export` สุดท้ายในที่นี้

เราใช้คีย์เวิร์ด `await` ก่อนการกำหนดค่าคงที่ `colors` เพื่อทำการ export  
ซึ่งหมายความว่า โมดูลอื่นใดที่ import โมดูลนี้  
จะต้องรอจนกว่า `colors` จะถูกดาวน์โหลดและแปลงข้อมูลเสร็จเรียบร้อยก่อนจึงจะสามารถใช้งานได้

ตอนนี้เรามา import โมดูลนี้ในไฟล์ `main.js` ของเรากัน:
```
import colors from "./modules/getColors.js";
import { Canvas } from "./modules/canvas.js";

const circleBtn = document.querySelector(".circle");

// …
```
เราจะใช้ `colors` แทนที่สตริงที่เคยใช้ก่อนหน้านี้  
เมื่อต้องเรียกใช้ฟังก์ชันวาดรูปร่างของเรา:
```
const square1 = new Module.Square(
  myCanvas.ctx,
  myCanvas.listId,
  50,
  50,
  100,
  colors.blue,
);

const circle1 = new Module.Circle(
  myCanvas.ctx,
  myCanvas.listId,
  75,
  200,
  100,
  colors.green,
);

const triangle1 = new Module.Triangle(
  myCanvas.ctx,
  myCanvas.listId,
  100,
  75,
  190,
  colors.yellow,
);
```
สิ่งนี้มีประโยชน์เพราะโค้ดภายใน `main.js` จะยังไม่ถูกรัน  
จนกว่าโค้ดใน `getColors.js` จะทำงานเสร็จ

อย่างไรก็ตาม มันจะไม่บล็อกโมดูลอื่นจากการโหลด  
ตัวอย่างเช่น โมดูล `canvas.js` จะยังคงโหลดต่อไปได้  
ในขณะที่ `colors` กำลังถูกดึงข้อมูล
## คำสั่ง import จะถูก hoist (Import declarations are hoisted)

คำสั่ง `import` จะถูก hoist ขึ้นไปด้านบน  
ซึ่งในกรณีนี้หมายความว่า ค่า import เหล่านั้นจะสามารถใช้งานได้ภายในโค้ดของโมดูล  
แม้จะถูกเรียกใช้ก่อนจุดที่เขียนคำสั่ง import ก็ตาม

นอกจากนี้ side effects ของโมดูลที่ถูก import จะถูกรันก่อนที่โค้ดส่วนอื่นของโมดูลจะเริ่มทำงาน

ตัวอย่างเช่น ในไฟล์ `main.js` การ import `Canvas` ไว้ตรงกลางของโค้ดก็ยังคงสามารถทำงานได้:
```
// …
const myCanvas = new Canvas("myCanvas", document.body, 480, 320);
myCanvas.create();
import { Canvas } from "./modules/canvas.js";
myCanvas.createReportList();
// …
```
อย่างไรก็ตาม โดยทั่วไปถือว่าเป็นแนวปฏิบัติที่ดี  
ในการเขียนคำสั่ง `import` ทั้งหมดไว้ที่ด้านบนสุดของโค้ด  
เพราะจะช่วยให้การวิเคราะห์ dependencies ทำได้ง่ายขึ้น
## การ import แบบเวียน (Cyclic imports)

โมดูลสามารถ import โมดูลอื่นได้ และโมดูลเหล่านั้นก็สามารถ import โมดูลอื่นต่อไปได้เช่นกัน  
สิ่งนี้จะสร้างเป็นกราฟที่มีทิศทาง ซึ่งเรียกว่า “dependency graph”

ในโลกที่สมบูรณ์แบบ กราฟนี้จะไม่มีการวนซ้ำ (acyclic)  
ในกรณีนั้น กราฟสามารถประเมินผลได้โดยใช้การ traversal แบบ depth-first

อย่างไรก็ตาม ในความเป็นจริง วงจรมักเลี่ยงไม่ได้  
การ import แบบเวียน (cyclic import) จะเกิดขึ้นเมื่อโมดูล `a` import โมดูล `b`  
แต่ `b` กลับมีการพึ่งพา (โดยตรงหรือโดยอ้อม) กับ `a`

ตัวอย่างเช่น:
```
// -- a.js --
import { b } from "./b.js";

// -- b.js --
import { a } from "./a.js";

// Cycle:
// a.js ───> b.js
//  ^         │
//  └─────────┘
```
การ import แบบเวียน (cyclic imports) ไม่ได้ล้มเหลวเสมอไป

ค่าของตัวแปรที่ถูก import จะถูกดึงมาใช้ก็ต่อเมื่อมีการเรียกใช้งานตัวแปรนั้นจริง ๆ เท่านั้น  
(จึงอนุญาตให้มี live binding ได้)

และจะเกิด `ReferenceError` ก็ต่อเมื่อตัวแปรนั้นยังไม่ได้ถูกกำหนดค่า (uninitialized)  
ในขณะที่มีการใช้งานมัน
```
// -- a.js --
import { b } from "./b.js";

setTimeout(() => {
  console.log(b); // 1
}, 10);

export const a = 2;

// -- b.js --
import { a } from "./a.js";

setTimeout(() => {
  console.log(a); // 2
}, 10);

export const b = 1;
```
ในตัวอย่างนี้ ทั้ง `a` และ `b` ถูกใช้งานแบบ asynchronous  
ดังนั้นในขณะที่โมดูลถูกประเมินผล (evaluated)  
ค่าของ `b` หรือ `a` ยังไม่ถูกอ่านจริง  
ทำให้โค้ดที่เหลือสามารถทำงานต่อได้ตามปกติ  
และคำสั่ง `export` ทั้งสองก็จะให้ค่าของ `a` และ `b`

หลังจาก timeout ทำงานเสร็จ  
ทั้ง `a` และ `b` จะมีค่า และคำสั่ง `console.log` ทั้งสองก็จะทำงานตามปกติ

แต่ถ้าคุณเปลี่ยนโค้ดให้เรียกใช้ `a` แบบ synchronous  
การประเมินผลของโมดูลจะล้มเหลว
```
// -- a.js (entry module) --
import { b } from "./b.js";

export const a = 2;

// -- b.js --
import { a } from "./a.js";

console.log(a); // ReferenceError: Cannot access 'a' before initialization
export const b = 1;
```
สาเหตุคือ เมื่อ JavaScript ประเมินผล `a.js`  
มันจำเป็นต้องประเมิน `b.js` ก่อน เพราะเป็น dependency ของ `a.js`  
แต่ใน `b.js` มีการใช้งาน `a` ซึ่งในตอนนั้นยังไม่พร้อมใช้งาน

ในทางกลับกัน  
ถ้าคุณเปลี่ยนโค้ดให้ใช้ `b` แบบ synchronous แต่ใช้ `a` แบบ asynchronous  
การประเมินผลของโมดูลจะสำเร็จ
```
// -- a.js (entry module) --
import { b } from "./b.js";

console.log(b); // 1
export const a = 2;

// -- b.js --
import { a } from "./a.js";

setTimeout(() => {
  console.log(a); // 2
}, 10);
export const b = 1;
```
สาเหตุที่การประเมินผลสำเร็จ  
เป็นเพราะ `b.js` ถูกประเมินผลจนเสร็จสมบูรณ์  
ดังนั้นค่าของ `b` จึงพร้อมใช้งานเมื่อ `a.js` ถูกประเมิน

โดยทั่วไปแล้ว คุณควรหลีกเลี่ยงการ import แบบเวียน (cyclic imports) ในโปรเจกต์ของคุณ  
เพราะสิ่งนี้จะทำให้โค้ดมีแนวโน้มเกิดข้อผิดพลาดได้มากขึ้น

เทคนิคที่ใช้บ่อยในการหลีกเลี่ยงวงจรมีดังนี้:

- รวมสองโมดูลเข้าด้วยกันเป็นไฟล์เดียว
- ย้ายโค้ดที่ใช้ร่วมกันไปไว้ในโมดูลที่สาม
- ย้ายบางส่วนของโค้ดจากโมดูลหนึ่งไปอีกโมดูลหนึ่ง

อย่างไรก็ตาม การ import แบบเวียนก็สามารถเกิดขึ้นได้ในกรณีที่ไลบรารีพึ่งพากันเอง  
ซึ่งในกรณีแบบนี้จะแก้ไขได้ยากกว่า
## การเขียนโมดูลแบบ "isomorphic" (Authoring "isomorphic" modules)

การมาของโมดูลช่วยส่งเสริมให้ระบบนิเวศของ JavaScript  
กระจายและนำโค้ดกลับมาใช้ใหม่ในรูปแบบโมดูลได้ดีขึ้น  
แต่นั่นไม่ได้หมายความว่าโค้ด JavaScript จะสามารถรันได้ในทุกสภาพแวดล้อม

สมมติว่าคุณเจอโมดูลที่ใช้สร้าง hash แบบ SHA จากรหัสผ่านของผู้ใช้  
คุณสามารถใช้มันในฝั่งเบราว์เซอร์ได้ไหม?  
สามารถใช้มันใน Node.js server ได้ไหม?

คำตอบคือ: ขึ้นอยู่กับ

โมดูลยังคงเข้าถึงตัวแปร global ได้ ดังที่แสดงไว้ก่อนหน้านี้  
หากโมดูลอ้างถึง `window` แสดงว่ามันสามารถรันในเบราว์เซอร์ได้  
แต่จะโยน error หากรันใน Node.js เพราะไม่มี `window`

ในทำนองเดียวกัน หากโค้ดจำเป็นต้องใช้ `process` เพื่อให้ทำงานได้  
มันก็จะรันได้แค่ใน Node.js เท่านั้น

เพื่อให้โมดูลนำกลับมาใช้ได้สูงสุด  
จึงมักแนะนำให้เขียนโค้ดให้เป็น “isomorphic”  
หมายถึง โค้ดจะแสดงพฤติกรรมแบบเดียวกันในทุก runtime

สิ่งนี้มักทำได้โดยวิธีต่อไปนี้:

- แยกโมดูลของคุณออกเป็น “core” และ “binding”  
  โดยใน “core” จะเป็นโค้ดล้วน ๆ เช่น การคำนวณ hash  
  ไม่มีการเข้าถึง DOM, เครือข่าย, ไฟล์ระบบ และเปิดให้ใช้ฟังก์ชันช่วยต่าง ๆ  
  ส่วน “binding” สามารถอ่านหรือเขียนค่ากับ context ของสภาพแวดล้อม  
  เช่นในเบราว์เซอร์อาจอ่านค่าจาก input box  
  ส่วนใน Node อาจอ่านจาก `process.env`  
  ค่าที่อ่านมาไม่ว่าจากที่ใด จะถูกส่งไปยังฟังก์ชันเดียวกันใน core และจัดการเหมือนกัน

- ตรวจสอบก่อนว่า global ใดมีอยู่ก่อนจะใช้งาน  
  ตัวอย่างเช่น ถ้าคุณตรวจสอบว่า `typeof window === "undefined"`  
  คุณจะรู้ได้ว่าคุณอาจกำลังอยู่ใน Node.js และไม่ควรอ่านค่าจาก DOM
```
// myModule.js
let password;
if (typeof process !== "undefined") {
  // We are running in Node.js; read it from `process.env`
  password = process.env.PASSWORD;
} else if (typeof window !== "undefined") {
  // We are running in the browser; read it from the input box
  password = document.getElementById("password").value;
}
```
สิ่งนี้จะเหมาะสมกว่าหากทั้งสองทางเลือกสุดท้ายแล้วแสดงพฤติกรรมแบบเดียวกัน ("isomorphic")  
หากไม่สามารถให้ฟังก์ชันการทำงานแบบเดียวกันได้  
หรือหากการทำเช่นนั้นต้องโหลดโค้ดจำนวนมากในขณะที่มีส่วนใหญ่ที่ไม่ถูกใช้งานเลย  
การใช้ “binding” ที่แตกต่างกันจะเป็นทางเลือกที่ดีกว่า
- ใช้ polyfill เพื่อจัดเตรียมทางเลือกสำรองสำหรับฟีเจอร์ที่ไม่มีอยู่  
  ตัวอย่างเช่น หากคุณต้องการใช้ฟังก์ชัน `fetch`  
  ซึ่งรองรับเฉพาะใน Node.js ตั้งแต่เวอร์ชัน 18 ขึ้นไป  
  คุณสามารถใช้ API ที่คล้ายกัน เช่น `node-fetch` แทนได้

  คุณสามารถทำสิ่งนี้แบบมีเงื่อนไขได้โดยใช้ dynamic import:
```
// myModule.js
if (typeof fetch === "undefined") {
  // We are running in Node.js; use node-fetch
  globalThis.fetch = (await import("node-fetch")).default;
}
// …
```
ตัวแปร `globalThis` เป็นอ็อบเจกต์ global  
ซึ่งมีอยู่ในทุกสภาพแวดล้อม และมีประโยชน์หากคุณต้องการอ่านหรือสร้างตัวแปร global ภายในโมดูล

แนวทางปฏิบัติเหล่านี้ไม่ใช่สิ่งที่จำกัดเฉพาะกับโมดูลเท่านั้น  
แต่อย่างไรก็ตาม ด้วยแนวโน้มของการนำโค้ดกลับมาใช้ซ้ำและการแยกโค้ดเป็นโมดูล  
คุณจึงควรเขียนโค้ดให้สามารถทำงานข้ามแพลตฟอร์มได้  
เพื่อให้โค้ดของคุณสามารถถูกใช้งานได้โดยผู้คนจำนวนมากที่สุด

รันไทม์อย่าง Node.js เองก็มีการพัฒนาอย่างต่อเนื่อง  
เพื่อรองรับ web API ต่าง ๆ เท่าที่เป็นไปได้  
เพื่อเพิ่มความสามารถในการทำงานร่วมกับเว็บให้ดียิ่งขึ้น

## การแก้ไขปัญหา (Troubleshooting)

นี่คือเคล็ดลับบางประการที่จะช่วยคุณ หากคุณพบปัญหาในการทำให้โมดูลของคุณทำงานได้  
หากคุณค้นพบเพิ่มเติม ก็สามารถเพิ่มเข้าไปในรายการนี้ได้ตามต้องการ!

- เราเคยพูดถึงเรื่องนี้ไปแล้ว แต่อยากย้ำอีกครั้ง:  
  ไฟล์ `.mjs` จำเป็นต้องถูกโหลดด้วย MIME-type ที่เป็น `text/javascript`  
  (หรือ MIME-type ที่เข้ากันได้กับ JavaScript อื่น ๆ ก็ได้ แต่แนะนำให้ใช้ `text/javascript`)  
  มิฉะนั้นคุณจะพบกับข้อผิดพลาดแบบ strict MIME type checking  
  เช่น `"The server responded with a non-JavaScript MIME type"`

- หากคุณพยายามโหลดไฟล์ HTML แบบ local (เช่น ผ่าน URL แบบ `file://`)  
  คุณจะเจอกับ CORS error เนื่องจากข้อกำหนดด้านความปลอดภัยของ JavaScript modules  
  คุณจำเป็นต้องทดสอบผ่านเซิร์ฟเวอร์เท่านั้น  
  GitHub Pages เป็นตัวเลือกที่เหมาะสมเพราะมันให้บริการไฟล์ `.mjs` พร้อม MIME-type ที่ถูกต้องด้วย

- เนื่องจาก `.mjs` เป็นนามสกุลไฟล์ที่ไม่เป็นมาตรฐาน  
  บางระบบปฏิบัติการอาจไม่รู้จัก หรือพยายามแทนที่ด้วยอย่างอื่น  
  ตัวอย่างเช่น เราพบว่า macOS แอบเพิ่ม `.js` ต่อท้ายไฟล์ `.mjs`  
  และซ่อนนามสกุลไฟล์โดยอัตโนมัติ  
  ทำให้ไฟล์ของเรากลายเป็น `x.mjs.js` โดยไม่รู้ตัว  
  เมื่อเราปิดการซ่อนนามสกุลไฟล์อัตโนมัติ และฝึกให้ระบบยอมรับ `.mjs`  
  ทุกอย่างก็กลับมาใช้งานได้ตามปกติ
## ดูเพิ่มเติม (See also)

- [JavaScript modules on v8.dev (2018)](https://v8.dev/features/modules)
- [ES modules: A cartoon deep-dive on hacks.mozilla.org (2018)](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [ES6 in Depth: Modules on hacks.mozilla.org (2015)](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
- [Exploring JS, Ch.16: Modules by Dr. Axel Rauschmayer](https://exploringjs.com/es6/ch_modules.html)
