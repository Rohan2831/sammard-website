import fs from "node:fs";
import path from "node:path";

// Server-only helpers that look at `public/assets/` at build time, so the team
// can add photos by dropping files in (and listing them) without code changes.

const PUBLIC = path.join(process.cwd(), "public");
const VIDEO = /\.(mp4|webm|mov)$/i;
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

export interface MediaListEntry {
  src: string;
  type: "image" | "video";
  alt: string;
  /** Any further `|`-separated columns (e.g. the gallery's category). */
  extra: string[];
}

/**
 * Reads `public/assets/<folder>/images.txt`: one `file-name.jpg | description | …`
 * per line, `#` comments. A file name starting with `/` is a site path (e.g. a
 * shared video). Listed files that aren't there yet are skipped, so the list
 * can be written before the photos arrive.
 */
export function readMediaList(folder: string): MediaListEntry[] {
  let list: string;
  try {
    list = fs.readFileSync(path.join(PUBLIC, "assets", folder, "images.txt"), "utf8");
  } catch {
    return [];
  }

  return list.split(/\r?\n/).flatMap((line) => {
    const [file, alt, ...extra] = line.split("|").map((part) => part.trim());
    if (!file || file.startsWith("#")) return [];
    const src = file.startsWith("/") ? file : `/assets/${folder}/${file}`;
    if (!fs.existsSync(path.join(PUBLIC, src))) return [];
    return [{ src, type: VIDEO.test(file) ? "video" : "image", alt: alt || file, extra }];
  });
}

/** "Jermy K. Varkey" -> "jermy-k-varkey": the file name a photo of that person is looked up by. */
export function toFileName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** URL of `public/assets/<folder>/<name>.{jpg,jpeg,png,webp}` if one exists. */
export function findImage(folder: string, name: string): string | undefined {
  const ext = IMAGE_EXTENSIONS.find((e) => fs.existsSync(path.join(PUBLIC, "assets", folder, `${name}.${e}`)));
  return ext && `/assets/${folder}/${name}.${ext}`;
}
