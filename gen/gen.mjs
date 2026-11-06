// usage: node gen/gen.mjs <model> <promptFile> <out.png> '<json extra input>' [refImage]
import fs from "node:fs";
const key = fs.readFileSync(".env", "utf8").match(/^KIE_AI_API_KEY=(.+)$/m)[1].trim();
const H = { "Content-Type": "application/json", Authorization: `Bearer ${key}` };
const [model, pf, out, extra = "{}", ref] = process.argv.slice(2);
const input = { prompt: fs.readFileSync(pf, "utf8"), ...JSON.parse(extra) };
if (ref) {
  const ext = ref.split(".").pop().replace("jpg", "jpeg");
  const up = await (await fetch("https://kieai.redpandaai.co/api/file-base64-upload", { method: "POST", headers: H,
    body: JSON.stringify({ base64Data: `data:image/${ext};base64,${fs.readFileSync(ref).toString("base64")}`, uploadPath: "vca", fileName: ref.split("/").pop() }) })).json();
  const url = up?.data?.downloadUrl || up?.data?.fileUrl;
  if (!url) throw new Error("upload: " + JSON.stringify(up));
  input[input.__refkey || "image_input"] = [url]; delete input.__refkey;
}
const c = await (await fetch("https://api.kie.ai/api/v1/jobs/createTask", { method: "POST", headers: H, body: JSON.stringify({ model, input }) })).json();
if (c.code !== 200) throw new Error("createTask: " + JSON.stringify(c));
for (let i = 0; i < 120; i++) {
  await new Promise((r) => setTimeout(r, 5000));
  const d = (await (await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${c.data.taskId}`, { headers: H })).json()).data || {};
  if (d.state === "success") {
    const urls = JSON.parse(d.resultJson).resultUrls;
    fs.writeFileSync(out, Buffer.from(await (await fetch(urls[0])).arrayBuffer()));
    console.log("ok", out); process.exit(0);
  }
  if (d.state === "fail") { console.log("FAIL", model, d.failMsg || d.failCode); process.exit(1); }
}
console.log("timeout", model);
