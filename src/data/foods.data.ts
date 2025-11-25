import { FoodItem } from '../types/nutrition.types';

/**
 * Kenya-Focused Food Database
 * Nutrition information per 100g unless otherwise specified
 */

export const KENYA_FOODS: FoodItem[] = [
  // ========== STAPLE FOODS ==========
  {
    id: 'staple-ugali',
    name: 'Ugali',
    nameSwahili: 'Ugali',
    category: 'Staples',
    nutrition: {
      calories: 170,
      protein: 3.5,
      carbs: 37,
      fat: 0.5,
    },
    servingSizes: [
      { name: '1 small piece', grams: 100 },
      { name: '1 medium piece', grams: 150 },
      { name: '1 large piece', grams: 200 },
    ],
    defaultServing: 1,
    description: 'Kenyan staple made from maize flour',
    preparationNotes: 'Cooked with water to thick consistency',
  },
  {
    id: 'staple-githeri',
    name: 'Githeri',
    nameSwahili: 'Githeri',
    category: 'Staples',
    nutrition: {
      calories: 130,
      protein: 7,
      carbs: 23,
      fat: 1.5,
    },
    servingSizes: [
      { name: '1 cup', grams: 200 },
      { name: '1/2 cup', grams: 100 },
      { name: '2 cups', grams: 400 },
    ],
    defaultServing: 0,
    description: 'Boiled maize and beans mixture',
    preparationNotes: 'Traditional Kenyan dish, high in protein',
  },
  {
    id: 'staple-rice',
    name: 'White Rice',
    nameSwahili: 'Mchele',
    category: 'Staples',
    nutrition: {
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
    },
    servingSizes: [
      { name: '1 cup cooked', grams: 158 },
      { name: '1/2 cup cooked', grams: 79 },
      { name: '1 plate', grams: 200 },
    ],
    defaultServing: 0,
    description: 'Cooked white rice',
  },
  {
    id: 'staple-chapati',
    name: 'Chapati',
    nameSwahili: 'Chapo',
    category: 'Staples',
    nutrition: {
      calories: 300,
      protein: 7,
      carbs: 45,
      fat: 10,
    },
    servingSizes: [
      { name: '1 piece', grams: 60 },
      { name: '2 pieces', grams: 120 },
    ],
    defaultServing: 0,
    description: 'Flatbread made from wheat flour',
  },
  {
    id: 'staple-mandazi',
    name: 'Mandazi',
    nameSwahili: 'Mandazi',
    category: 'Staples',
    nutrition: {
      calories: 350,
      protein: 6,
      carbs: 50,
      fat: 14,
    },
    servingSizes: [
      { name: '1 piece', grams: 50 },
      { name: '2 pieces', grams: 100 },
    ],
    defaultServing: 0,
    description: 'Fried dough, popular breakfast item',
  },

  // ========== PROTEINS ==========
  {
    id: 'protein-nyama-beef',
    name: 'Nyama (Beef)',
    nameSwahili: 'Nyama ya Ng\'ombe',
    category: 'Proteins',
    nutrition: {
      calories: 250,
      protein: 26,
      carbs: 0,
      fat: 15,
    },
    servingSizes: [
      { name: '100g portion', grams: 100 },
      { name: '150g portion', grams: 150 },
      { name: '200g portion', grams: 200 },
    ],
    defaultServing: 0,
    description: 'Grilled or stewed beef',
  },
  {
    id: 'protein-chicken',
    name: 'Chicken',
    nameSwahili: 'Kuku',
    category: 'Proteins',
    nutrition: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
    },
    servingSizes: [
      { name: '1 breast', grams: 150 },
      { name: '1 thigh', grams: 100 },
      { name: '100g', grams: 100 },
    ],
    defaultServing: 0,
    description: 'Skinless chicken breast or thigh',
  },
  {
    id: 'protein-fish-tilapia',
    name: 'Tilapia',
    nameSwahili: 'Samaki',
    category: 'Proteins',
    nutrition: {
      calories: 128,
      protein: 26,
      carbs: 0,
      fat: 2.7,
    },
    servingSizes: [
      { name: '1 fillet', grams: 150 },
      { name: '100g', grams: 100 },
    ],
    defaultServing: 0,
    description: 'Fresh tilapia fish',
  },
  {
    id: 'protein-eggs',
    name: 'Eggs',
    nameSwahili: 'Mayai',
    category: 'Proteins',
    nutrition: {
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
    },
    servingSizes: [
      { name: '1 egg', grams: 50 },
      { name: '2 eggs', grams: 100 },
      { name: '3 eggs', grams: 150 },
    ],
    defaultServing: 1,
    description: 'Boiled or fried eggs',
  },
  {
    id: 'protein-beans',
    name: 'Beans',
    nameSwahili: 'Maharagwe',
    category: 'Proteins',
    nutrition: {
      calories: 127,
      protein: 8.7,
      carbs: 22.8,
      fat: 0.5,
    },
    servingSizes: [
      { name: '1 cup cooked', grams: 172 },
      { name: '1/2 cup cooked', grams: 86 },
    ],
    defaultServing: 0,
    description: 'Boiled beans',
  },
  {
    id: 'protein-milk',
    name: 'Milk',
    nameSwahili: 'Maziwa',
    category: 'Beverages',
    nutrition: {
      calories: 61,
      protein: 3.2,
      carbs: 4.8,
      fat: 3.3,
    },
    servingSizes: [
      { name: '1 cup (250ml)', grams: 250 },
      { name: '1/2 cup (125ml)', grams: 125 },
      { name: '1 glass (200ml)', grams: 200 },
    ],
    defaultServing: 0,
    description: 'Fresh cow milk',
  },

  // ========== VEGETABLES ==========
  {
    id: 'veg-sukuma-wiki',
    name: 'Sukuma Wiki',
    nameSwahili: 'Sukuma Wiki',
    category: 'Vegetables',
    nutrition: {
      calories: 33,
      protein: 2.9,
      carbs: 5.6,
      fat: 0.7,
    },
    servingSizes: [
      { name: '1 cup cooked', grams: 130 },
      { name: '1 plate', grams: 200 },
    ],
    defaultServing: 0,
    description: 'Kale/collard greens, popular vegetable',
  },
  {
    id: 'veg-cabbage',
    name: 'Cabbage',
    nameSwahili: 'Kabichi',
    category: 'Vegetables',
    nutrition: {
      calories: 25,
      protein: 1.3,
      carbs: 5.8,
      fat: 0.1,
    },
    servingSizes: [
      { name: '1 cup chopped', grams: 89 },
      { name: '1 plate', grams: 150 },
    ],
    defaultServing: 0,
    description: 'Fresh or cooked cabbage',
  },
  {
    id: 'veg-spinach',
    name: 'Spinach',
    nameSwahili: 'Mchicha',
    category: 'Vegetables',
    nutrition: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
    },
    servingSizes: [
      { name: '1 cup cooked', grams: 180 },
      { name: '1 plate', grams: 200 },
    ],
    defaultServing: 0,
    description: 'Cooked spinach',
  },
  {
    id: 'veg-tomatoes',
    name: 'Tomatoes',
    nameSwahili: 'Nyanya',
    category: 'Vegetables',
    nutrition: {
      calories: 18,
      protein: 0.9,
      carbs: 3.9,
      fat: 0.2,
    },
    servingSizes: [
      { name: '1 medium', grams: 123 },
      { name: '1 cup chopped', grams: 180 },
    ],
    defaultServing: 0,
    description: 'Fresh tomatoes',
  },

  // ========== FRUITS ==========
  {
    id: 'fruit-banana',
    name: 'Banana',
    nameSwahili: 'Ndizi',
    category: 'Fruits',
    nutrition: {
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fat: 0.3,
    },
    servingSizes: [
      { name: '1 medium', grams: 118 },
      { name: '1 large', grams: 136 },
      { name: '1 small', grams: 100 },
    ],
    defaultServing: 0,
    description: 'Fresh banana',
  },
  {
    id: 'fruit-avocado',
    name: 'Avocado',
    nameSwahili: 'Parachichi',
    category: 'Fruits',
    nutrition: {
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7,
    },
    servingSizes: [
      { name: '1/2 avocado', grams: 68 },
      { name: '1 whole', grams: 136 },
    ],
    defaultServing: 0,
    description: 'Fresh avocado, healthy fats',
  },
  {
    id: 'fruit-mango',
    name: 'Mango',
    nameSwahili: 'Embe',
    category: 'Fruits',
    nutrition: {
      calories: 60,
      protein: 0.8,
      carbs: 15,
      fat: 0.4,
    },
    servingSizes: [
      { name: '1 medium', grams: 200 },
      { name: '1 cup sliced', grams: 165 },
    ],
    defaultServing: 0,
    description: 'Fresh mango',
  },
  {
    id: 'fruit-orange',
    name: 'Orange',
    nameSwahili: 'Chungwa',
    category: 'Fruits',
    nutrition: {
      calories: 47,
      protein: 0.9,
      carbs: 11.8,
      fat: 0.1,
    },
    servingSizes: [
      { name: '1 medium', grams: 131 },
      { name: '1 large', grams: 184 },
    ],
    defaultServing: 0,
    description: 'Fresh orange',
  },

  // ========== SNACKS ==========
  {
    id: 'snack-groundnuts',
    name: 'Groundnuts (Peanuts)',
    nameSwahili: 'Njugu Karanga',
    category: 'Snacks',
    nutrition: {
      calories: 567,
      protein: 25.8,
      carbs: 16.1,
      fat: 49.2,
    },
    servingSizes: [
      { name: '1 handful (30g)', grams: 30 },
      { name: '1/4 cup', grams: 37 },
      { name: '100g', grams: 100 },
    ],
    defaultServing: 0,
    description: 'Roasted groundnuts, high protein snack',
  },
  {
    id: 'snack-sweet-potato',
    name: 'Sweet Potato',
    nameSwahili: 'Viazi Vitamu',
    category: 'Snacks',
    nutrition: {
      calories: 86,
      protein: 1.6,
      carbs: 20.1,
      fat: 0.1,
    },
    servingSizes: [
      { name: '1 medium', grams: 130 },
      { name: '1 cup mashed', grams: 200 },
    ],
    defaultServing: 0,
    description: 'Boiled or roasted sweet potato',
  },
  {
    id: 'snack-maize',
    name: 'Roasted Maize',
    nameSwahili: 'Mahindi Choma',
    category: 'Snacks',
    nutrition: {
      calories: 86,
      protein: 3.3,
      carbs: 18.7,
      fat: 1.4,
    },
    servingSizes: [
      { name: '1 cob', grams: 100 },
      { name: '1/2 cob', grams: 50 },
    ],
    defaultServing: 0,
    description: 'Roasted corn on the cob',
  },
];

// Helper functions
export const getFoodById = (id: string) => {
  return KENYA_FOODS.find((food) => food.id === id);
};

export const getFoodsByCategory = (category: string) => {
  if (category === 'All') return KENYA_FOODS;
  return KENYA_FOODS.filter((food) => food.category === category);
};

export const searchFoods = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return KENYA_FOODS.filter(
    (food) =>
      food.name.toLowerCase().includes(lowerQuery) ||
      food.nameSwahili?.toLowerCase().includes(lowerQuery) ||
      food.description?.toLowerCase().includes(lowerQuery)
  );
};

export const calculateNutrition = (
  food: FoodItem,
  servingSize: { grams: number },
  quantity: number
) => {
  const totalGrams = servingSize.grams * quantity;
  const multiplier = totalGrams / 100; // nutrition is per 100g

  return {
    calories: Math.round(food.nutrition.calories * multiplier),
    protein: Math.round(food.nutrition.protein * multiplier * 10) / 10,
    carbs: Math.round(food.nutrition.carbs * multiplier * 10) / 10,
    fat: Math.round(food.nutrition.fat * multiplier * 10) / 10,
  };
};
