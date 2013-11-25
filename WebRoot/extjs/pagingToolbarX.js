
var btn = Ext.Toolbar;
Ext.PagingToolbar2 = Ext.extend(Ext.Toolbar, {
			pageSize : 20,
			displayMsg : "Displaying {0} - {1} of {2}",
			//emptyMsg : "No data to display",
			beforePageText : "第",
			afterPageText : "页,共 {0}页",
			firstText : "First Page",
			prevText : "Previous P" +
					"age",
			nextText : "Next Page",
			lastText : "Last Page",
			//refreshText : "Refresh",
			initComponent : function() {
				var c = [this.first = new btn.Button({
									tooltip : this.firstText,
									overflowText : this.firstText,
									iconCls : "x-tbar-page-first",
									disabled : true,
									handler : this.moveFirst,
									scope : this
								}), this.prev = new btn.Button({
									tooltip : this.prevText,
									overflowText : this.prevText,
									iconCls : "x-tbar-page-prev",
									disabled : true,
									handler : this.movePrevious,
									scope : this
								}), "-", this.beforePageText,
						this.inputItem = new Ext.form.NumberField({
									cls : "x-tbar-page-number",
									allowDecimals : false,
									allowNegative : false,
									enableKeyEvents : true,
									selectOnFocus : true,
									submitValue : false,
									listeners : {
										scope : this,
										keydown : this.onPagingKeyDown,
										blur : this.onPagingBlur
									}
								}), this.afterTextItem = new btn.TextItem({
									text : String.format(
											this.afterPageText, 1)
								}), "-", this.next = new btn.Button({
									tooltip : this.nextText,
									overflowText : this.nextText,
									iconCls : "x-tbar-page-next",
									disabled : true,
									handler : this.moveNext,
									scope : this
								}), this.last = new btn.Button({
									tooltip : this.lastText,
									overflowText : this.lastText,
									iconCls : "x-tbar-page-last",
									disabled : true,
									handler : this.moveLast,
									scope : this
								})];
				var b = this.items || this.buttons || [];
				if (this.prependButtons) {
					this.items = b.concat(c)
				} else {
					this.items = c.concat(b)
				}
				delete this.buttons;
				if (this.displayInfo) {
					this.items.push("->");
					this.items.push(this.displayItem = new btn.TextItem({}))
				}
				Ext.PagingToolbar.superclass.initComponent.call(this);
				this.addEvents("change", "beforechange");
				this.on("afterlayout", this.onFirstLayout, this, {
							single : true
						});
				this.cursor = 0;
				this.bindStore(this.store, true)
			},
			onFirstLayout : function() {
				if (this.dsLoaded) {
					this.onLoad.apply(this, this.dsLoaded)
				}
			},
			updateInfo : function() {
				if (this.displayItem) {
					var b = this.store.getCount();
					var c = b == 0 ? this.emptyMsg : String.format(
							this.displayMsg, this.cursor + 1, this.cursor
									+ b, this.store.getTotalCount());
					this.displayItem.setText(c)
				}
			},
			onLoad : function(b, e, j) {
				if (!this.rendered) {
					this.dsLoaded = [b, e, j];
					return
				}
				var g = this.getParams();
				this.cursor = (j.params && j.params[g.start])
						? j.params[g.start]
						: 0;
				var i = this.getPageData(), c = i.activePage, h = i.pages;
				this.afterTextItem.setText(String.format(
						this.afterPageText, i.pages));
				this.inputItem.setValue(c);
				this.first.setDisabled(c == 1);
				this.prev.setDisabled(c == 1);
				this.next.setDisabled(c == h);
				this.last.setDisabled(c == h);
				//this.refresh.enable();
				this.updateInfo();
				this.fireEvent("change", this, i)
			},
			getPageData : function() {
				var b = this.store.getTotalCount();
				return {
					total : b,
					activePage : Math.ceil((this.cursor + this.pageSize)
							/ this.pageSize),
					pages : b < this.pageSize ? 1 : Math.ceil(b
							/ this.pageSize)
				}
			},
			changePage : function(b) {
				this.doLoad(((b - 1) * this.pageSize).constrain(0,
						this.store.getTotalCount()))
			},
			onLoadError : function() {
				if (!this.rendered) {
					return
				}
				this.refresh.enable()
			},
			readPage : function(e) {
				var b = this.inputItem.getValue(), c;
				if (!b || isNaN(c = parseInt(b, 10))) {
					this.inputItem.setValue(e.activePage);
					return false
				}
				return c
			},
			onPagingFocus : function() {
				this.inputItem.select()
			},
			onPagingBlur : function(b) {
				this.inputItem.setValue(this.getPageData().activePage)
			},
			onPagingKeyDown : function(i, h) {
				var c = h.getKey(), j = this.getPageData(), g;
				if (c == h.RETURN) {
					h.stopEvent();
					g = this.readPage(j);
					if (g !== false) {
						g = Math.min(Math.max(1, g), j.pages) - 1;
						this.doLoad(g * this.pageSize)
					}
				} else {
					if (c == h.HOME || c == h.END) {
						h.stopEvent();
						g = c == h.HOME ? 1 : j.pages;
						i.setValue(g)
					} else {
						if (c == h.UP || c == h.PAGEUP || c == h.DOWN
								|| c == h.PAGEDOWN) {
							h.stopEvent();
							if ((g = this.readPage(j))) {
								var b = h.shiftKey ? 10 : 1;
								if (c == h.DOWN || c == h.PAGEDOWN) {
									b *= -1
								}
								g += b;
								if (g >= 1 & g <= j.pages) {
									i.setValue(g)
								}
							}
						}
					}
				}
			},
			getParams : function() {
				return this.paramNames || this.store.paramNames
			},
			beforeLoad : function() {
				if (this.rendered && this.refresh) {
					this.refresh.disable()
				}
			},
			doLoad : function(d) {
				var c = {}, b = this.getParams();
				c[b.start] = d;
				c[b.limit] = this.pageSize;
				if (this.fireEvent("beforechange", this, c) !== false) {
					this.store.load({
								params : c
							})
				}
			},
			moveFirst : function() {
				this.doLoad(0)
			},
			movePrevious : function() {
				this.doLoad(Math.max(0, this.cursor - this.pageSize))
			},
			moveNext : function() {
				this.doLoad(this.cursor + this.pageSize)
			},
			moveLast : function() {
				var c = this.store.getTotalCount(), b = c % this.pageSize;
				this.doLoad(b ? (c - b) : c - this.pageSize)
			},
			doRefresh : function() {
				this.doLoad(this.cursor)
			},
			bindStore : function(c, d) {
				var b;
				if (!d && this.store) {
					if (c !== this.store && this.store.autoDestroy) {
						this.store.destroy()
					} else {
						this.store.un("beforeload", this.beforeLoad, this);
						this.store.un("load", this.onLoad, this);
						this.store.un("exception", this.onLoadError, this)
					}
					if (!c) {
						this.store = null
					}
				}
				if (c) {
					c = Ext.StoreMgr.lookup(c);
					c.on({
								scope : this,
								beforeload : this.beforeLoad,
								load : this.onLoad,
								exception : this.onLoadError
							});
					b = true
				}
				this.store = c;
				if (b) {
					this.onLoad(c, null, {})
				}
			},
			unbind : function(b) {
				this.bindStore(null)
			},
			bind : function(b) {
				this.bindStore(b)
			},
			onDestroy : function() {
				this.bindStore(null);
				Ext.PagingToolbar.superclass.onDestroy.call(this)
			}
		})
