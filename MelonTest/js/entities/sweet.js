﻿/// <reference path="../../lib/melonJS-0.9.9.js" />

/*----------------
 Sweets entity
------------------------ */
game.SweetEntity = me.CollectableEntity.extend({

    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);

        var sweetColor = Math.floor(4 * Math.random());

        this.renderable.anim = {};
        this.renderable.addAnimation("sweet", [sweetColor]);
        this.renderable.setCurrentAnimation("sweet");

        this.rotation = -(Math.PI / 4);
        this.rotationDir = 0;

        this.startTween();
        
        this.pos.x += 8;
        this.z = 3;
    },

    startTween: function() {
        this.rotationDir = 1 - this.rotationDir;

        var tween = new me.Tween(this).to({ rotation: (this.rotationDir * (Math.PI / 2)) - (Math.PI/4) }, 500 + (Math.random()*500)).onComplete(this.startTween.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.Out);
        tween.start();
    },

    update: function () {
        this.parent();

        this.renderable.angle = this.rotation;

        

        return true;
    },

    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function () {
        // do something when collected
        var tween = new me.Tween(this.pos).to(me.game.viewport.localToWorld(100,-50), 500).onComplete(this.endCollect.bind(this));
        tween.easing(me.Tween.Easing.Quadratic.In);
        tween.start();

        // make sure it cannot be collected "again"
        this.collidable = false;
    },

    endCollect: function () {
        // remove it
        me.game.remove(this);
    }

});
