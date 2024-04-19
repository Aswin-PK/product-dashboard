import HomePage from './pages/home.vue'
import ProductDetails from './pages/product-details.vue'
import CategoryListPage from './pages/category-list.vue'
import CategoryProductsPage from './pages/category-products.vue'
import ProductFormPage from './pages/product-form-page.vue'


export const Routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: HomePage },
    { path: '/categories', component: CategoryListPage },
    { path: '/categories/:category', component: CategoryProductsPage},
    { path: '/categories/:category/:id', component: ProductDetails},
    { path: '/all-products/:id', component: ProductDetails },
    { path: '/add-product', component: ProductFormPage },
    { path: '/edit-product', component: ProductFormPage },
]