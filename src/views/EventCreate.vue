<template lang="html">
  <div class="container">
    <h1>Create Event</h1>

    <div class="">
      <form @submit.prevent="createEvent">
      <div class="form-group">
        <label>Title</label>
        <input type="text" class="form-control" v-model="event.title">
      </div>
      <div class="form-group">
        <label>Description</label>
        <input type="text" class="form-control" v-model="event.description">
      </div>
      <div class="form-group">
        <label>Location</label>
        <input type="text" class="form-control" v-model="event.location">
      </div>
      <div class="form-group">
        <label>Date</label>
        <input type="text" class="form-control" v-model="event.date">
      </div>
      <div class="form-group">
        <label>Select A Time</label>
        <select class="form-control" v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Select Category</label>
        <select class="form-control" v-model="event.category">
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </div>

  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      categories: this.$store.state.categories,
      times
    }
  },
  methods: {
    createFreshEvent() {
      const user = this.$store.state.user.name
      const id = Math.floor(Math.random() * 1000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: ''
      }
    },
    createEvent() {
      this.$store.dispatch('createEvent', this.event)
      .then(() => {
        this.$router.push({
          name: 'event-show',
          params: { id: this.event.id }
        })
        this.event = this.createFreshEvent()
      })
      .catch(() => {
        console.log('There was a problem creating your event.')
      })
    },
  }
}
</script>

<style lang="css" scoped>
</style>
