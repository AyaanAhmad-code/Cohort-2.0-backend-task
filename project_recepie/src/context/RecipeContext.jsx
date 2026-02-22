import React, { useState, createContext, useEffect } from 'react'
import { nanoid } from 'nanoid'

export const recipeContext = createContext(null);

const sampleRecipes = [
  {
    image:"https://images.unsplash.com/photo-1697652974652-a2336106043b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Spicy Ramen Bowl",
    chef:"Maya Tan",
    description:"Umami-rich broth with springy noodles and a soft-boiled egg.",
    ingredients:"ramen noodles, chicken broth, miso paste, soy sauce, garlic, ginger, scallions, soft egg, chili oil",
    instructions:"Prepare broth with miso and soy,Boil noodles until al dente,Soft-boil eggs and peel,Sear aromatics and add to broth,Assemble bowls with noodles,egg,and broth,Drizzle chili oil and garnish with scallions",
    category:"dinner"
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1693086415695-a931de393f63?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Creamy Avocado Toast",
    chef:"Liam Hart",
    description:"Simple smashed avocado on toasted sourdough with bright lemon.",
    ingredients:"sourdough bread,ripe avocado,lemon,zest,chili flakes,olive oil,salt,pepper",
    instructions:"Toast bread,Squeeze avocado into a bowl and mash,Add lemon,zest,salt and pepper,Spread avocado on toast,Drizzle olive oil and sprinkle chili flakes,Serve immediately",
    category:"breakfast"
  },
  {
    image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop",
    title:"One-pan Lemon Garlic Salmon",
    chef:"Aria Gomez",
    description:"Baked salmon with crispy skin, roasted potatoes, and a lemony pan sauce.",
    ingredients:"salmon fillets,lemon,garlic,butter,olive oil,rosemary,small potatoes,salt,pepper",
    instructions:"Preheat oven to 425°F/220°C,Cut potatoes and toss with oil and rosemary,Roast potatoes 20 minutes,Sear salmon skin-side down in pan,Add garlic and butter then lemon juice,Finish in oven until cooked through,Serve with roasted potatoes",
    category:"dinner"
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1713719216015-00a348bc4526?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Berry Yogurt Parfait",
    chef:"Sofia Patel",
    description:"Layered yogurt, granola, and fresh berries — perfect for mornings.",
    ingredients:"Greek yogurt,granola,honey,strawberries,blueberries,chia seeds",
    instructions:"Spoon yogurt into glass,Add a layer of granola,Add fresh berries and drizzle honey,Repeat layers,Top with chia seeds,Serve chilled",
    category:"breakfast"
  },
  {
    image:"https://images.unsplash.com/photo-1758972572427-fc3d4193bbd2?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2FybGljJTIwQnV0dGVyJTIwU2hyaW1wfGVufDB8fDB8fHww",
    title:"Garlic Butter Shrimp",
    chef:"Noah Kim",
    description:"Succulent shrimp in a garlicky butter sauce, ready in 15 minutes.",
    ingredients:"shrimp,garlic,butter,lemon,parsley,red pepper flakes,salt,pepper",
    instructions:"Heat butter and sauté garlic,Add shrimp and cook until pink,Splash lemon juice and add parsley,Season with salt,pepper and red pepper flakes,Serve with crusty bread or over rice",
    category:"dinner"
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1667807521536-bc35c8d8b64b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Hearty Veggie Omelette",
    chef:"Emma Li",
    description:"Fluffy omelette packed with seasonal vegetables and cheese.",
    ingredients:"eggs,milk,spinach,bell pepper,onion,cheddar cheese,butter,salt,pepper",
    instructions:"Whisk eggs with milk,Saute vegetables until tender,Pour eggs into pan and add veggies,Sprinkle cheese and fold omelette,Cook until set,Serve hot",
    category:"breakfast"
  },
  {
    image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop",
    title:"Mediterranean Quinoa Salad",
    chef:"Omar Nadeem",
    description:"Bright quinoa salad with cucumber, tomato, olives, and feta.",
    ingredients:"quinoa,cucumber,tomato,red onion,olives,feta,olive oil,lemon juice,oregano,salt,pepper",
    instructions:"Cook quinoa and cool,Chop vegetables and herbs,Toss quinoa with vegetables and feta,Whisk dressing and combine,Season to taste,Chill before serving",
    category:"lunch"
  },
  {
    image:"https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=400&fit=crop",
    title:"Classic BLT Sandwich",
    chef:"Grace Turner",
    description:"Crispy bacon, fresh lettuce, and ripe tomato on toasted bread.",
    ingredients:"bread,bacon,lettuce,tomato,mayo,butter,salt,pepper",
    instructions:"Cook bacon until crispy,Toast bread and spread mayo,Layer lettuce,tomato and bacon,Season with salt and pepper,Serve cut in half",
    category:"lunch"
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1726769145769-7ff764c537c6?q=80&w=755&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Spiced Chickpea Stew",
    chef:"Fatima Ali",
    description:"Comforting stew with tomatoes, warm spices, and chickpeas.",
    ingredients:"chickpeas,onion,garlic,tomato paste,canned tomatoes,cumin,coriander,smoked paprika,spinach,salt,pepper",
    instructions:"Sauté onions and garlic,Add spices and toast them,Stir in tomato paste and canned tomatoes,Add chickpeas and simmer,Stir in spinach until wilted,Serve with rice or flatbread",
    category:"dinner"
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1692193554212-6a27903ab9c4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Banana Pancakes",
    chef:"Ella Brooks",
    description:"Light pancakes flavored with ripe banana and a hint of cinnamon.",
    ingredients:"flour,baking powder,sugar,milk,egg,ripe bananas,cinnamon,butter,maple syrup",
    instructions:"Mash bananas and mix with wet ingredients,Combine dry ingredients and fold in banana mixture,Heat griddle and grease with butter,Scoop batter and cook until bubbles flip,Serve with maple syrup",
    category:"breakfast"
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1689596510442-bfadc7fa8d26?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Caprese Pasta Salad",
    chef:"Marco Rossi",
    description:"Tomato, basil, and mozzarella tossed with al dente pasta.",
    ingredients:"pasta,cherry tomatoes,mozzarella,basil,olive oil,balsamic vinegar,salt,pepper",
    instructions:"Cook pasta and cool,Halve cherry tomatoes and mozzarella,Toss pasta with tomatoes,mozzarella and basil,Whisk dressing and combine,Chill before serving",
    category:"lunch"
  },
  {
    image:"https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500&h=400&fit=crop",
    title:"Garlic Herb Roasted Chicken",
    chef:"Daniel Park",
    description:"Juicy roast chicken with crispy skin and herb butter.",
    ingredients:"whole chicken,garlic,butter,thyme,rosemary,lemon,olive oil,salt,pepper",
    instructions:"Preheat oven to 425°F,Pat chicken dry and season,Stuff lemon and herbs,Roast until juices run clear,Rest chicken 10 minutes,Carve and serve",
    category:"dinner"
  },
  {
    image:"https://images.unsplash.com/photo-1619683548293-c74defe8d5d2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Tofu Stir-Fry",
    chef:"Aisha Khan",
    description:"Crispy tofu and colorful vegetables in a savory sauce.",
    ingredients:"firm tofu,soy sauce,garlic,ginger,bell peppers,broccoli,carrots,green onions,sesame oil",
    instructions:"Press and cube tofu,Toss tofu with cornstarch and pan-fry,Sauté vegetables until crisp-tender,Add garlic and ginger,Add sauce and combine,Top with green onions and sesame oil",
    category:"dinner"
  },
  {
    image:"https://images.unsplash.com/photo-1666819476544-38ea4e57a3d0?q=80&w=720&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Chicken Caesar Wrap",
    chef:"Ethan Shaw",
    description:"Grilled chicken with crisp romaine and creamy Caesar dressing in a wrap.",
    ingredients:"tortilla,grilled chicken,romaine,parmesan,caesar dressing,lemon,salt,pepper",
    instructions:"Toss chicken with dressing and lemon,Place romaine and chicken on tortilla,Add parmesan and wrap tightly,Slice in half and serve",
    category:"lunch"
  },
  {
    image:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=400&fit=crop",
    title:"Sheet-Pan Nachos",
    chef:"Luca Romano",
    description:"Crispy nachos loaded with cheese, beans, and fresh toppings.",
    ingredients:"tortilla chips,cheddar,black beans,jalapeno,tomato,avocado,sour cream,salsa,coriander",
    instructions:"Spread chips on sheet pan,Top with cheese and beans,Bake until cheese melts,Top with jalapeno,tomato,avocado and sour cream,Serve hot",
    category:"dinner"
  },
  {
    image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop",
    title:"Avocado Chickpea Salad",
    chef:"Nora White",
    description:"Light, creamy salad great for sandwiches or bowls.",
    ingredients:"chickpeas,avocado,lemon,red onion,celery,mayo,salt,pepper,cilantro",
    instructions:"Mash chickpeas and avocado together,Stir in chopped onion and celery,Add mayo and lemon juice,Season with salt and pepper,Mix until combined,Serve on bread or over greens",
    category:"lunch"
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1713089366140-814130d69933?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Thai Green Curry",
    chef:"Pim Chaow",
    description:"Fragrant coconut curry with vegetables and basil.",
    ingredients:"green curry paste,coconut milk,eggplant,bell pepper,bamboo shoots,basil,fish sauce,sugar,vegetable oil",
    instructions:"Sauté curry paste in oil,Add coconut milk and bring to simmer,Add vegetables and cook until tender,Season with fish sauce and sugar,Stir in basil just before serving,Serve with jasmine rice",
    category:"dinner"
  },
  {
    image:"https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=400&fit=crop",
    title:"Oatmeal Banana Cookies",
    chef:"Mina Park",
    description:"Soft cookies made with oats and mashed bananas — no refined sugar.",
    ingredients:"rolled oats,mashed banana,honey,cinnamon,vanilla,peanut butter,raisins",
    instructions:"Preheat oven to 350°F,Mix mashed banana with other wet ingredients,Stir in oats and mix-ins,Scoop onto baking sheet,Bake 12-15 minutes,Cool before serving",
    category:"breakfast"
  },
  {
    image:"https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=500&h=400&fit=crop",
    title:"Pesto Zucchini Noodles",
    chef:"Julian Cortez",
    description:"Light low-carb zoodles tossed with fresh basil pesto.",
    ingredients:"zucchini,basil,pine nuts,parmesan,garlic,olive oil,lemon,salt,pepper",
    instructions:"Spiralize zucchini,Pulse basil,pine nuts,parmesan and garlic into pesto,Toss zoodles with pesto briefly,Serve immediately with extra parmesan,Optional: lightly sauté zoodles first",
    category:"lunch"
  },
  {
    image:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop",
    title:"Beef Tacos",
    chef:"Diego Alvarez",
    description:"Seasoned ground beef tucked into warm tortillas with fresh toppings.",
    ingredients:"ground beef,taco seasoning,onion,garlic,tortillas,lettuce,tomato,cheese,sour cream,salsa",
    instructions:"Cook onion and garlic until soft,Add beef and brown,Stir in taco seasoning and a splash of water,Simmer until thickened,Assemble tacos with toppings,Serve hot",
    category:"dinner"
  },
  {
    image:"https://plus.unsplash.com/premium_photo-1695411846170-a4db2bfa965f?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Mango Smoothie Bowl",
    chef:"Zara Khan",
    description:"Thick mango smoothie topped with granola and seeds.",
    ingredients:"frozen mango,banana,yogurt,almond milk,granola,chia seeds,coconut flakes,honey",
    instructions:"Blend frozen mango and banana with yogurt and milk,Pour into bowl,Top with granola,chia and coconut,Drizzle honey and serve chilled",
    category:"breakfast"
  },
  {
    image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=400&fit=crop",
    title:"Greek Stuffed Peppers",
    chef:"Irene Vass",
    description:"Bell peppers stuffed with herbed rice, feta and olives.",
    ingredients:"bell peppers,rice,feta,olives,onion,garlic,tomato paste,oregano,olive oil",
    instructions:"Cook rice and combine with feta,olives and seasonings,Stuff peppers with mixture,Top with olive oil and bake until peppers are tender,Serve warm",
    category:"dinner"
  },
  {
    image:"https://images.unsplash.com/photo-1730793666277-8f3247c58968?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Sweet Potato Hash",
    chef:"Hannah Lee",
    description:"Crisp sweet potatoes with onions and a fried egg on top.",
    ingredients:"sweet potatoes,onion,garlic,olive oil,paprika,salt,pepper,eggs,parsley",
    instructions:"Dice sweet potatoes and parboil until tender,Sauté onions and garlic,Add sweet potatoes and crisp,Season with paprika,salt and pepper,Fry eggs and serve on top,Garnish with parsley",
    category:"breakfast"
  },
  {
    image:"https://images.unsplash.com/photo-1561954467-e8e85546d360?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title:"Honey Garlic Tofu Bowl",
    chef:"Ravi Singh",
    description:"Sticky honey garlic tofu served with steamed rice and greens.",
    ingredients:"firm tofu,honey,soy sauce,garlic,ginger,green onion,rice,bok choy,sesame seeds",
    instructions:"Press and cube tofu,Panfry until crisp,Whisk honey,soy,garlic and ginger,Add sauce and toss tofu,Steam rice and bok choy,Serve bowl with sesame seeds",
    category:"lunch"
  },
  {
    image:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop",
    title:"Chocolate Mug Cake",
    chef:"Leah Morgan",
    description:"Quick single-serve chocolate cake you can make in a minute.",
    ingredients:"flour,cocoa powder,sugar,baking powder,milk,oil,vanilla,egg or egg replacer",
    instructions:"Mix dry ingredients in mug,Add wet ingredients and stir,Microwave 60-90 seconds,Top with a spoon of nut butter or ice cream,Allow to cool briefly and enjoy",
    category:"dessert"
  }
]

// Initialize with seeded data with IDs
const seeded = sampleRecipes.map(r => ({ id: nanoid(), ...r }))

// Utility function to get recipes from localStorage
const getStoredRecipes = () => {
  try {
    const stored = localStorage.getItem('recipes');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

// Utility function to save recipes to localStorage
const saveRecipesToStorage = (recipes) => {
  try {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

const RecipeContext = (props) => {
  // Initialize state with localStorage data or seeded data
  const [data, setData] = useState(() => {
    const stored = getStoredRecipes();
    return stored && stored.length > 0 ? stored : seeded;
  });

  // Sync state changes to localStorage
  useEffect(() => {
    saveRecipesToStorage(data);
  }, [data])

  return (
    <recipeContext.Provider value={{data, setData}}>{props.children}</recipeContext.Provider>
  )
}

export default RecipeContext
