export default function ({ redirect, store, $route }) {
  let user = store.getters['profile/user'];
  let loggedIn = store.getters['profile/loggedIn'];

  let role
  if (user && user.roles.name) {
    role = user.roles.name.toLowerCase()
  }

  if (loggedIn && (role != 'admin' && role != 'manager')) {
    return redirect('/dashboard');
  }

}
