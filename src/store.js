import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Mourad EL Jayi'},
    events: [],
    event: {},
    eventsTotal: 0,
    categories: [
      "JAVA",
      'C++',
      'PHP',
      'PERL',
      'PYTHON'
    ],
  },
  getters: {},
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then( () => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvent({ commit, getters }, id) {

      var event = getters.getEventById(id)

      if(event) {
        commit('SET_EVENT', event)
      } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
       }
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    },
  }
})
