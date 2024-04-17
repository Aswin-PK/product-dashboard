import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        products: [],
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
    },
    actions: {
        async fetchProducts({commit, state}, {category=state.selectedCategory, limit=state.limit, skip=0}) {

            state.loading = true;

            state.selectedCategory = category
            const skipCount = (state.selectedCategory.length === 0) ? ( (skip == 0) ? 0 : (skip-1)*limit ) : 0
            
            let response, products = [], total = 0;
            try {
                if(state.selectedCategory.length !== 0) {
                    await Promise.all(state.selectedCategory.map(async category => {
                        if(category) {
                            response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skipCount}`)
                            total += response.data.total
                            products.push(...response.data.products)
                        }
                    }));
                }
                else {
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
                try {
                    const response = await axios.get(`https://dummyjson.com/products/search?q=${searchInput}&limit=${state.limit}`)
                    commit('SET_PRODUCTS', response.data.products)
                }
                catch(error) {
                    console.log("Error while searching...")
                }
            }
            else {
                let filteredProducts = state.products.filter(product => {
                    return product.title.toLowerCase().includes(searchInput.toLowerCase())
                })
                commit('SET_PRODUCTS', filteredProducts)
            }
        },

        setLimit({commit}, limit) {
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
        }

    },
    getters: {
        getAllProducts(state) {
            return state.products;
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