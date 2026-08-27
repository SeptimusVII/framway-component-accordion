module.exports = function(){
    let Accordion = Object.getPrototypeOf(fw).Accordion = class Accordion extends fw.Component{
        static {
            this.debug = true;
            this.createdAt  = "3.0.0";
            this.lastUpdate = "3.0.0";
            this.version = "2.0.0";
            this.tpl = utils.getNodeFromString(require('bundle-tpl:./accordion.html')).outerHTML;
            // this.describe();
            
            this.togglerTitleItem =  document.addEventListener('click',(e)=>{
                let toggler = e.target.closest('.accordion__title') ?? false;
                if (toggler){
                    let acc = toggler.closest('.accordion').component;
                    if (!e.target.getAttribute('href') && !e.target.parentNode.getAttribute('href') ){
                        if(acc.autocollapse)
                            acc.collapseItems(Array.from(acc.items).toSpliced(acc.items.indexOf(toggler.closest('.accordion__item')),1));
                        acc.toggleItem(toggler.closest('.accordion__item'));
                    }   
                }
            })
        }
        onCreate(){
            this.items = this.el.querySelectorAll('.accordion__item') ?? false;
            for(var item of this.items)
                item.querySelector('.accordion__content').wrapInner('<div class="accordion__content__wrapper"></div>');
            this.deployall    ??= this.getData('deployall',false);
            this.disable      ??= this.getData('disable',false);
            this.autocollapse ??= this.getData('autocollapse',false);

            if(this.deployall || this.disable)
                this.deployItems(this.items);

            for(var item of this.items){
                if(item.classList.contains('active') || item.classList.contains('lock'))
                    this.deployItem(item);
            };
        }
        
        toggleItems(items){
            for(var item of items)
                this.toggleItem(item);
            return this;
        }
        toggleItem(item){
            item.classList.toggle('active');
            return this;
        };

        deployItems(items){
            for(var item of items)
                this.deployItem(item);
            return this;
        }
        deployItem(item){
            item.classList.add('active');
            return this;
        }

        collapseItems(items){
            for(var item of items)
                this.collapseItem(item);
            return this;
        }
        collapseItem(item){
            item.classList.remove('active');
            return this;
        }
    }
    return Accordion;
}