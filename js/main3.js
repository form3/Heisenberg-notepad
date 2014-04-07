(function($, undefined){
	var list = function(){

		var arrList = [
			{name: 'Jack Welker', weight: '1000gm', price: '$2000'},
			{name: 'Patrick Kuby', weight: '1500gm', price: '$3000'},
			{name: 'Huell Babineaux', weight: '250gm', price: '$500'}
		];


		var model = {
			addData: function (){
				arrList.push(view.getActionValues());
			},
			updateData: function (index){
				arrList.splice(index, 1, view.getActionValues());
			},
			deleteData: function (index){
				arrList.splice(index, 1);
			},
			showJSON: function (){
				console.log(JSON.stringify(arrList));
			}
		};


		var view = {
			listTable: {
				self: $('.list-table'),
				editBtn: '.edit',
				deleteBtn: '.delete',
				targetIndex: '',
				getTargetIndex: function (e){
					return $(e.target).parents('tr').index();
				}
			},

			createRow: function (name, weight, price){
				return $(
					'<tr>' +
						'<td><div>'+name+'</div></td>' +
						'<td><div>'+weight+'</div></td>' +
						'<td><div>'+price+'</div></td>' +
						'<td>' +
							'<a class="edit" title="edit"></a> ' +
							'<a class="delete" title="delete"></a> ' +
						'</td>' +
					'</tr>'
				);
			},

			cacheTbody: function (){
				var tbody = $('<tbody></tbody>');
				for(var i=0, length = arrList.length; i<length; i++){
					tbody.append(view.createRow(arrList[i].name, arrList[i].weight, arrList[i].price));
				}
				return tbody;
			},

			renderTbody: function (){
				$('.list-table tbody').replaceWith(view.cacheTbody());
			},

			actionTable: ({
				self: $('.action-table'),
				addBtn: '.add-btn',
				editBtn: '.edit-btn',
				init: function(){
					this.name = this.self.find('.name');
					this.weight = this.self.find('.weight');
					this.price = this.self.find('.price');
					return this;
				}
			}).init(),

			getActionValues: function (){
				return {
					name: view.actionTable.name.val(),
					weight: view.actionTable.weight.val(),
					price: view.actionTable.price.val()
				}
			},

			setActionValues: function (index) {
				view.actionTable.name.val(arrList[index].name);
				view.actionTable.weight.val(arrList[index].weight);
				view.actionTable.price.val(arrList[index].price);
			},

			clearFields: function (){
				view.actionTable.name.val('');
				view.actionTable.weight.val('');
				view.actionTable.price.val('');
			},

			switchActionBtn: function (bool){
				if(bool){
					$('.add-btn').show();
					$('.edit-btn').hide();
				} else {
					$('.add-btn').hide();
					$('.edit-btn').show();
				}
			}
		};


		view.listTable.self.on('click', view.listTable.editBtn, function(event){
			view.switchActionBtn(false);
			view.listTable.targetIndex = view.listTable.getTargetIndex(event);
			view.setActionValues(view.listTable.targetIndex);
		});


		view.listTable.self.on('click', view.listTable.deleteBtn, function(event){
			if (confirm('Are you sure you want to delete this note?')) {
				view.switchActionBtn(true);
				view.clearFields();
				view.listTable.targetIndex = view.listTable.getTargetIndex(event);
				model.deleteData(view.listTable.targetIndex);
				view.renderTbody();
			}
		});


		view.actionTable.self.on('click', view.actionTable.addBtn, function(){
			model.addData();
			view.clearFields();
			view.renderTbody();
		});


		view.actionTable.self.on('click', view.actionTable.editBtn, function(){
			view.switchActionBtn(true);
			model.updateData(view.listTable.targetIndex);
			view.clearFields();
			view.renderTbody();
		});


		$('.showJSON').on('click', function () {
			model.showJSON();
		});


		view.renderTbody();
	};

	$(document).ready(function(){
		list();
	});

})(jQuery);