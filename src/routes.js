import HomePage from './pages/home.vue'
import ProductDetails from './pages/product-details.vue'
import CategoryListPage from './pages/category-list.vue'
import CategoryProductsPage from './pages/category-products.vue'

export const Routes = [
    { path: '/', component: HomePage },
    { path: '/categories', component: CategoryListPage },
    { path: '/categories/:category', component: CategoryProductsPage},
    { path: '/categories/:category/:id', component: ProductDetails},
    { path: '/all-products/:id', component: ProductDetails },
]