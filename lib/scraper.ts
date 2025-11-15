// lib/scraper.ts
import axios from "axios";
import * as cheerio from "cheerio";
import { Project } from "../types/project";

const USE_MOCK = process.env.USE_MOCK_SCRAPER === "true";

export async function mockProjects(city: string): Promise<Project[]> {
  const sample: Project[] = [
    {
      id: `mock-1-${city}`,
      name: `${city} Heights`,
      location: `${city} Central`,
      price: "Rs 50L - 80L",
      builder: "Acme Builders",
      latitude: 17.385044,
      longitude: 78.486671,
    },
    {
      id: `mock-2-${city}`,
      name: `${city} Residency`,
      location: `${city} West`,
      price: "Rs 70L - 1.2Cr",
      builder: "Nova Constructions",
      latitude: 17.395,
      longitude: 78.49,
    },
  ];
  return sample;
}

export async function scrapeMagicBricks(city: string): Promise<Project[]> {
  if (USE_MOCK) return mockProjects(city);

  const urlCity = encodeURIComponent(city);
  const url = `https://www.magicbricks.com/new-projects-${urlCity}`;
  const res = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml",
    },
    timeout: 15000,
  });

  const html = res.data;
  const $ = cheerio.load(html);
  const projects: Project[] = [];

  // NOTE: MagicBricks DOM changes — these selectors are conservative examples.
  // Inspect the site and update selectors if you see no items.
  // We'll attempt multiple fallback selectors.
  const candidates = $("a[title], .mb-srp-card__details, .projectCard, article, .srpCard");

  candidates.each((i, el) => {
    const el$ = $(el);
    const name =
      el$.find(".projectTitle, .mb-srp__title, h3, .title").first().text().trim() ||
      el$.attr("title") ||
      el$.find("h2").text().trim();

    const location =
      el$.find(".locality, .mb-srp__locality, .location").first().text().trim() ||
      el$.find(".address").text().trim();

    const price =
      el$.find(".price, .mb-srp__price, .priceRange").first().text().trim() ||
      "";

    const builder =
      el$.find(".builderName, .mb-srp__builder, .builder").first().text().trim() || "";

    if (name) {
      projects.push({
        id: `${i}-${name.slice(0, 30).replace(/\s+/g, "-")}`,
        name,
        location: location || city,
        price,
        builder,
      });
    }
  });

  if (projects.length === 0) {
    // fallback to mock if selectors failed
    return mockProjects(city);
  }

  return projects;
}
