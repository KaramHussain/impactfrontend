
export default function ({$axios, store, app}) {

  $axios.onError(error => {
    if(error.response.status === 422) {
      store.dispatch('validation/setErrors', error.response.data.errors);
    }
    if(error.response.status === 401) {
      //app.$auth.logout();
    }
    return Promise.reject(error);
  });


  $axios.onResponse((response) => {
    if(response.status === 200) {
      return Promise.resolve(response);
    }
  });


  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors');
  });

}
