export default function ({store, redirect}) {
  if(store.getters['profile/loggedIn']) {
    return redirect('/');
  }
}
