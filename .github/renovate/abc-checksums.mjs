import { readFileSync, writeFileSync } from "node:fs";

const ver = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(ver)) throw new Error(`bad version: ${ver}`);

const file = "defaults/main.yml";
const src = readFileSync(file, "utf8");
if (new RegExp(`^  ${ver.replaceAll(".", "\\.")}:$`, "m").test(src)) process.exit(0);

const mirror = "https://github.com/bradfordwagner/go-azure-blob-cli/releases/download";
const sumsUrl = `${mirror}/${ver}/checksums.txt`;
const res = await fetch(sumsUrl);
if (!res.ok) throw new Error(`${sumsUrl}: ${res.status}`);

const prefix = `go-azure-blob-cli_${ver}_`;
const lines = [`  # ${sumsUrl}`, `  ${ver}:`];
for (const [sum, name] of (await res.text()).trim().split("\n").map((l) => l.trim().split(/\s+/))) {
  if (!name.startsWith(prefix) || !name.endsWith(".tar.gz")) continue;
  lines.push(`    # ${mirror}/${ver}/${name}`, `    ${name.slice(prefix.length, -".tar.gz".length)}: sha256:${sum}`);
}
if (lines.length === 2) throw new Error(`no .tar.gz entries in ${sumsUrl}`);

writeFileSync(file, src.replace(/^abc_checksums:\n/m, `abc_checksums:\n${lines.join("\n")}\n`));
