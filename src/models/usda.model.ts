export interface USDARequestOptions {
	search?: USDASearchParams;
	list?: USDAListParams;
	report?: USDAReportParams;
}

export interface USDASearchParams {
	queries?: string[];
	foodGroupId?: string;
	dataSource: 'Branded Food Products' | 'Standard Reference';
	pagination?: {
		offset?: number;
		max?: number;
		total?: number;
	};
}

export interface USDAListParams {
	pagination?: {
		offset?: number;
		max?: number;
		total?: number;
	};
	groupFilter: string;
	version: string;
}

export interface USDAReportParams {
	n_db: string;
	report_type?: string;
	response_format?: string;
}
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

export interface USDAReport {
	request_params: {
		api_key: string;
		n_db: string;
		report_type: string;
		response_format: string;
	};
	foods: {
		number_of_foods: string;
		not_found: string;
		api_version: string;
	};
	food: {
		report_type: string;
		report_version: string;
	};
	desc: {
		ndb_food_number: string;
		food_name: string;
		short_description: string;
		food_group: string;
		scientific_name: string;
		commercial_name: string;
		manufacture_: string;
		nitrogen_to_protein_conversion_factor: string;
		carbohydrate_factor: string;
		fat_factor: string;
		protein_factor: string;
		refuse: string;
		refuse_description: string;
		database_source: string;
		reporting_unit: string;
		list_of_ingredients: string;
	};
	ingredients: {
		last_updated_by_company: string;
		metadata_nutrient: string;
	};
	nutrient: {
		nutrient_number: string;
		nutrient_name: string;
		list_of_source_id: string;
		how_value_was_derived: string;
		unit_of_measure: string;
		equivalent_100g: string;
		data_point_count: string;
		standard_error: string;
		measures: string;
	};
	measures: {
		name: string;
		e_unit_equivalent: string;
		equivalent_unit: string;
		gram_equivalent: string;
		reference_source: string;
	};
	source: {
		name_of_reference: string;
		authors_of_the_report: string;
		volume: string;
		issue: string;
		publication_year: string;
		start_page: string;
		end_page: string;
	};
	footnote: {
		footnote_id: string;
		food_note_text: string;
	};
	langual: {  // LANGUAL codes assigned string;
		food_LANGUAL_codes: string;
		langual_code: string;
		description_of_code: string;
	};
}

export const USDA_REPORT_KEYS: USDAReport = {
	request_params: {
		api_key: 'api_key',
		n_db: 'ndbno',
		report_type: 'type',
		response_format: 'format',
	},
	food: {
		report_type: 'type',
		report_version: 'sr',
	},
	foods: {
		number_of_foods: 'count',
		not_found: 'notfound',
		api_version: 'api'
	},
	desc: {
		ndb_food_number: 'ndbno',
		food_name: 'name',
		short_description: 'sd',
		food_group: 'group',
		scientific_name: 'sn',
		commercial_name: 'cn',
		manufacture_: 'manu',
		nitrogen_to_protein_conversion_factor: 'nf',
		carbohydrate_factor: 'cf',
		fat_factor: 'ff',
		protein_factor: 'pf',
		refuse: 'r',
		refuse_description: 'rd',
		database_source: 'ds',
		reporting_unit: 'ru',
		list_of_ingredients: 'desc'
	},
	ingredients: {
		last_updated_by_company: 'upd',
		metadata_nutrient: 'nutrient',
	},
	nutrient: {
		nutrient_number: 'nutrient_id',
		nutrient_name: 'name',
		list_of_source_id: 'sourcecode',
		how_value_was_derived: 'derivation',
		unit_of_measure: 'unit',
		equivalent_100g: 'value',
		data_point_count: 'dp',
		standard_error: 'se',
		measures: 'measures',
	},
	measures: {
		name: 'label',
		e_unit_equivalent: 'eqv',
		equivalent_unit: 'eunit',
		gram_equivalent: 'value',
		reference_source: 'source',
	},
	source: {
		name_of_reference: 'title',
		authors_of_the_report: 'authors',
		volume: 'vol',
		issue: 'iss',
		publication_year: 'year',
		start_page: 'start',
		end_page: 'end',
	},
	footnote: {
		footnote_id: 'idv',
		food_note_text: 'desc',
	},
	langual: {  // LANGUAL codes assigned to the food
		food_LANGUAL_codes: 'langual',
		langual_code: 'code',
		description_of_code: 'desc'
	}
};

export const USDA_SEARCH_KEYS = {
	apiKey: 'api_key',
	search_terms: 'q',
	data_source: 'ds',
	food_group_ID : 'fg',
	sort : 'sort',
	maximum_rows : 'max',
	beginning_row : 'offset',
	results_format: 'format1',
};

export interface USDASearchRequestParams {
	apiKey: string;
	search_terms: string;
	data_source: string;
	food_group_ID: string;
	sort: string;
	maximum_rows: string;
	beginning_row: string;
	results_format: string;
}

export interface USDARequestParams extends
	USDAReportParams,
	USDASearchRequestParams,
	USDAListParams {
	api_key: string;
	nDBNo?: string;
	name?: string;
	group?: string;
}

export interface USDAReportResponse {
	request_params?: USDAReportParams;
	food?: USDAFood;
	foods?: USDAFoods;
	desc?: USDADescMeta;
	ingredients?: USDAIngredients;
	nutrient?: USDANutrient;
	measures?: USDAMeasures;
	source?: USDASource;
	footnote?: USDAFootnote;
	langual?: USDALangual;
}
