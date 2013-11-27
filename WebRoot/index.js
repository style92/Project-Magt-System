var _center;
Ext.onReady(function() {

	var _top = new Ext.Toolbar({
		style : 'background-color:Blue; background-image:url(images/logo_bg.jpg);',
		height : 40,
		region : 'north',
		items : ['<h1>IT项目管理系统</h1>', '->', {
					text : '项目管理',
					handler : function() {
						_center.removeAll();
						_center.add(proManageFun());
					}
				}, '-', {
					text : '好友管理',
					handler : function() {
					}
				}, '-', {
					text : '我的账号',
					handler : function() {
					}
				}, '-', {
					text : '测试按钮',
					handler : function() {
						_center.removeAll();
						_center.add(treeGridFunTest());
					}
				}]
	});
	
	var _center = Ext.create('Ext.panel.Panel', {
				region : 'center',
				items : [proManageFun()]
			});

	var _bottom = new Ext.Panel({
				region : "south",
				frame : false,
				autoHeight : true,
				items : new Ext.Toolbar({
							height : 20,
							items : [{
										xtype : 'label',
										text : '版权所有，翻版必究'
									}]
						})

			});

	var _vp = new Ext.Viewport({
				layout : "border",
				items : [_top, _center, _bottom]
			});
});