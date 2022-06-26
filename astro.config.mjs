import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import NetlifyCMS from "astro-netlify-cms";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		NetlifyCMS({
			config: {
				backend: {
					name: "git-gateway",
					branch: "main",
				},
				collections: [
					{
						name: "recipe",
						label: "Recipes",
						label_singular: "Recipe",
						folder: "src/pages/recipe/",
						create: true,
						delete: true,
						fields: [
							{ name: "setup", widget: "hidden", default: "import Layout from \\\"../../layouts/PostLayout.astro\\\""},
							{ name: "publishDate", widget: "datetime", format: "yyyy-MM-DD", time_format: false, label: "Publish Date" },
							{ name: "title", widget: "string", label: "Recipe Title" },
							{ name: "description", widget: "text", label: "Description", required: false },
							{ name: "category", widget: "string", label: "Category" },
							{ name: "keyIngredient", widget: "string", label: "Key Ingredient", required: false },
							{ name: "body", widget: "markdown", label: "Content" },
						],
					},
				],
			},
			// previewStyles: ["src/styles/base.css"],
		}),
	],
});
