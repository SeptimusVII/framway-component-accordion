module.exports = function(app){
    var AccordionFW = Object.getPrototypeOf(app).AccordionFW = new app.Component("accordionFW");
    //AccordionFW.debug = true;
    AccordionFW.createdAt      = "2.0.0";
    AccordionFW.lastUpdate     = "2.8.0";
    AccordionFW.version        = "1.2.0";
    // AccordionFW.factoryExclude = true;
    // AccordionFW.loadingMsg     = "This message will display in the console when component will be loaded.";
    // AccordionFW.requires       = [];

    AccordionFW.prototype.onCreate = function(){
        var acc = this;
        acc.$items = acc.$el.children('.accordionFW__item');
        acc.$items.children('.accordionFW__content').wrapInner('<div class="accordionFW__content__wrapper"></div>');
        acc.deployall = acc.getData('deployall',false);
        acc.disable = acc.getData('disable',false);
        acc.autocollapse = acc.getData('autocollapse',false);

        if(acc.deployall || acc.disable)
            acc.deployItem(acc.$items);

        acc.$items.children('.accordionFW__title').on('click',function(e){
            if (!$(e.target).attr('href') && !$(e.target).parent().attr('href') ){
                if(acc.autocollapse)
                    acc.collapseItem(acc.$items.not($(this).closest('.accordionFW__item')));
                acc.toggleItem($(this).closest('.accordionFW__item'));
            }      
        })

        acc.$items.each(function(index,item){
            if($(item).hasClass('active') || $(item).hasClass('lock'))
                acc.deployItem($(item));
        });
    }

    AccordionFW.prototype.onResize = function(){
        // this.resizeItem(this.$items);
    };

    AccordionFW.prototype.toggleItem = function($items){
        var acc = this;
        $items.each(function(index,$item){
            $item = $($item);
            if($item.hasClass('active'))
                acc.collapseItem($item);
            else
                acc.deployItem($item);
        });
        return acc;
    };

    AccordionFW.prototype.deployItem = function($item){
        $item.addClass('active');
        // this.resizeItem($item);
        return this;
    }
    AccordionFW.prototype.collapseItem = function($item){
        $item.removeClass('active');
        // this.resizeItem($item);
        return this;
    }
    AccordionFW.prototype.resizeItem = function($items){
        var acc = acc;
        $items.each(function(index,$item){
            $item = $($item);
            if($item.hasClass('active') || $item.hasClass('lock') ){
                $item.find('.accordionFW__content').css('height',$item.find('.accordionFW__content__wrapper').get(0).scrollHeight);
            }
            else
                $item.find('.accordionFW__content').css('height',0);
        });
        return acc;
    }
    return AccordionFW;
}