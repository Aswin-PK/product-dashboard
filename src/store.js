import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        products: [],
        limitedProducts: [], // this is for storing limited products when user selects some categories of product
        categories: [],
        tableColumnHeaders: [],
        selectedCategory: [],
        totalItems: null,
        limit: 10,
        loading: false,
        singleProduct: null,
    },
    mutations: {
        SET_PRODUCTS(state, productItems) {
            state.products = productItems
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },
        SET_TABLE_COLUMN_HEADERS(state) {
            const headers = Object.keys(state.products[0])
            state.tableColumnHeaders = headers
        },
        SET_TOTAL(state, total) {
            state.totalItems = total
        },
        SET_LIMIT(state, limit) {
            state.limit = limit
        },
        SET_SINGLE_PRODUCT(state, data) {
            state.singleProduct = data
        },
        SET_LIMITED_PRODUCTS(state, getLimitedProducts) {
            state.limitedProducts = getLimitedProducts
        }
    },
    actions: {
        async fetchProducts({commit, state}, {category=state.selectedCategory, limit=state.limit, skip=0}) {
            state.loading = true;
            state.selectedCategory = category

            const skipCount = (state.selectedCategory.length === 0) ? ( (skip == 0) ? 0 : (skip-1)*limit ) : 0
            
            let response, products = [], total = 0;
            try {
                if(state.selectedCategory.length !== 0) {
                    // If some particular category data to be fetched
                    await Promise.all(state.selectedCategory.map(async category => {
                        if(category) {
                            response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skipCount}`)
                            total += response.data.total
                            products.push(...response.data.products)
                            commit('SET_LIMITED_PRODUCTS', products.slice(0, limit));
                        }
                    }));
                }
                else {
                    // If all products need to be fetched
                    response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skipCount}`)
                    products = response.data.products;
                    total += response.data.total
                }
                state.loading = false;

                commit('SET_TOTAL', total)
                commit('SET_PRODUCTS', products)
                this.dispatch('setTableColumnHeaders')
            }
            catch(error) {
                console.log("Something went wrong...", error)
            }
        },
        
        async fetchCategories({commit}) {
            try {
                const response = await axios.get('https://dummyjson.com/products/categories');
                commit('SET_CATEGORIES', response.data)
            }
            catch(error) {
                console.log("Something went wrong...", error)
            }
        },

        setTableColumnHeaders({commit}) {
            commit('SET_TABLE_COLUMN_HEADERS')
        },

        async searchProducts({commit, state}, searchInput) {
            if(state.selectedCategory.length !== 0) {
                let filteredProducts = state.products.filter(product => {
                    return product.title.toLowerCase().includes(searchInput.toLowerCase())
                })
                commit('SET_PRODUCTS', filteredProducts)
            }
            else {
                try {
                    const response = await axios.get(`https://dummyjson.com/products/search?q=${searchInput}&limit=${state.limit}`)
                    commit('SET_PRODUCTS', response.data.products)
                }
                catch(error) {
                    console.log("Error while searching...")
                }
            }
        },

        setLimit({commit}, limit) {
            // if the user set some particular limit for displaying products
            commit('SET_LIMIT', limit)
        },

        async fetchSingleProduct({commit, state}, id) {
            state.singleProduct = null
            state.loading = true
            try {
                const response = await axios.get('https://dummyjson.com/products/'+id)
                commit('SET_SINGLE_PRODUCT', response.data)
            }
            catch(error) {
                console.log('Something went wrong,', error)
            }
            state.loading = false
        },

        fetchNextProducts({commit, state}, skipValue) {
            if(state.selectedCategory.length === 0) {
                this.dispatch('fetchProducts', skipValue)
            }
            else {
                // Pagination if categories are selected..
                skipValue = skipValue.skip;
                const limitedProducts = state.products.slice((skipValue-1)*state.limit, skipValue*state.limit);
                commit('SET_LIMITED_PRODUCTS', limitedProducts);
            }
        }

    },
    getters: {
        getAllProducts(state) {
            if(state.selectedCategory.length === 0) {
                return state.products;
            }
            else {
                return state.limitedProducts;
            }
        },
        getAllCategories(state) {
            return state.categories;
        },
        getTableColumnHeaders(state) {
            return state.tableColumnHeaders;
        },
        getDisplayLimit(state) {
            return {limit: state.limit, total: state.totalItems};
        },
        getLoading(state) {
            return state.loading
        },
        getSingleProduct(state) {
            return state.singleProduct
        },
    }
})