
import { Category, Recipe, User } from '../types/recipe';

export const categories: Category[] = [
  'breakfast',
  'lunch',
  'dinner',
  'dessert',
  'vegan',
  'vegetarian',
  'gluten-free',
  'dairy-free',
  'quick',
  'appetizer',
  'soup',
  'salad',
  'main',
  'side',
  'drink'
];

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'jamieolivier',
    email: 'jamie@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '2',
    username: 'sophiawilson',
    email: 'sophia@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
  {
    id: '3',
    username: 'michaelchen',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Vegetarian Pasta Primavera',
    description: 'A colorful pasta dish loaded with fresh spring vegetables.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'easy',
    categories: ['vegetarian', 'dinner', 'main'],
    ingredients: [
      { id: '1', name: 'Fettuccine pasta', amount: '12', unit: 'oz' },
      { id: '2', name: 'Bell peppers', amount: '2', unit: 'medium' },
      { id: '3', name: 'Zucchini', amount: '1', unit: 'medium' },
      { id: '4', name: 'Cherry tomatoes', amount: '1', unit: 'cup' },
      { id: '5', name: 'Fresh basil', amount: '1/4', unit: 'cup' },
      { id: '6', name: 'Parmesan cheese', amount: '1/2', unit: 'cup' },
      { id: '7', name: 'Olive oil', amount: '3', unit: 'tbsp' },
      { id: '8', name: 'Garlic', amount: '3', unit: 'cloves' },
      { id: '9', name: 'Salt', amount: '1', unit: 'tsp' },
      { id: '10', name: 'Black pepper', amount: '1/2', unit: 'tsp' }
    ],
    steps: [
      { id: '1', order: 1, instruction: 'Bring a large pot of salted water to boil. Cook pasta according to package instructions until al dente.' },
      { id: '2', order: 2, instruction: 'Meanwhile, dice bell peppers and zucchini into 1/2-inch pieces. Halve cherry tomatoes. Mince garlic and chop basil.' },
      { id: '3', order: 3, instruction: 'Heat olive oil in a large skillet over medium heat. Add garlic and cook until fragrant, about 30 seconds.' },
      { id: '4', order: 4, instruction: 'Add peppers and zucchini to the skillet. Cook for 5-7 minutes until vegetables begin to soften.' },
      { id: '5', order: 5, instruction: 'Add cherry tomatoes and cook for another 2 minutes.' },
      { id: '6', order: 6, instruction: 'Drain pasta, reserving 1/4 cup pasta water. Add pasta to the skillet with vegetables.' },
      { id: '7', order: 7, instruction: 'Add half the Parmesan cheese, basil, salt, and pepper. Toss to combine, adding pasta water as needed to create a light sauce.' },
      { id: '8', order: 8, instruction: 'Serve topped with remaining Parmesan cheese and fresh basil.' }
    ],
    author: mockUsers[0],
    createdAt: '2023-05-15T12:00:00Z'
  },
  {
    id: '2',
    title: 'Classic Chocolate Chip Cookies',
    description: 'Soft and chewy cookies with the perfect amount of chocolate chips.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    difficulty: 'easy',
    categories: ['dessert'],
    ingredients: [
      { id: '1', name: 'All-purpose flour', amount: '2 1/4', unit: 'cups' },
      { id: '2', name: 'Baking soda', amount: '1', unit: 'tsp' },
      { id: '3', name: 'Salt', amount: '1', unit: 'tsp' },
      { id: '4', name: 'Unsalted butter', amount: '1', unit: 'cup' },
      { id: '5', name: 'Brown sugar', amount: '3/4', unit: 'cup' },
      { id: '6', name: 'Granulated sugar', amount: '3/4', unit: 'cup' },
      { id: '7', name: 'Vanilla extract', amount: '1', unit: 'tsp' },
      { id: '8', name: 'Eggs', amount: '2', unit: 'large' },
      { id: '9', name: 'Chocolate chips', amount: '2', unit: 'cups' }
    ],
    steps: [
      { id: '1', order: 1, instruction: 'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.' },
      { id: '2', order: 2, instruction: 'In a medium bowl, whisk together flour, baking soda, and salt.' },
      { id: '3', order: 3, instruction: 'In a large bowl, beat butter, brown sugar, and granulated sugar until creamy.' },
      { id: '4', order: 4, instruction: 'Add vanilla and eggs to the butter mixture, one at a time, beating well after each addition.' },
      { id: '5', order: 5, instruction: 'Gradually add flour mixture to butter mixture, mixing until just combined.' },
      { id: '6', order: 6, instruction: 'Stir in chocolate chips.' },
      { id: '7', order: 7, instruction: 'Drop rounded tablespoons of dough onto prepared baking sheets, spacing them 2 inches apart.' },
      { id: '8', order: 8, instruction: 'Bake for 9-12 minutes or until edges are golden brown but centers are still soft.' },
      { id: '9', order: 9, instruction: 'Let cookies cool on baking sheets for 2 minutes, then transfer to wire racks to cool completely.' }
    ],
    author: mockUsers[1],
    createdAt: '2023-05-20T14:30:00Z'
  },
  {
    id: '3',
    title: 'Vegan Buddha Bowl',
    description: 'A nutritious and colorful bowl filled with plant-based goodness.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    prepTime: 20,
    cookTime: 30,
    servings: 2,
    difficulty: 'medium',
    categories: ['vegan', 'lunch', 'dinner', 'gluten-free'],
    ingredients: [
      { id: '1', name: 'Quinoa', amount: '1', unit: 'cup' },
      { id: '2', name: 'Sweet potato', amount: '1', unit: 'medium' },
      { id: '3', name: 'Broccoli', amount: '1', unit: 'cup' },
      { id: '4', name: 'Chickpeas', amount: '1', unit: 'can' },
      { id: '5', name: 'Avocado', amount: '1', unit: 'medium' },
      { id: '6', name: 'Kale', amount: '2', unit: 'cups' },
      { id: '7', name: 'Olive oil', amount: '2', unit: 'tbsp' },
      { id: '8', name: 'Lemon juice', amount: '2', unit: 'tbsp' },
      { id: '9', name: 'Tahini', amount: '2', unit: 'tbsp' },
      { id: '10', name: 'Maple syrup', amount: '1', unit: 'tsp' },
      { id: '11', name: 'Paprika', amount: '1', unit: 'tsp' },
      { id: '12', name: 'Cumin', amount: '1', unit: 'tsp' },
      { id: '13', name: 'Salt', amount: '', unit: 'to taste' },
      { id: '14', name: 'Pepper', amount: '', unit: 'to taste' }
    ],
    steps: [
      { id: '1', order: 1, instruction: 'Preheat oven to 400°F (200°C).' },
      { id: '2', order: 2, instruction: 'Rinse quinoa and cook according to package instructions.' },
      { id: '3', order: 3, instruction: 'Dice sweet potato into 1/2-inch cubes. Toss with 1 tbsp olive oil, paprika, cumin, salt, and pepper.' },
      { id: '4', order: 4, instruction: 'Spread sweet potatoes on a baking sheet and roast for 25 minutes or until tender.' },
      { id: '5', order: 5, instruction: 'Drain and rinse chickpeas. Pat dry, then toss with 1/2 tbsp olive oil, salt, and pepper.' },
      { id: '6', order: 6, instruction: 'Add chickpeas to the baking sheet for the last 15 minutes of roasting.' },
      { id: '7', order: 7, instruction: 'Cut broccoli into florets and steam for 5 minutes until tender-crisp.' },
      { id: '8', order: 8, instruction: 'Make the dressing by whisking together tahini, lemon juice, maple syrup, 1/2 tbsp olive oil, and a pinch of salt.' },
      { id: '9', order: 9, instruction: 'Massage kale with remaining olive oil and a pinch of salt for 1-2 minutes until softened.' },
      { id: '10', order: 10, instruction: 'Slice avocado.' },
      { id: '11', order: 11, instruction: 'To assemble, divide quinoa between two bowls. Arrange sweet potatoes, chickpeas, broccoli, kale, and avocado on top.' },
      { id: '12', order: 12, instruction: 'Drizzle with tahini dressing and serve.' }
    ],
    author: mockUsers[2],
    createdAt: '2023-06-02T09:15:00Z'
  },
  {
    id: '4',
    title: 'Spicy Chicken Tacos',
    description: 'Flavorful tacos with marinated chicken and fresh toppings.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'medium',
    categories: ['dinner', 'quick', 'main'],
    ingredients: [
      { id: '1', name: 'Chicken breasts', amount: '1.5', unit: 'lbs' },
      { id: '2', name: 'Taco seasoning', amount: '2', unit: 'tbsp' },
      { id: '3', name: 'Lime', amount: '1', unit: 'medium' },
      { id: '4', name: 'Corn tortillas', amount: '12', unit: 'small' },
      { id: '5', name: 'Avocado', amount: '2', unit: 'medium' },
      { id: '6', name: 'Red onion', amount: '1/2', unit: 'medium' },
      { id: '7', name: 'Cilantro', amount: '1/4', unit: 'cup' },
      { id: '8', name: 'Sour cream', amount: '1/2', unit: 'cup' },
      { id: '9', name: 'Hot sauce', amount: '', unit: 'to taste' },
      { id: '10', name: 'Olive oil', amount: '2', unit: 'tbsp' }
    ],
    steps: [
      { id: '1', order: 1, instruction: 'Slice chicken breasts into thin strips. In a bowl, toss chicken with taco seasoning, juice of half a lime, and 1 tbsp olive oil.' },
      { id: '2', order: 2, instruction: 'Let chicken marinate for at least 10 minutes (or up to 24 hours in the refrigerator).' },
      { id: '3', order: 3, instruction: 'While chicken marinates, dice avocados, thinly slice red onion, and chop cilantro.' },
      { id: '4', order: 4, instruction: 'Heat 1 tbsp olive oil in a large skillet over medium-high heat. Add marinated chicken and cook for 6-8 minutes, until cooked through and slightly charred.' },
      { id: '5', order: 5, instruction: 'Warm tortillas in a dry skillet or in the microwave wrapped in a damp paper towel.' },
      { id: '6', order: 6, instruction: 'To assemble tacos, place chicken on tortillas and top with avocado, red onion, cilantro, and a dollop of sour cream.' },
      { id: '7', order: 7, instruction: 'Serve with hot sauce and lime wedges on the side.' }
    ],
    author: mockUsers[0],
    createdAt: '2023-06-10T18:45:00Z'
  },
  {
    id: '5',
    title: 'Berry Smoothie Bowl',
    description: 'A refreshing breakfast bowl packed with antioxidants and topped with crunchy granola.',
    image: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    difficulty: 'easy',
    categories: ['breakfast', 'vegan', 'vegetarian', 'quick', 'gluten-free'],
    ingredients: [
      { id: '1', name: 'Frozen mixed berries', amount: '1', unit: 'cup' },
      { id: '2', name: 'Banana', amount: '1', unit: 'medium' },
      { id: '3', name: 'Plant-based milk', amount: '1/4', unit: 'cup' },
      { id: '4', name: 'Greek yogurt or plant-based yogurt', amount: '1/4', unit: 'cup' },
      { id: '5', name: 'Granola', amount: '1/4', unit: 'cup' },
      { id: '6', name: 'Fresh berries', amount: '1/4', unit: 'cup' },
      { id: '7', name: 'Chia seeds', amount: '1', unit: 'tsp' },
      { id: '8', name: 'Honey or maple syrup', amount: '1', unit: 'tsp' }
    ],
    steps: [
      { id: '1', order: 1, instruction: 'In a blender, combine frozen berries, half of the banana, milk, and yogurt.' },
      { id: '2', order: 2, instruction: 'Blend until smooth but still thick. Add a splash more milk if needed, but keep it thick enough to eat with a spoon.' },
      { id: '3', order: 3, instruction: 'Pour the smoothie into a bowl.' },
      { id: '4', order: 4, instruction: 'Slice the remaining half of the banana.' },
      { id: '5', order: 5, instruction: 'Top the smoothie with granola, fresh berries, banana slices, and chia seeds.' },
      { id: '6', order: 6, instruction: 'Drizzle with honey or maple syrup if desired.' }
    ],
    author: mockUsers[1],
    createdAt: '2023-06-15T07:30:00Z'
  }
];

export const currentUser: User = {
  id: '2',
  username: 'sophiawilson',
  email: 'sophia@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
};
