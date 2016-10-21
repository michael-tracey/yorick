// Category View
// =============

// Includes file dependencies
define([
	"jquery",
	"backbone",
	"marionette",
	"backform"
], function( $, Backbone, Marionette, Backform ) {

    var View = Marionette.ItemView.extend({
        tagName: 'form',
        template: _.template(""),
        
        initialize: function() {
            var view = this;
            this.form = new Backform.Form.extend({
                model: new Backbone.Model(),
                fields: [
                    {name: "name", label: "Character Name", control: "input"},
                    {name: "submit", label: "Update", control: "button", disabled: true, id: "submit"}
                ],
                events: {
                    "change": function (e) {
                        e.preventDefault();
                        this.$('button[name=submit]').removeAttr("disabled");
                        var s = this.fields.get("submit");
                        if ("success" == s.get("status")) {
                            s.set({status: "", message: "", disabled: false});
                            this.$el.enhanceWithin();
                        }
                    },
                    "submit": function (e) {
                        var self = this;
                        e.preventDefault();
                        $.mobile.loading("show");
                        self.undelegateEvents();
                        self.model.errorModel.clear();

                        /*
                        self.model.errorModel.set({"realname": "Refusing any real name whatsoever"});
                        */

                        InjectAuthData(self.model);

                        self.model.save().then(function () {
                            self.fields.get("submit").set({status: "success", message: "Successfully Updated", disabled: true});
                            self.$el.enhanceWithin();
                        }, function (error) {
                            self.fields.get("submit").set({status: "error", message: _.escape(error.message), disabled: false});
                            self.$el.enhanceWithin();
                        }).always(function () {
                            $.mobile.loading("hide");
                            self.delegateEvents();
                        });

                        return false;
                    }
                }
            });
        },
        
        onRender: function() {
            this.form.setElement(this.$el);
            this.form.render();
            
            this.$el.enhanceWithin();
            return this;
        },
        
        register: function(character) {
            this.form.model.set("name", character.get("name"));
            return this.render();
        }
    } );

    // Returns the View class
    return View;

} );