/**
 * The list of Food reported for a request
 */
export interface USDAFoods {
	number_of_foods?: string;
	not_found?: string;
	api_version?: string;
}

/**
 * The Food Report
 */
export interface USDAFood {
	report_type?: string;
	report_version?: string;
}

/**
 * metadata elements for the food being reported
 */
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

/**
 * ingredients (Branded Food Products report only)
 */
export interface USDAIngredients {
	last_updated_by_company?: string;
	metadata_nutrient?: string;
}

/**
 * metadata elements for each nutrient included in the food report
 */
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

/**
 * List of measures reported for a nutrient
 */
export interface USDAMeasures {
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

/**
 * Reference source, usually a bibliographic citation, for the food
 */
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
	q?: string;
	start?: number;
	end?: number;
	offset?: number;
	total?: number;
	sort?: any; 	// sort order: n=name or id
	sr?: string;
}

export interface USDAItem {
	ndbno?: string;
	name?: string;
	group?: string;
	ds?: string;
	offset?: number;
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
	};
	ingredients: {
		list_of_ingredients: USDANutrient[] | string;
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
	},
	ingredients: {
		list_of_ingredients: 'desc',
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

export interface NutrientList {
	type: string;
	start: number;
	end: number;
	total: number;
	sort: string;
	sr: string;
}

export interface ListOptions {
	lt: string;
	max: string;
	offset: string;
	sort: string;
	format: string;
}

export interface USDAFoodReport
	extends USDAFood, USDAFoods,
		USDADescMeta, USDAIngredients,
		USDAItem, USDANutrient, USDAMeasures,
		USDALangual, USDASource, USDAFootnote {}
