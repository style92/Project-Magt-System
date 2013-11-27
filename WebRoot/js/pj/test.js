function treeGridFunTest() {
	var treeStore = Ext.create('Ext.data.TreeStore', {
				fields : ['id', 'name', 'sex', 'age'],
				root : {
					"children" : [{
								id : '001',
								name : 'shu',
								sex : '',
								age : '',
								expanded : true,
								"children" : [{
											id : '001_1',
											name : 'liu.bei',
											sex : 'male',
											age : '50',
											"children" : [{
														id : '001_221',
														name : 'guan.yu',
														sex : 'male',
														age : '49'
													}]
										}, {
											id : '001_2',
											name : 'guan.yu',
											sex : 'male',
											age : '49'
										}, {
											id : '001_3',
											name : 'zhang.fei',
											sex : 'male',
											age : '48'
										}]
							}]
				}
			});
	var gridCols = [{
				xtype : 'treecolumn',
				text : 'ID',
				dataIndex : 'id'
			}, {
				text : 'Name',
				dataIndex : 'name'
			}, {
				text : 'Sex',
				dataIndex : 'sex'
			}, {
				text : 'Age',
				dataIndex : 'age'
			}];

	var treeGrid = Ext.create('Ext.tree.Panel', {
				title : 'Three KingDom',
				rootVisible : false,
				collapsible : true,
				store : treeStore,
				columns : gridCols
				//renderTo : 'test'
			});
	return treeGrid;
}
