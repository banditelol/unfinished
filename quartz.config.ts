import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import dotenv from 'dotenv'; 
dotenv.config();  // Load environment variables from .env file 

function getTransformer() {
  const env: string | undefined = process.env.ENV;
  const transformers = [
    Plugin.FrontMatter(),
    Plugin.CreatedModifiedDate({
      priority: ["frontmatter", "filesystem"],
    }),
    Plugin.Latex({ renderEngine: "katex" }),
    Plugin.SyntaxHighlighting({
      theme: {
        light: "github-light",
        dark: "github-dark",
      },
      keepBackground: false,
    }),
    Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
    Plugin.GitHubFlavoredMarkdown(),
    Plugin.TableOfContents(),
    Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
    Plugin.Description(),
  ];
  if (env === "Debug") {
    return transformers;
  }
  return transformers;
}

const config: QuartzConfig = {
  configuration: {
    pageTitle: "(un)Finished",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    baseUrl: "unfinished.adityarp.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
      },
    },
    locale: "en-US"
  },
  plugins: {
    transformers: getTransformer(),
    filters: [Plugin.RemoveDrafts(), Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources({ fontOrigin: "googleFonts" }),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
