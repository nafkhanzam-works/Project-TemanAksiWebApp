exports.PASSWORD = process.env.PASSWORD || 'dbPwd';
exports.DATABASE = `mongodb+srv://dbAdmin:${exports.PASSWORD}@bagus-db-egwmx.gcp.mongodb.net/test?retryWrites=true`;
exports.PORT = process.env.PORT || 3000;
exports.PROD = process.env.NODE_ENV === 'production';
exports.USER_QUERIES = ['find', 'findById', 'findOne'];
exports.except = function(user, collection, query) {
    return (collection === 'user' && query === 'create')
        || (user && collection === 'school' && query === 'create');
}
exports.OPTION_LIST = ['tailable', 'sort', 'limit', 'skip', 'maxscan', 'batchSize', 'comment', 'snapshot', 'readPreference', 'hint'];
exports.AUTH = 'tokenAccess';