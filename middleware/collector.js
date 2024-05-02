export default function({store, redirect, route, app}) {
  let user = store.getters['profile/user'];
  let loggedIn = store.getters['profile/loggedIn'];

  /*
    Because we have to check on each route if on that route permission does not exists redirect him to dashboard.
  // */
  // if(route.name in permissionBasedRoutes()) {

  //   let permission = permissionBasedRoutes()[route.name]

  //   if(!permission.includes(permissions(app))) {
  //     let redirect_uri = user.roles?.name == 'collector' ? 'dashboard' : 'index'
  //     return redirect({name:redirect_uri})
  //   }

  // }

  if(loggedIn && user.roles.name != 'collector') {
    return redirect('/');
  }

}

export function permissions(app) {
  let permissions = []
  if(app.$auth.loggedIn) {
    permissions = app.$auth.user.formattedPermissions.map((permission) => {
      return permission.name
    })
  }
  return permissions
}

export function permissionBasedRoutes() {

  // guarded routes only
  return {
    'file-tracker'    : 'view-claims',
    'details'         : 'view-claims',
    'claims'          : 'view-claims',
    'file-tracker-id' : 'view-claims',
    'members'         : 'view-members',
    'claim-id'        : 'view-claim',
    'index'           : 'view-reports'
  }

}

