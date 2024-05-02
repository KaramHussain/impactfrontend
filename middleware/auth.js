export default function ({ app, redirect }) {
    // If the user is not logged in, redirect to the login page
    if (!app.$auth.loggedIn) {
        return redirect('/login')
    }
}