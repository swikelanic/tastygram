// src/App.tsx
import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import WelcomePage from './pages/WelcomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import GuestPage from './pages/GuestPage'
import UploadPage from './pages/UploadPage'
import { Recipe, User } from './types'

// Import all recipe images
import carbonara from './assets/carbonara.jpg'
import butterChicken from './assets/Butter-Chicken.jpg'
import foods from './assets/foods.jpg'
import sam from './assets/sam.jpg'
import tacos from './assets/ttacos.jpg'
import sushi from './assets/sushi.jpg'
import bobotie from './assets/bobotie.jpeg'
import fatcakes from './assets/fatcakes.jpeg'
import Milktart from './assets/Milk-tart.jpg'
import Malvapudding from './assets/Malva-pudding.jpg'
import brownies from './assets/brownies.jpeg'
import cheesecake from './assets/cheesecake.jpeg'
import tiramisu from './assets/tiramisu.jpeg'
import cremebrulee from './assets/cremebrulee.jpeg'
import applepie from './assets/applepie.jpeg'
import pavlova from './assets/pavlova.jpeg'
import cupcakes from './assets/cupcakes.jpeg'
import cookies from './assets/cookies.jpeg'
import bananabread from './assets/bananabread.jpeg'
import pannacotta from './assets/pannacotta.jpeg'
import lemonTart from './assets/lemonTart.jpeg'
import eclairs from './assets/eclairs.jpeg'
import churros from './assets/churros.jpeg'
import crepes from './assets/crepes.jpeg'
import pecanpie from './assets/pecanpie.jpeg'
import raspberrycheesecake from './assets/raspberrycheesecake.jpeg'

