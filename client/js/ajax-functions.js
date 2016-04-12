var AjaxFunctions = {

    post: function(url, data, done) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            data: data,

            // HACK to jquery to send stringified JSON,
            // needed to tranfer an array in body.
            contentType: 'application/json; charset=utf-8',

            success: function(data) {
                done(null, data);
            },
            error: function(err) {
                done(err);
            }
        });
    },
    put: function(url, data, done) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'PUT',
            data: data,
            success: function(data) {
                done(null, data);
            },
            error: function(err) {
                done(err);
            }
        });
    },
    get: function(url, done) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            success: function(data) {
                done(null, data);
            },
            error: function(err) {
                done(err);
            }
        });
    },
    delete: function(url, data,  done){

        $.ajax({
            type: "DELETE",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data) {
                done(null, data);
            }.bind(this),
            error: function(err) {
                done(err)
            },
            dataType: 'json'
        });
    }


}

module.exports = AjaxFunctions;
