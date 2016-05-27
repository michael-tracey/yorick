// Includes file dependencies
define([
    "jquery",
    "backbone",
    "parse",
    "backform",
    "../forms/UserForm",
    "text!../templates/profile-facebook-account.html",
    "../helpers/PromiseFailReport"
], function ($, Backbone, Parse, Backform, UserForm, profile_facebook_account, PromiseFailReport) {

    // Extends Backbone.View
    var UserSettingsProfileView = Backbone.View.extend({
        initialize: function () {
            var view = this;
            view.facebookTemplate = _.template(profile_facebook_account);

            view.errorModel = new Backbone.Model();
            this.form = new UserForm({
                errorModel: view.errorModel,
                model: Parse.User.current() || new Backbone.Model,
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
            view.form.fields.add(new Backform.Field({name: "submit", label: "Update", control: "button", disabled: true, id: "submit"}));
        },

        events: {
            "click #facebook-unlink": "unlink",
        },

        unlink: function(e) {
            var view = this;
            e.preventDefault();
            view.undelegateEvents();

            Parse.User.current().set("authData", null);
            Parse.User.current().save().then(function () {
                view.delegateEvents();
                view.render();
            }).fail(PromiseFailReport);
        },

        render: function () {
            var view = this;

            if (this.form.model !== Parse.User.current()) {
                var errorModel = this.form.errorModel;
                this.form.model = Parse.User.current();
                this.form.model.errorModel = errorModel;
            }
            this.form.setElement(this.$el.find("form.profile-form"));
            this.form.render();

            this.$el.find(".facebook-account-linking").html(this.facebookTemplate());

            this.$el.enhanceWithin();
        }
    });

    // Returns the View class
    return UserSettingsProfileView;

});
