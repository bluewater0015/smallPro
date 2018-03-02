import Promise from '../vendor/bluebird.min.js';

import BaseService from './BaseService.js';

function searchSuggest(value, latitude, longitude){
    return BaseService.get('https://w.mapbar.com/search2015/search/suggest',{
        keywords: value,
        city: '110000',
        location: latitude + ',' + longitude
    })
}
module.exports = {
    searchSuggest
}