// Sample recipes array
const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with eggs, cheese, pancetta, and pepper.',
    category: 'Italian',
    imageUrl: carbonara,
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],
    steps: 'Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all.',
    author: 'Chef Luigi',
  },
  {
    id: '2',
    title: 'Butter Chicken',
    description: 'Rich and creamy Indian chicken curry.',
    category: 'Indian',
    imageUrl: butterChicken,
    ingredients: ['Chicken', 'Butter', 'Tomatoes', 'Cream', 'Spices'],
    steps: 'Marinate chicken. Cook sauce. Combine and simmer.',
    author: 'Chef Priya',
  },
  {
    id: '3',
    title: 'Samp and Braai Meat',
    description: 'South African traditional samp served with grilled braai meat.',
    category: 'South African',
    imageUrl: foods,
    ingredients: ['Samp', 'Beef', 'Spices', 'Onions', 'Tomatoes'],
    steps: 'Cook samp until soft. Grill meat. Serve together.',
    author: 'Chef Thabo',
  },
  {
    id: '4',
    title: 'Dumplings, Spanish Creamy, Chakalaka, Beef Stew',
    description: 'A full South African meal with various sides and stews.',
    category: 'South African',
    imageUrl: sam,
    ingredients: ['Flour', 'Butter', 'Cream', 'Vegetables', 'Beef', 'Spices'],
    steps: 'Prepare dumplings. Cook stews and chakalaka. Serve together.',
    author: 'Chef Lerato',
  },
  {
    id: '5',
    title: 'Tacos',
    description: 'Traditional Mexican tacos with fresh toppings.',
    category: 'Mexican',
    imageUrl: tacos,
    ingredients: ['Taco shells', 'Beef', 'Lettuce', 'Tomatoes', 'Cheese', 'Salsa'],
    steps: 'Cook beef. Assemble tacos with toppings. Serve.',
    author: 'Chef Miguel',
  },
  {
    id: '6',
    title: 'Sushi',
    description: 'Japanese sushi rolls with rice and fresh fish.',
    category: 'Other',
    imageUrl: sushi,
    ingredients: ['Sushi rice', 'Nori', 'Raw fish', 'Avocado', 'Cucumber', 'Soy sauce'],
    steps: 'Prepare rice. Roll sushi with fillings. Slice and serve.',
    author: 'Chef Sato',
  },
  {
    id: '7',
    title: 'Bobotie',
    description: 'Traditional South African minced meat dish with egg topping.',
    category: 'South Africa',
    imageUrl: bobotie,
    ingredients: ['Minced meat', 'Bread', 'Milk', 'Eggs', 'Spices'],
    steps: 'Mix meat with spices and soaked bread. Bake with egg topping.',
    author: 'Chef Nomsa',
  },
  {
    id: '8',
    title: 'Fatcakes',
    description: 'Deep-fried dough, traditional South African snack.',
    category: 'South Africa',
    imageUrl: fatcakes,
    ingredients: ['Flour', 'Yeast', 'Sugar', 'Salt', 'Water', 'Oil for frying'],
    steps: 'Prepare dough. Deep fry until golden brown.',
    author: 'Chef Sipho',
  },
  {
    id: '9',
    title: 'Milk Tart',
    description: 'Classic South African sweet milk tart.',
    category: 'Desserts',
    imageUrl: Milktart,
    ingredients: ['Milk', 'Sugar', 'Flour', 'Eggs', 'Pastry crust', 'Cinnamon'],
    steps: 'Prepare crust. Cook milk filling. Bake and sprinkle with cinnamon.',
    author: 'Chef Anna',
  },
  {
    id: '10',
    title: 'Malva Pudding',
    description: 'Traditional South African dessert, spongy and sweet.',
    category: 'Desserts',
    imageUrl: Malvapudding,
    ingredients: ['Flour', 'Sugar', 'Eggs', 'Butter', 'Apricot jam', 'Cream'],
    steps: 'Mix ingredients. Bake. Serve with cream or custard.',
    author: 'Chef Marco',
  },
  {
    id: '14',
    title: 'Chocolate Brownies',
    description: 'Fudgy and rich chocolate brownies.',
    category: 'Desserts',
    imageUrl: brownies,
    ingredients: ['Butter', 'Chocolate', 'Sugar', 'Eggs', 'Flour', 'Vanilla extract'],
    steps: 'Melt butter and chocolate. Mix in sugar and eggs. Fold in flour. Bake at 180°C for 25-30 mins.',
    author: 'Chef Anna',
  },
  {
    id: '15',
    title: 'Cheesecake',
    description: 'Classic creamy cheesecake with a biscuit base.',
    category: 'Desserts',
    imageUrl: cheesecake,
    ingredients: ['Cream cheese', 'Sugar', 'Eggs', 'Vanilla', 'Biscuit base', 'Butter'],
    steps: 'Mix cream cheese, sugar, and eggs. Pour on biscuit base. Bake at 160°C until set. Chill before serving.',
    author: 'Chef Marco',
  },
  {
    id: '16',
    title: 'Tiramisu',
    description: 'Italian dessert with mascarpone, coffee, and cocoa.',
    category: 'Desserts',
    imageUrl: tiramisu,
    ingredients: ['Mascarpone', 'Coffee', 'Ladyfingers', 'Sugar', 'Cocoa powder', 'Eggs'],
    steps: 'Layer coffee-soaked ladyfingers and mascarpone mixture. Dust with cocoa powder. Chill before serving.',
    author: 'Chef Luigi',
  },
  {
    id: '17',
    title: 'Crème Brûlée',
    description: 'French custard topped with caramelized sugar.',
    category: 'Desserts',
    imageUrl: cremebrulee,
    ingredients: ['Cream', 'Egg yolks', 'Sugar', 'Vanilla'],
    steps: 'Bake custard in ramekins. Cool and sprinkle sugar on top. Caramelize with torch.',
    author: 'Chef Marie',
  },
  {
    id: '18',
    title: 'Apple Pie',
    description: 'Classic pie with spiced apple filling.',
    category: 'Desserts',
    imageUrl: applepie,
    ingredients: ['Apples', 'Sugar', 'Cinnamon', 'Pie crust', 'Butter', 'Flour'],
    steps: 'Prepare crust. Mix apples with sugar and cinnamon. Fill crust and bake at 180°C for 45 mins.',
    author: 'Chef John',
  },
  {
    id: '19',
    title: 'Pavlova',
    description: 'Meringue-based dessert topped with whipped cream and fruit.',
    category: 'Desserts',
    imageUrl: pavlova,
    ingredients: ['Egg whites', 'Sugar', 'Cornstarch', 'Vinegar', 'Whipped cream', 'Fruit'],
    steps: 'Whip egg whites and sugar. Bake until crisp. Top with cream and fresh fruit.',
    author: 'Chef Emma',
  },
  {
    id: '20',
    title: 'Cupcakes',
    description: 'Mini cakes with frosting.',
    category: 'Desserts',
    imageUrl: cupcakes,
    ingredients: ['Flour', 'Sugar', 'Eggs', 'Butter', 'Milk', 'Baking powder', 'Frosting'],
    steps: 'Mix batter and bake in cupcake tins at 180°C for 20 mins. Frost when cooled.',
    author: 'Chef Lily',
  },
  {
    id: '21',
    title: 'Chocolate Chip Cookies',
    description: 'Classic cookies with chocolate chips.',
    category: 'Desserts',
    imageUrl: cookies,
    ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Chocolate chips', 'Vanilla extract'],
    steps: 'Mix ingredients. Scoop onto tray. Bake at 180°C for 10-12 mins.',
    author: 'Chef Tom',
  },
  {
    id: '22',
    title: 'Banana Bread',
    description: 'Moist banana loaf with nuts.',
    category: 'Desserts',
    imageUrl: bananabread,
    ingredients: ['Bananas', 'Flour', 'Sugar', 'Eggs', 'Butter', 'Baking soda', 'Nuts'],
    steps: 'Mash bananas. Mix with other ingredients. Bake at 175°C for 50-60 mins.',
    author: 'Chef Sara',
  },
  {
    id: '23',
    title: 'Panna Cotta',
    description: 'Italian creamy dessert with gelatin.',
    category: 'Desserts',
    imageUrl: pannacotta,
    ingredients: ['Cream', 'Sugar', 'Vanilla', 'Gelatin', 'Berries'],
    steps: 'Heat cream and sugar. Add gelatin and vanilla. Chill until set. Serve with berries.',
    author: 'Chef Alberto',
  },
  {
    id: '24',
    title: 'Lemon Tart',
    description: 'Tart with zesty lemon filling.',
    category: 'Desserts',
    imageUrl: lemonTart,
    ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Lemon juice', 'Zest'],
    steps: 'Prepare crust. Mix lemon filling. Bake at 180°C until set. Cool before serving.',
    author: 'Chef Claire',
  },
  {
    id: '25',
    title: 'Eclairs',
    description: 'French pastry filled with cream and topped with chocolate.',
    category: 'Desserts',
    imageUrl: eclairs,
    ingredients: ['Flour', 'Butter', 'Eggs', 'Cream', 'Chocolate', 'Sugar'],
    steps: 'Bake choux pastry. Fill with cream. Top with chocolate glaze.',
    author: 'Chef Pierre',
  },
  {
    id: '26',
    title: 'Churros',
    description: 'Spanish fried dough sticks with sugar and cinnamon.',
    category: 'Desserts',
    imageUrl: churros,
    ingredients: ['Flour', 'Water', 'Butter', 'Sugar', 'Cinnamon', 'Oil for frying'],
    steps: 'Prepare dough. Pipe into hot oil. Fry until golden. Roll in sugar and cinnamon.',
    author: 'Chef Miguel',
  },
  {
    id: '27',
    title: 'Crepes',
    description: 'Thin French pancakes with sweet fillings.',
    category: 'Desserts',
    imageUrl: crepes,
    ingredients: ['Flour', 'Milk', 'Eggs', 'Sugar', 'Butter', 'Filling (chocolate, fruit, cream)'],
    steps: 'Prepare batter. Cook thin pancakes on a skillet. Fill with desired filling and serve.',
    author: 'Chef Sophie',
  },
  {
    id: '28',
    title: 'Pecan Pie',
    description: 'Sweet pie with pecan nuts and syrupy filling.',
    category: 'Desserts',
    imageUrl: pecanpie,
    ingredients: ['Pie crust', 'Pecans', 'Sugar', 'Eggs', 'Butter', 'Vanilla'],
    steps: 'Prepare crust. Mix filling. Bake at 175°C for 50 mins.',
    author: 'Chef Daniel',
  },
  {
    id: '29',
    title: 'Raspberry Cheesecake',
    description: 'Cheesecake topped with fresh raspberries.',
    category: 'Desserts',
    imageUrl: raspberrycheesecake,
    ingredients: ['Cream cheese', 'Sugar', 'Eggs', 'Biscuit base', 'Raspberries'],
    steps: 'Prepare base. Mix cream cheese and sugar. Bake and top with raspberries.',
    author: 'Chef Lisa',
  },

]

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<User | null>(null)

  return (
    <Router>
      {/* Pass user and setUser to Navbar */}
      <Navbar onSearch={setSearchQuery} user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} />} />
        <Route path="/guest" element={<GuestPage setUser={setUser} />} />

        {/* Upload page only accessible if logged in */}
        {user && <Route path="/upload" element={<UploadPage user={user} />} />}

        <Route
          path="/recipes"
          element={<RecipesPage recipes={sampleRecipes} searchQuery={searchQuery} />}
        />
        <Route
          path="/recipes/:id"
          element={<RecipeDetailPage recipes={sampleRecipes} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
