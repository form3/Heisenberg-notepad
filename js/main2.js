function ListArray(name, weight, price) {
	var self = this;
	self.name = name;
	self.weight = weight;
	self.price = price;
}


function ListViewModel() {
	var self = this;

	self.newName = ko.observable();
	self.newWeight = ko.observable();
	self.newPrice = ko.observable();
	self.targetIndex = "";

	self.listArr = ko.observableArray([
		new ListArray("Jack Welker", "1000gm", "$2000"),
		new ListArray("Patrick Kuby", "1500gm", "$3000"),
		new ListArray("Huell Babineaux", "250gm", "$500")
	]);

	self.addNote = function() {
		self.listArr.push(new ListArray(this.newName(), this.newWeight(), this.newPrice()));
		self.clearFields();
	}

	self.removeNote = function(seat) {
		if (confirm('Are you sure you want to delete this note?')) {
			self.switchActionBtn(true);
			self.clearFields();
			self.listArr.remove(seat);
		} else {
			return false;
		}
	};

	self.getNote = function(data, event) {
		var targetIndex = ko.contextFor(event.target).$index();

		self.newName(self.listArr()[targetIndex].name);
		self.newWeight(self.listArr()[targetIndex].weight);
		self.newPrice(self.listArr()[targetIndex].price);

		self.switchActionBtn(false);
		self.targetIndex = targetIndex;
	}

	self.updateNote = function() {
		self.listArr.splice(self.targetIndex, 1, new ListArray(this.newName(), this.newWeight(), this.newPrice()));
		self.switchActionBtn(true);
		self.clearFields();
	}

	self.clearFields = function() {
		self.newName("");
		self.newWeight("");
		self.newPrice("");
	}

	self.switchActionBtn = function(switcher){
		if(switcher){
			$('.add-btn').show();
			$('.edit-btn').hide();
		} else {
			$('.add-btn').hide();
			$('.edit-btn').show();
		}
	}

	self.showJSON = function() {
		console.log(ko.utils.stringifyJson(self.listArr));
	};
}


ko.applyBindings(new ListViewModel());