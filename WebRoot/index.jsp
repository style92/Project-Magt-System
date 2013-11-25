<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>IT项目管理系统</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<link rel="stylesheet" type="text/css"
			href="extjs/resources/css/ext-all.css">
		<link rel="stylesheet" type="text/css" href="extjs/examples.css" />
		<link rel="stylesheet" type="text/css"
			href="style/myStyle.css">
		<script type="text/javascript" src="extjs/ext-base.js"></script>
		<script type="text/javascript" src="extjs/ext-all.js" charset="utf-8" />
		<script type="text/javascript" src="extjs/ext-all-debug.js"></script>
		<script type="text/javascript" src="extjs/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="extjs/examples.js"></script>
		<script type="text/javascript" src="extjs/pagingToolbarX.js"></script>
		<script type="text/javascript" src="extjs/mydatefield.js"></script>
		<script type="text/javascript" src="extjs/RowExpander.js"></script>
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
		
		<script type="text/javascript" charset="utf-8" src="js/pj/projectManage.js"></script>
		<script type="text/javascript" charset="utf-8"><!--
			var _center;
			Ext.onReady(function(){	
				Ext.BLANK_IMAGE_URL = "extjs/resources/images/default/s.gif";
				Ext.QuickTips.init();


				var _top = new Ext.Toolbar({
	                style: 'background-color:Blue; background-image:url(images/logo_bg.jpg);', 
	                renderTo: 'header',
	                height:40,
	                region : 'north',
	                items: ['<h1>IT项目管理系统</h1>','->',{
	                    text: '项目管理',
	                    handler: function() { }
	                },'-',{
	                    text: '好友管理',
	                    handler: function() { }
	                },'-',{
	                    text: '我的账号',
	                    handler: function() { }
	                }]
	            });
				
				
				_center = proManageFun();
				var _bottom = new Ext.Panel({
					region:"south",
					frame:false,
					autoHeight:true,
					items:new Ext.Toolbar({
						height:20,
						items:[{
							xtype:'label',
							text:'版权所有，翻版必究'
						}]
					})
					
				});

				
				var _vp = new Ext.Viewport({
					layout:"border",
					items:[
					_top,
					_center
					,_bottom
					]
				});
			});
			
		--></script>
	</head>
	<body>
		<div id="header">			
		</div>
		<div id="test">
		</div>
	</body>
</html>
