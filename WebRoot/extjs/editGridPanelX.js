Ext.apply(Ext.grid.EditorGridPanel.prototype, {
	// 增长EditorGridPanel的通用校验办法
		isVa : function(records,store) {
			var cm = this.cm || this.colModel;
			//var f = true;
			for (var i = 0; i < records.length; i++) {
				var record = records[i];
				var fields = record.fields.keys;
				for ( var j = 0; j < fields.length; j++) {
					var name = fields[j];
					var value = record.data[name];
					var colIndex = cm.findColumnIndex(name);
					var rowIndex = store.indexOfId(record.id);
					var editor = cm.getCellEditor(colIndex).field;
					if (!editor.validateValue(value)) {
						Ext.Msg.alert('', '请确保输入的数据正确!', function() {
							grid.startEditing(rowIndex, colIndex);
						})
					}
				}
			}
			//return f;
		}
	});