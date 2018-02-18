// tslint:disable
import { USDAReport } from './usda.model';

export interface USDAFoods {
	number_of_foods?: string;
	not_found?: string;
	api_version?: string;
}
export interface USDAFood {
	report_type?: string;
	report_version?: string;
}

export interface USDADescMeta {
	ndb_food_number?: string;
	food_name?: string;
	short_description?: string;
	food_group?: string;
	scientific_name?: string;
	commercial_name?: string;
	manufacture_?: string;
	nitrogen_to_protein_conversion_factor?: string;
	carbohydrate_factor?: string;
	fat_factor?: string;
	protein_factor?: string;
	refuse?: string;
	refuse_description?: string;
	database_source?: string;
	reporting_unit?: string;
	list_of_ingredients?: string;
}

export interface USDAIngredients {
	last_updated_by_company?: string;
	metadata_nutrient?: string;
}

export interface USDANutrient {
	nutrient_number?: string;
	nutrient_name?: string;
	list_of_source_id?: string;
	how_value_was_derived?: string;
	unit_of_measure?: string;
	equivalent_100g?: string;
	data_point_count?: string;
	standard_error?: string;
	measures?: string;
}

export interface USDAMeasures {
	name?: string;
	e_unit_equivalent?: string;
	equivalent_unit?: string;
	gram_equivalent?: string;
	reference_source?: string;
}

export interface USDALangual {
	food_LANGUAL_codes?: string;
	langual_code?: string;
	description_of_code?: string;
}

export interface USDAFootnote {
	footnote_id?: string;
	food_note_text?: string;
}

export interface USDASource {
	name_of_reference?: string;
	authors_of_the_report?: string;
	volume?: string;
	issue?: string;
	publication_year?: string;
	start_page?: string;
	end_page?: string;
}

export interface USDAList {
	q: string;
	item: USDAItem[];
	ds: string;
	start: number;
	end: number;
	offset: number;
	total: number;
	sort: string;
	fg: string;
	sr: string;
}

export interface USDAItem {
	ndbno?: string;
	name?: string;
	group?: string;
	ds?: string;
	offset?: number;
}

export interface USDASearchResponse {
	list: {
		ds: string;
		end: number;
		group: string;
		item: USDAItem[];
		q: string;
		sort: string;
		sr: string;
		start: number;
		total: number;
	};
}

// Not sure why this works and the <t> | <k> doesnt
export type USDASearchResult = (
	USDAReport
	& USDAItem[]
	& {
		list: USDAList
	}
	& USDASearchResponse
);
