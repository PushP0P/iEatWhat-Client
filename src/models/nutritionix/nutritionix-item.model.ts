export interface NutritionixItem {
	foods: {
		food_name: string;
		brand_name: string;
		serving_qty: number;
		serving_unit: string;
		serving_weight_grams: number;
		nf_calories: number;
		nf_total_fat: number;
		nf_saturated_fat: number;
		nf_cholesterol: number;
		nf_sodium: number;
		nf_total_carbohydrate: number;
		nf_dietary_fiber: number;
		nf_sugars: number;
		nf_protein: number;
		nf_potassium: number;
		nf_p: number;
		full_nutrients: {
			attr_id: number;
			value: number;
		}[];
		nix_brand_name: string;
		nix_brand_id: string;
		nix_item_name: string;
		nix_item_id: string;
		metadata: any, // fix any
		source: number;
		ndb_no: number;
		tags: number;
		alt_measures: number;
		photo: {
			thumb: string;
			highres: any; // fix any
			is_user_uploaded: boolean;
		},
		updated_at: string;
		nf_ingredient_statement: string;
	}[];
}
