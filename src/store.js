import Vue from 'vue'
import Vuex from 'vuex'
import { getPosts } from './fetcher'

Vue.use(Vuex)


export const store = new Vuex.Store(
  {
    state: {
      posts: [],
      editedPost: {},
      popupVisible: false,
      popupAddVisible: false,
      loading: false,
      errorMessage: '',
      popupType: {},
    },
    mutations: {
      setLoading: (state, payload) => {
        state.loading = payload
      },
      setEditedPost: (state, payload) => {
        state.editedPost = payload
      },
      updatePost: (state, payload) => {
        state.posts.splice(state.posts.findIndex(i => i.id === payload.id), 1, payload)
      },
      setPopupVisible: (state, payload) => {
        state.popupVisible = payload
      },
      setPopupAddVisible: (state, payload) => {
        state.popupAddVisible = payload
      },
      setPopupType: (state, payload) => {
        state.popupType = payload
      },
      setErrorMessage: (state, payload) => {
        state.errorMessage = payload
      },
      setPosts: (state, payload) => {
        state.posts = payload
      },
      createPost: (state, payload) => {
        state.posts.unshift(payload)
      },
      deletePost: (state, payload) => {
        state.posts.splice(payload, 1)
      },
    },
    actions: {
      setLoading: (context, payload) => {
        context.commit('setLoading', payload)
      },
      setEditedPost: (context, payload) => {
        context.commit('setEditedPost', payload)
      },
      updatePost: (context, payload) => {
        context.commit('updatePost', payload)
      },
      setErrorMessage: (context, payload) => {
        context.commit('setErrorMessage', payload)
      },
      setPopupVisible: (context, payload) => [
        context.commit('setPopupVisible', payload)
      ],
      setPopupAddVisible: (context, payload) => [
        context.commit('setPopupAddVisible', payload)
      ],
      setPopupType: (context, payload) => {
        context.commit('setPopupType', payload)
      },
      createPost: (context, payload) => [
        context.commit('createPost', payload)
      ],
      deletePost: (context, payload) => {
        context.commit('deletePost', payload)
      },
      setPosts: async ({ commit, dispatch }) => {
        dispatch('setLoading', true)
        try {
          const response = await getPosts()
          if (response.status === 200) {
            const data = await response.json()
            commit('setPosts', data.slice(0, 10))
          }
          else {
            dispatch('setErrorMessage', await response.text())
          }
        }
        catch (e) {
          dispatch('setErrorMessage', e.message)
        }
        finally {
          dispatch('setLoading', false)
        }
      },
    },
    getters: {
      allPosts(state) {
        return state.posts
      }
    },
  }
)