
import Vue from 'vue';
import school from './school/model';
import map from './map/model';
Vue.prototype.$model = {
    school: school,
    map: map
};

