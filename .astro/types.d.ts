declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// This needs to be in sync with ImageMetadata
	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"recipe": {
"apple-cider-detox.md": {
  id: "apple-cider-detox.md",
  slug: "apple-cider-detox",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"beef-noodle-skillet.md": {
  id: "beef-noodle-skillet.md",
  slug: "beef-noodle-skillet",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"beef-stroganoff.md": {
  id: "beef-stroganoff.md",
  slug: "beef-stroganoff",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"breakfast-tater-tot-casserole.md": {
  id: "breakfast-tater-tot-casserole.md",
  slug: "breakfast-tater-tot-casserole",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"buffalo-chicken-dip.md": {
  id: "buffalo-chicken-dip.md",
  slug: "buffalo-chicken-dip",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"carbonara.md": {
  id: "carbonara.md",
  slug: "carbonara",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"cheesy-pasta.md": {
  id: "cheesy-pasta.md",
  slug: "cheesy-pasta",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"chicken-enchiladas.md": {
  id: "chicken-enchiladas.md",
  slug: "chicken-enchiladas",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"chicken-soup.md": {
  id: "chicken-soup.md",
  slug: "chicken-soup",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"chicken-tetrazzini.md": {
  id: "chicken-tetrazzini.md",
  slug: "chicken-tetrazzini",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"coconut-macaroons.md": {
  id: "coconut-macaroons.md",
  slug: "coconut-macaroons",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"cowboy-spaghetti.md": {
  id: "cowboy-spaghetti.md",
  slug: "cowboy-spaghetti",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"deluxe-chocolate-chip-cookies.md": {
  id: "deluxe-chocolate-chip-cookies.md",
  slug: "deluxe-chocolate-chip-cookies",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"easy-goulash.md": {
  id: "easy-goulash.md",
  slug: "easy-goulash",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"free-state-cheddar-ale-soup.md": {
  id: "free-state-cheddar-ale-soup.md",
  slug: "free-state-cheddar-ale-soup",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"marsala.md": {
  id: "marsala.md",
  slug: "marsala",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"pancakes.md": {
  id: "pancakes.md",
  slug: "pancakes",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"scarpariello.md": {
  id: "scarpariello.md",
  slug: "scarpariello",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"shepherds-pie.md": {
  id: "shepherds-pie.md",
  slug: "shepherds-pie",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"sloppy-joes.md": {
  id: "sloppy-joes.md",
  slug: "sloppy-joes",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"spinach-dip-fresh.md": {
  id: "spinach-dip-fresh.md",
  slug: "spinach-dip-fresh",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"texas-sheet-cake.md": {
  id: "texas-sheet-cake.md",
  slug: "texas-sheet-cake",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
"tortilla-soup.md": {
  id: "tortilla-soup.md",
  slug: "tortilla-soup",
  body: string,
  collection: "recipe",
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
