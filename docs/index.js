const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const services = require('./services');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...services,
};