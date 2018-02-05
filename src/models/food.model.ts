export interface FoodItem {
	id: string;
	isbn: string;
	slug: string;
	topic: string;
	lastUpdated: number;
	imageURL: string;
	foodName: string;
	categoryTags: string[];
	description: FoodDescription;
	ingredients: FoodIngredient[];
}

export interface FoodDescription {
	name: string;
	foodGroup: string;
	blurb?: string;
}

export interface FoodIngredient {
	id: string;
	name: string;
	nutrientGroup: string
}

export interface FoodDetailsComponentProps {
	backgroundURL: string;
	foodPicURL: string;
	foodId: string;
	topic: string;
}

export interface FoodDetailsComponentState {
	foodDetails: FoodItem;
	slug: string;
}

export const FOOD_DETAILS_STATE_INIT: FoodDetailsComponentState = {
	foodDetails: <FoodItem>{},
	slug: '',
};
// Data From The USDA
// "desc": {
// 	"ndbno": "01009",
// 		"name": "Cheese, cheddar",
// 		"sd": "CHEESE,CHEDDAR",
// 		"fg": "Dairy and Egg Products",
// 		"sn": "",
// 		"cn": "",
// 		"manu": "",
// 		"nf": 0,
// 		"cf": 0,
// 		"ff": 0,
// 		"pf": 0,
// 		"r": "0%",
// 		"rd": "",
// 		"ds": "Standard Reference",
// 		"ru": "g"
// },
//
// {
// 	"nutrient_id": 255,
// 	"name": "Water",
// 	"group": "Proximates",
// 	"unit": "g",
// 	"value": 37.02,
// 	"derivation": "NONE",
// 	"sourcecode": [
// 	1,
// 	2
// ],
// 	"dp": 39,
// 	"se": "0.190",
//
// },
