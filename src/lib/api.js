import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { list, uploadData } from "aws-amplify/storage";
import awsconfig from "../aws-exports";
import * as queries from "../graphql/queries";
import { S3_PUBLIC_URL } from "./config";

Amplify.configure(awsconfig);

const client = generateClient();

/** Run a GraphQL operation and return `data`. */
export async function gql(query, variables = {}) {
  const res = await client.graphql({ query, variables });
  return res.data;
}

/** Fetch every item of a list query (follows nextToken pagination). */
async function listAll(queryName, extra = {}) {
  const items = [];
  let nextToken = null;
  do {
    const data = await gql(queries[queryName], { limit: 1000, nextToken, ...extra });
    const page = data[queryName];
    items.push(...page.items.filter(Boolean));
    nextToken = page.nextToken;
  } while (nextToken);
  return items;
}

const byDesc = (key) => (a, b) => (b[key] ?? 0) - (a[key] ?? 0);
const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

export async function getBesturen() {
  return (await listAll("listBesturens")).sort(byDesc("seq_num"));
}

export async function getHuidigBestuur() {
  return (await getBesturen())[0] ?? null;
}

/**
 * Jaarclubs/lichtingen, newest first. When two groups share a year they are
 * labelled "-I" (oldest) and "-II" (newest), as on the old site.
 */
export async function getJaren() {
  const jaren = (await listAll("listJarens")).sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  const counts = {};
  jaren.forEach((j) => (counts[j.year] = (counts[j.year] || 0) + 1));
  const seen = {};
  return jaren.map((j) => {
    const members = (j.members || "")
      .split(";")
      .map((m) => m.trim())
      .filter(Boolean);
    let label = String(j.year);
    if (counts[j.year] > 1) {
      seen[j.year] = (seen[j.year] || 0) + 1;
      label += "-" + "I".repeat(seen[j.year]);
    }
    return { ...j, label, memberList: members };
  });
}

export async function getPlaybacks() {
  return (await listAll("listPlaybacks"))
    .sort(byDesc("year"))
    .map((p) => ({ ...p, winner: p.cancelled === "t" ? "Afgelast" : p.winner }));
}

export async function getPbInfo() {
  return (await listAll("listPbss")).sort(byNewest)[0] ?? null;
}

export async function getVaps() {
  return (await listAll("listVapss")).sort((a, b) => a.num - b.num);
}

export async function getDkc() {
  return (await listAll("listOverigs")).sort(byNewest)[0] ?? null;
}

export async function getGalaAanwezigen() {
  return (await listAll("listGalaAanwezigens")).sort((a, b) => a.year - b.year);
}

/** All photos in the public S3 folder (photo uploads use dashed UUID names). */
export async function getPhotos() {
  const { items } = await list({ path: "public/", options: { listAll: true } });
  return items
    .filter((i) => i.path.slice("public/".length).includes("-"))
    .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified))
    .map((i) => S3_PUBLIC_URL + i.path.slice("public/".length));
}

/** Upload a file to the public S3 folder and return its public URL. */
export async function uploadPublic(name, file) {
  await uploadData({
    path: "public/" + name,
    data: file,
    options: { contentType: file.type || "image/png" },
  }).result;
  return S3_PUBLIC_URL + name;
}
