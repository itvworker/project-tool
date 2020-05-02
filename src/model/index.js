
import Vue from 'vue';
import school from './school/model';
import map from './map/model';
import user from './user/model'
Vue.prototype.$model = {
    school: school,
    map: map,
    user:user
};

