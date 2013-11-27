var proManageFun = function() {
	var pageSize = 20;

	// 添加操作
	var addFn = function(_url, rec, param, titleText) {
		new Ext.Window({
			id : "addWin",
			title : titleText,
			width : 400,
			height : 180,
			resizable : false,
			modal : true,
			animateTarget : 'addType',
			closeAction : 'close',
			listeners : {
				'show' : function() {
					btn_add.disable();// 当窗口显示时，则添加按钮不可用
				},
				'close' : function() {
					btn_add.enable();// 当宣传品关闭时，则添加按钮可用
				}
			},
			items : [{
				xtype : "form",
				labelWidth : 60,
				id : "addForm",
				frame : true,
				bodyStyle : "padding:5px 5px 0",
				border : false,
				waitMsgTarget : true,// true的意思是说表单提交时的等待信息在这个表单之内显示，而不是弹出框(进度条形式的)
				labelAlign : "right",
				labelPad : 10,// 标签与字段录入框之间的空白
				defaults : {
					width : 280
				},
				defaultType : "textfield",
				items : [{
							id : "proName",
							fieldLabel : "项目名称",
							name : "project.name",
							allowBlank : false,
							readOnly : param,
							emptyText : "请输入项目名称...",
							listeners : {
								render : function(obj) {
									var font = document.createElement("font");
									font.setAttribute("color", "red");
									var redStar = document.createTextNode(' *');
									font.appendChild(redStar);
									obj.el.dom.parentNode.appendChild(font);
								}
							}
						}, {
							id : "proDesc",
							xtype : 'textarea',
							fieldLabel : "项目简介",
							name : "project.desc",
							emptyText : "请输入项目简介..."
						}]
			}],
			buttonAlign : 'center',
			minButtonWidth : 100,
			buttons : [{
				text : "提交",
				tooltip : "提交数据",
				handler : function() {
					if (Ext.getCmp("addForm").getForm().isValid()) {// 对表单进行验证(根据配置的项进行配置)
						Ext.getCmp("addForm").getForm().submit({// 利用表单的submit方法提交表单
							waitTitle : "请稍候", // 提交表单时进度条的标题
							waitMsg : "正在提交数据，稍后……", // 提交表单时进度条的信息
							url : _url, // 提交地址
							method : "POST", // 提交方式，需要大写
							success : function() { // 如果提交成功后处理的方法
								Ext.example.msg("提交成功", "提交订单类型信息成功……",
										"msg-box-success");// 相应的提示信息
								Ext.getCmp("addWin").close(); // 根据id获取到表单的窗口，然后将其关闭
								// _grid.getStore().reload(); //
								// 提交成功后，需要刷新GridPanel数据，

							},

							failure : function(form, action) { // 提交指失败进处理的方法
								Ext.example.msg("警告", "数据提交失败，请核对...",
										"msg-box-error");
							}
						});
					} else {// 如果表单验证未通过则提示用户骓未通过。

						Ext.example.msg("提示", "请填写完整、合法的订单类别信息...",
								"msg-box-error");
					}

				}

			}, {
				text : "取消",
				tooltip : "取消此操作",
				handler : function() {
					Ext.getCmp("addWin").close();// 取消实际上就是关闭窗口
				}
			}]
		}).show();

	}

	var btn_view = new Ext.Button({
				text : "查看项目",
				tooltip : "查看项目",
				id : "viewPro",
				iconCls : 'icon_btn_view'
			});

	var btn_del = new Ext.Button({
				text : "删除项目",
				tooltip : "删除项目",
				id : "delPro",
				iconCls : 'icon-btn-del'
			});

	var btn_freeze = new Ext.Button({
				text : "冻结项目",
				tooltip : "冻结项目",
				id : "freezePro",
				iconCls : 'icon_btn_freeze'
			});

	var btn_add = new Ext.Button({
				text : "新建项目",
				tooltip : "新建项目",
				id : "addType",
				iconCls : 'icon-btn-add',
				handler : function() {
					var titleText = '新建项目';
					new addFn('Project/addProject.action', false, false,
							titleText);
				}
			});

	var btn_search = new Ext.Button({
				text : "查找项目",
				tooltip : "查找项目",
				id : "searchType",
				iconCls : 'icon-btn-search'
			});

	Ext.create('Ext.data.Store', {
				storeId : 'simpsonsStore',
				fields : ['name', 'email', 'phone'],
				data : {
					'items' : [{
								'name' : 'Lisa',
								"email" : "lisa@simpsons.com",
								"phone" : "555-111-1224"
							}, {
								'name' : 'Bart',
								"email" : "bart@simpsons.com",
								"phone" : "555-222-1234"
							}, {
								'name' : 'Homer',
								"email" : "home@simpsons.com",
								"phone" : "555-222-1244"
							}, {
								'name' : 'Marge',
								"email" : "marge@simpsons.com",
								"phone" : "555-222-1254"
							}]
				},
				proxy : {
					type : 'memory',
					reader : {
						type : 'json',
						root : 'items'
					}
				}
			});

	_grid = Ext.create('Ext.grid.Panel', {
		title : '项目管理',
		store : Ext.data.StoreManager.lookup('simpsonsStore'),
		columns : [{
					text : 'Name',
					dataIndex : 'name'
				}, {
					text : 'Email',
					dataIndex : 'email',
					flex : 1
				}, {
					text : 'Phone',
					dataIndex : 'phone'
				}],
		tbar : [btn_view, '-', btn_del, '-', btn_freeze, '->', btn_add, '-',
				btn_search],
		bbar : new Ext.PagingToolbar({
					id : "toolbar1",
					store : Ext.data.StoreManager.lookup('simpsonsStore'),
					pageSize : pageSize,
					displayInfo : true,
					displayMsg : "第 {0} - {1} 条&nbsp;&nbsp;共 {2} 条",
					emptyMsg : "没有记录"
				})
		});

	return _grid;
}