// const fs=require('fs');
// console.log(fs);
// const data=fs.readFileSync("assets/poem.txt",{ encoding: "utf8" });
// console.log(data);
// fs.readFile("assets/poem.txt", { encoding: "utf8" }, (err, data) => {
//   console.log(data);
// });

// const fsPromises = require("fs/promises");

// async function main() {
//   const data = await fsPromises.readFile("assets/poem.txt", {
//     encoding: "utf8",
//   });
//   console.log(data);
// }

// main();
// fs.writeFileSync("assets/output.txt", "Hello, freeCodeCamp!");
// const data=fs.readFileSync("assets/output.txt",{ encoding: "utf8" });
// fs.appendFileSync("assets/output.txt", "\nThis is the Second line");
// console.log(data);

// const exists=fs.existsSync("assets/output.txt");
// const files=fs.readdirSync("assets");
// const buf = Buffer.from("Hello,Node!");
// console.log(buf.toString("hex")); // 48656c6c6f
// console.log(buf.toString("base64")); // SGVsbG8=
// console.log(buf); 
// const buf2 = Buffer.alloc(8, 0xff);
// console.log(buf2); 
// console.log(files);
// const decoded = Buffer.from("ZnJlZUNvZGVDYW1w", "base64").toString("utf8");
// console.log(decoded); 
// const crypto=require("crypto");
// const hash=crypto.createHash("sha256").update("hello.").digest("hex");
// console.log(hash);
// const random=crypto.randomBytes(16).toString("hex");
// console.log(random);
// const id = crypto.randomUUID();
// console.log(id);
// const os=require("os");
// console.log(os.platform());
// console.log(os.arch());
// console.log(os.hostname());
// console.log(os.totalmem());
// console.log(os.freemem());
// console.log(os.uptime());
// console.log(os.cpus().length); 
// const path = require("path");
// const filePath = path.join(__dirname, "assets", "poem.txt");
// // console.log(filePath);
// console.log(path.basename(filePath));
// console.log(path.dirname(filePath));
// console.log(path.extname(filePath));

// console.log(path.join("assets", "..", "server.js")); // assets/../server.js → assets/../server.js (relative)
// console.log(path.resolve("assets", "..", "server.js")); // /absolute/path/to/server.js

// const parts = path.parse(filePath);
// console.log(parts);

// console.log(process.version);
// console.log(process.platform);
// console.log(process.env.NODE_ENV);
// console.log(process.argv);
// process.stdout.write("Hello from stdout\n"); // newline only when you add \n
// process.stderr.write("Hello from stderr\n");

const fs = require("fs");
// const readable = fs.createReadStream("assets/poem.txt", { encoding: "utf8" });

// readable.on("data", (chunk) => {
//   console.log(chunk);
// });

// readable.on("end", () => {
//   console.log("Done reading");
// });
// const writable = fs.createWriteStream("assets/stream-output.txt");
// writable.write("First chunk\n");
// writable.write("Second chunk\n");
// writable.end();

const readable = fs.createReadStream("assets/poem.txt");
const writable = fs.createWriteStream("assets/stream-output.txt");
readable.pipe(writable);