import vuetify from 'vuetify'
import { shallowMount } from '@vue/test-utils'
import UserSelect from '@/components/users/UserSelect.vue'
import Vue from 'vue'

const mockSearchRequest = () => {
  return {
    data: [
      {
        id: '62227404-8066-11ed-a1eb-0242ac120002-for_test_1',
        name: 'User Test 1',
        avatar: 'https://i.pravatar.cc/31'
      },
      {
        id: '62227404-8066-11ed-a1eb-0242ac120002-for_test_2',
        name: 'User Test 2',
        avatar: 'https://i.pravatar.cc/31'
      },
    ],
    meta: {
      total: 2
    }
  }
}

describe('UserSelect', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(vuetify);
  })

  it('renders the component correctly', () => {
    wrapper = shallowMount(UserSelect);
    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find('.app-user-select__title').text()).toBe('Add a user');
    expect(wrapper.find('.app-user-select__body').exists()).toBe(true);
  });

  it('renders the edit mode correctly', async () => {
    wrapper = shallowMount(UserSelect);

    await wrapper.vm.onAddUser();
    expect(wrapper.vm.isEditMode).toBeTruthy();
    expect(wrapper.find('.app-user-select__search').exists()).toBe(true);
  })

  it('renders the users list correctly', async () => {
    wrapper = shallowMount(UserSelect, {
      propsData: {
        searchRequest: mockSearchRequest
      }
    })
    await wrapper.vm.onAddUser()

    expect(wrapper.vm.usersList.length).toBe(2);
    expect(wrapper.vm.usersMeta.total).toBe(2);
    expect(wrapper.vm.isEmptyList).toBeFalsy();

    expect(wrapper.find('.app-user-select__list').exists()).toBe(true);
  })

  it('emits the selected users correctly', async () => {
    wrapper = shallowMount(UserSelect);
    await wrapper.vm.onSelectUser({
      id: '62227404-8066-11ed-a1eb-0242ac120002-for_test_1',
      name: 'User Test 1',
      avatar: 'https://i.pravatar.cc/31'
    });

    expect(wrapper.vm.selectedUsers.length).toBe(1);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toEqual([
      {
        id: '62227404-8066-11ed-a1eb-0242ac120002-for_test_1',
        name: 'User Test 1',
        avatar: 'https://i.pravatar.cc/31'
      }
    ]);
  });

  it('removes a user correctly', async () => {
    wrapper = shallowMount(UserSelect, {
      propsData: {
        value: [
          {
            id: '62227404-8066-11ed-a1eb-0242ac120002-for_test_1',
            name: 'User Test 1',
            avatar: 'https://i.pravatar.cc/31'
          },
          {
            id: '62227404-8066-11ed-a1eb-0242ac120002-for_test_2',
            name: 'User Test 2',
            avatar: 'https://i.pravatar.cc/31'
          },
        ]
      }
    });

    await wrapper.vm.onRemoveUser({
      id: '62227404-8066-11ed-a1eb-0242ac120002-for_test_1',
      name: 'User Test 1',
      avatar: 'https://i.pravatar.cc/31'
    });

    expect(wrapper.vm.selectedUsers.length).toBe(1);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input[0][0]).toEqual([
      {
        id: '62227404-8066-11ed-a1eb-0242ac120002-for_test_2',
        name: 'User Test 2',
        avatar: 'https://i.pravatar.cc/31'
      }
    ]);
  });
});
