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

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
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
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"recipe": {
"apple-cider-detox.md": {
	id: "apple-cider-detox.md";
  slug: "apple-cider-detox";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"beef-noodle-skillet.md": {
	id: "beef-noodle-skillet.md";
  slug: "beef-noodle-skillet";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"beef-stroganoff.md": {
	id: "beef-stroganoff.md";
  slug: "beef-stroganoff";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"breakfast-tater-tot-casserole.md": {
	id: "breakfast-tater-tot-casserole.md";
  slug: "breakfast-tater-tot-casserole";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"buffalo-chicken-dip.md": {
	id: "buffalo-chicken-dip.md";
  slug: "buffalo-chicken-dip";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"buffalo-chicken-pasta.md": {
	id: "buffalo-chicken-pasta.md";
  slug: "buffalo-chicken-pasta";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"carbonara.md": {
	id: "carbonara.md";
  slug: "carbonara";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"cheesy-pasta.md": {
	id: "cheesy-pasta.md";
  slug: "cheesy-pasta";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"chicken-enchiladas.md": {
	id: "chicken-enchiladas.md";
  slug: "chicken-enchiladas";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"chicken-soup.md": {
	id: "chicken-soup.md";
  slug: "chicken-soup";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"chicken-tetrazzini.md": {
	id: "chicken-tetrazzini.md";
  slug: "chicken-tetrazzini";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"coconut-macaroons.md": {
	id: "coconut-macaroons.md";
  slug: "coconut-macaroons";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"cowboy-spaghetti.md": {
	id: "cowboy-spaghetti.md";
  slug: "cowboy-spaghetti";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"creamy-chicken-pasta.md": {
	id: "creamy-chicken-pasta.md";
  slug: "creamy-chicken-pasta";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"deluxe-chocolate-chip-cookies.md": {
	id: "deluxe-chocolate-chip-cookies.md";
  slug: "deluxe-chocolate-chip-cookies";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"dipping-sauce.md": {
	id: "dipping-sauce.md";
  slug: "dipping-sauce";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"draft-spinach-dip-frozen.md": {
	id: "draft-spinach-dip-frozen.md";
  slug: "draft-spinach-dip-frozen";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"draft-sugar-cookies.md": {
	id: "draft-sugar-cookies.md";
  slug: "draft-sugar-cookies";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"easy-goulash.md": {
	id: "easy-goulash.md";
  slug: "easy-goulash";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"free-state-cheddar-ale-soup.md": {
	id: "free-state-cheddar-ale-soup.md";
  slug: "free-state-cheddar-ale-soup";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"lunchbox-brownies.md": {
	id: "lunchbox-brownies.md";
  slug: "lunchbox-brownies";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"marsala.md": {
	id: "marsala.md";
  slug: "marsala";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"pancakes.md": {
	id: "pancakes.md";
  slug: "pancakes";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"scarpariello.md": {
	id: "scarpariello.md";
  slug: "scarpariello";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"shepherds-pie.md": {
	id: "shepherds-pie.md";
  slug: "shepherds-pie";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"sloppy-joes.md": {
	id: "sloppy-joes.md";
  slug: "sloppy-joes";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"spinach-dip-fresh.md": {
	id: "spinach-dip-fresh.md";
  slug: "spinach-dip-fresh";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"texas-sheet-cake.md": {
	id: "texas-sheet-cake.md";
  slug: "texas-sheet-cake";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
"tortilla-soup.md": {
	id: "tortilla-soup.md";
  slug: "tortilla-soup";
  body: string;
  collection: "recipe";
  data: InferEntrySchema<"recipe">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"posts": {
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
