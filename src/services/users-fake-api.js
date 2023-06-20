/**
 * filter function
 */
function filterUserList(user, { query, except }) {
  const userNameToLowerCase = user.name.toLowerCase()
  const queryToLowerCase = query.toLowerCase()

  return !except.includes(user.id) && userNameToLowerCase.includes(queryToLowerCase)
}

/**
 * query string search query
 * except array of user id which already chosen
 **/
export function userSearch(query = '', except = []) {
  const list = [
    {
      id: '62227404-8066-11ed-a1eb-0242ac120002',
      name: 'User 1',
      avatar: 'https://i.pravatar.cc/31'
    },
    {
      id: '69f01b0a-8066-11ed-a1eb-0242ac120002',
      name: 'User 2',
      avatar: 'https://i.pravatar.cc/33'
    },
    {
      id: '722907f0-8066-11ed-a1eb-0242ac120002',
      name: 'User 3',
      avatar: 'https://i.pravatar.cc/32'
    }
  ]
  const filteredList = list.filter((user) => filterUserList(user, { query, except }))

  return {
    data: filteredList,
    meta: {
      total: filteredList.length
    }
  }
}
