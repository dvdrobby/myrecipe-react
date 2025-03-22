export interface Recipe{
    id : number
    name : string
    slug : string
    url_file : string
    url_video : string
    thumbnail : string
    about : string
    category : Category
    recipe_ingredients : RecipeIngredients[]
    tutorials : RecipeTutorials[]
    photos : RecipePhotos[]
    author : Author
}

export interface Category{
    id : number
    name : string
    slug : string
    icon : string
    recipes_count : number
    recipes : Recipe[]
}

export interface RecipeIngredients{
    id : number
    ingredient : Ingredient
}

export interface Ingredient{
    id : number
    name : string
    photo : string
}

interface RecipePhotos{
    id : number
    photo : string
}

interface RecipeTutorials{
    id : number
    description : string
}

interface Author{
    id : number
    name : string
    photo : string
}