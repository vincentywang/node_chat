var util = {
  'upFirstLetter' : function (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  },
  'isEmpty' : function (obj) {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
        return false;
    }

    return true;
  },
  'queryExecuteHandler' : function (results, error, funTagName, callback){
    if (error) {
      console.log("error to execute query through " + funTagName + " function");
      console.log(error);
      callback({
        'success' : false,
        'err' : error
      });
    } 
    if (results) {
      var data = {};
      if (results.length === 0) {
        data.success = false;
        data.message = "no data fetched from database";
      } else {
        data. success = true;
      }
      data.content = results;
      callback(data);
    }
  }
};

module.exports = util;