<template>
  <v-card max-width="500px" class="mx-auto">
    <v-card-title>
      Add a user
    </v-card-title>

    <v-card-text>
      <v-row
        v-if="!isEditMode"
        align="center"
        class="mb-2"
      >
        <template
          v-for="user in selectedUsers"
        >
          <slot
            name="selectedUserOption"
            :user="user"
          >
            <v-avatar
              :key="user.id"
              class="mx-2"
            >
              <img
                :src="user.avatar"
                :alt="user.name"
              >
            </v-avatar>
          </slot>
        </template>

        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="onAddUser"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-row>

      <v-row
        v-else
      >
        <v-col cols="12">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            placeholder="Enter name..."
            hide-details
            @input="onChangeSearch"
          >
            <template #append-outer>
              <v-btn
                fab
                dark
                small
                color="success"
                @click="onExit"
              >
                <v-icon dark>
                  mdi-check
                </v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>

        <v-col
          v-if="hasSelectedUsers"
          cols="12"
        >
          <div
            v-for="user in selectedUsers"
            :key="user.id"
            class="mx-2 cursor-pointer d-inline"
            @click="onRemoveUser(user)"
          >
            <slot
              name="selectedUserOption"
              :user="user"
            >
              <v-avatar>
                <img
                  :src="user.avatar"
                  :alt="user.name"
                >
              </v-avatar>
            </slot>
          </div>
        </v-col>

        <v-col cols="12">
          <v-card>
            <v-list>
              <v-subheader
                v-if="isEmptyList"
              >
                List is empty
              </v-subheader>

              <template
                v-else
              >
                <v-subheader>Select a user</v-subheader>

                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="(user) in usersList"
                    :key="user.id"
                    @click="onSelectUser(user)"
                  >
                    <slot
                      name="userOption"
                      :user="user"
                    >
                      <v-list-item-icon>
                        <v-avatar>
                          <img
                            :src="user.avatar"
                            :alt="user.name"
                          >
                        </v-avatar>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title v-text="user.name" />
                      </v-list-item-content>
                    </slot>
                  </v-list-item>
                </v-list-item-group>

                <v-subheader
                  v-if="usersMeta.total"
                >
                  Find {{ usersMeta.total }} more
                </v-subheader>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'UserSelect',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    searchRequest: {
      type: Function,
      default: () => []
    }
  },
  data() {
    return {
      selectedUsers: [],
      search: '',
      usersList: [],
      usersMeta: {
        total: 0
      },
      isEditMode: false
    }
  },
  watch: {
    'value': {
      handler(val) {
        this.selectedUsers = [...val]
      },
      immediate: true
    }
  },
  computed: {
    hasSelectedUsers() {
      return this.value.length
    },
    selectedUserIds() {
      return this.selectedUsers.map((user) => user.id)
    },
    isEmptyList() {
      return !this.usersList.length
    }
  },
  mounted() {
    this.loadUsers('')
  },
  methods: {
    loadUsers(query) {
      const { data, meta } = this.searchRequest(query, this.selectedUserIds)

      this.usersList = data
      this.usersMeta = meta
    },
    onChangeSearch(query) {
      this.loadUsers(query)
    },
    onAddUser() {
      this.isEditMode = true
    },
    onExit() {
      this.isEditMode = false
    },
    onSelectUser(selectedUser) {
      this.usersList = this.usersList.filter((user) => user.id !== selectedUser.id)
      this.selectedUsers.push(selectedUser)

      this.onInput()
    },
    onRemoveUser(removedUser) {
      this.selectedUsers = this.selectedUsers.filter((user) => user.id !== removedUser.id)
      this.usersList.unshift(removedUser)

      this.onInput()
    },
    onInput() {
      this.$emit('input', this.selectedUsers)
    }
  }
}
</script>
<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>
