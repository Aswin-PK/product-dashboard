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
        isFormVisible: false,
        formData: {},
        productUpdateStatus: null
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
        },
        ADD_PRODUCT(state, productObject) {
            const newProduct = {...productObject}
            console.log("new Product", newProduct)
            state.products.unshift({...productObject})
        },
        SET_FORM_VISIBILITY(state, isFormVisible) {
            state.isFormVisible = isFormVisible
        },

        SET_FORM_DATA(state, productObject) {
            state.formData = productObject
        },

        UPDATE_PRODUCT(state, productDetails) {
            state.products.map(product => {
                if(product.id === productDetails.id) {
                    Object.keys(product).forEach(key => {
                        product[key] = productDetails[key];
                    });
                }
            })
        },

        SET_RESPONSE_STATUS(state, statusCode) {
            state.productUpdateStatus = statusCode
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
                commit('SET_LIMITED_PRODUCTS', filteredProducts)
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
        },

        async addProduct({commit}, formData) {
            commit('SET_RESPONSE_STATUS', null) // reset the status code to null
            console.log(formData)
            const response = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    price: formData.price,
                    rating: formData.rating,
                    stock: formData.stock,
                    brand: formData.brand,
                    category: formData.category,
                    /* other product data */
                })
            });
            if(response.status === 200){
                commit('SET_RESPONSE_STATUS', response.status)
                commit('ADD_PRODUCT', formData)
            }
            else
                console.log("Something Went wrong")
        },

        async editProduct({commit}, formData) {
            commit('SET_RESPONSE_STATUS', null) // reset the status code to null
            const response = await fetch(`https://dummyjson.com/products/${formData.id}`, {
                method: 'PUT', /* or PATCH */
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    description: formData.description,
                    price: formData.price,
                    rating: formData.rating,
                    stock: formData.stock,
                    brand: formData.brand,
                    category: formData.category
                })
            });
            if(response.status === 200){
                // console.log("Status", response)
                commit('SET_RESPONSE_STATUS', response.status)
                commit('UPDATE_PRODUCT', formData)
            }
            else
                console.log("Something Went wrong")
        },

        setFormVisibleStatus({commit}, isVisible) {
            commit('SET_FORM_VISIBILITY', isVisible)
        },

        setFormData({commit}, productDetails) {
            commit('SET_FORM_DATA', productDetails)
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
        getFormVisibleStatus(state) {
            return state.isFormVisible;
        },
        getFormData(state) {
            return state.formData;
        },
        getStatusCode(state) {
            return state.productUpdateStatus
        }
    }
})