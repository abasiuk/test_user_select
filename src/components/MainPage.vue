<template>
  <v-container>
    <user-select
      v-model="users"
      :search-request="userSearch"
    >
    <!--   Slot test   -->
    <!-- <template #selectedUserOption="{ user }">-->
    <!--   {{ user }}-->
    <!-- </template>-->
    </user-select>
  </v-container>
</template>
<script>
import UserSelect from '@/components/users/UserSelect.vue'
import { userSearch } from '@/services/users-fake-api'

export default {
  name: 'MainPage',
  components: { UserSelect },
  data() {
    return {
      users: [
        // v-model test
        // {
        //   id: '62227404-8066-11ed-a1eb-0242ac120002',
        //   name: 'User 1',
        //   avatar: 'https://i.pravatar.cc/32'
        // }
      ]
    }
  },
  methods: {
    userSearch
  }
}
</script>
