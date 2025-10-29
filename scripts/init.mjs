#!/usr/bin/env node
import fs from "fs";
import path from "path";
import readline from "readline";

const root = process.cwd();

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

function toSlug(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_\s]/g, "")
    .replace(/\s+/g, "-");
}

async function main() {
  const pkgPath = path.join(root, "package.json");
  const appJsonPath = path.join(root, "app.json");

  if (!fs.existsSync(pkgPath) || !fs.existsSync(appJsonPath)) {
    console.error(
      "Cannot find package.json or app.json. Run from project root."
    );
    process.exit(1);
  }

  const pkg = readJson(pkgPath);
  const appJson = readJson(appJsonPath);

  const defaultName = appJson?.expo?.name || pkg.name || "my-expo-app";
  const defaultSlug = appJson?.expo?.slug || toSlug(defaultName);

  const nameArg = process.argv
    .find((a) => a.startsWith("--name="))
    ?.split("=")[1];
  const slugArg = process.argv
    .find((a) => a.startsWith("--slug="))
    ?.split("=")[1];

  const appName =
    nameArg || (await prompt(`App name [${defaultName}]: `)) || defaultName;
  const appSlug =
    slugArg || (await prompt(`App slug [${defaultSlug}]: `)) || defaultSlug;

  // Update package.json name (npm package name can be scoped or simple)
  pkg.name = toSlug(appSlug) || pkg.name;

  // Update app.json expo fields
  appJson.expo = appJson.expo || {};
  appJson.expo.name = appName;
  appJson.expo.slug = appSlug;

  writeJson(pkgPath, pkg);
  writeJson(appJsonPath, appJson);

  console.log("Updated package.json and app.json");
  console.log(`  name: ${pkg.name}`);
  console.log(`  expo.name: ${appJson.expo.name}`);
  console.log(`  expo.slug: ${appJson.expo.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
