define(["jquery","backbone","parse","backform","../helpers/PromiseFailReport"],function(e,n,t,r,o){var i=n.View.extend({initialize:function(){_.bindAll(this,"render","submit")},register:function(e,n){var o=this;o.troupe=e,o.user=n;var i={};return t.Promise.when(o.troupe.get_roles()).then(function(e){i=e;var n=_.map(o.troupe.title_options,function(e){var n=i[e].getUsers(),t=n.query();return t.equalTo("objectId",o.user.id),t.count().then(function(n){i[e]=n,console.log("Setting up role "+e+" count with "+n)})});return t.Promise.when(n)}).then(function(){var e=_.findKey(i,function(e,n,t){return console.log("Got "+e+" for "+n),!!(_.isFinite(e)&&e>0)});return console.log("I found this user with a role of "+e),t.Promise.as(e)}).then(function(e){o.user.set("role",e||"None"),o.form=new r.Form({el:"#troupe-edit-staff-form",model:o.user,fields:[{name:"username",label:"Username",control:"uneditable-input"},{name:"realname",label:"Name",control:"uneditable-input"},{name:"role",label:"Role",control:"select",options:[{label:"Lead Storyteller",value:"LST"},{label:"Assistant Storyteller",value:"AST"},{label:"Narrator",value:"Narrator"},{label:"Not on Staff",value:"None"}]},{control:"spacer"},{control:"button",label:"Save"}]}),o.render()}).fail(function(e){_.isArray(e)?_.each(e,function(e){console.log("Something failed"+e.message)}):console.log("error updating experience"+e.message)})},events:{submit:"submit"},submit:function(e){var n=this;e.preventDefault();var r=n.user.get("role"),i=_.slice(n.troupe.title_options),a=[];"None"!=r&&(a.push(r),i=_.xor(i,a));var l=function(e){_.each(i,function(t){var r=e[t].getUsers();r.remove(n.user)}),_.each(a,function(t){e[t].getUsers().add(n.user)});var r=_.values(e),l=_.map(r,function(e){return e.save().fail(function(n){console.log("Failed to save role "+e.get("name")+" with "+JSON.stringify(n))}).fail(o)});return t.Promise.when(l)};return t.Promise.when(n.troupe.get_roles()).then(l).then(function(){return n.troupe.get_generic_roles()}).then(l).always(function(){window.location.hash="#troupe/"+n.troupe.id}).fail(o)},render:function(){var e=this;return e.form.render(),this.$el.enhanceWithin(),this}});return i});