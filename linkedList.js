function Node (value) {
	this.value = value;
	this.next = null;
}

function linkedList() {
	this._length = 0
	this.head = null
}

linkedList.prototype = {
	constructor: linkedList,
	add: function (value) {
		var nd = new Node(value);
		if (this.head === null) { 
			this.head = nd
		} else {
			var ptr = this.head
			while(ptr.next !== null) {
				ptr = ptr.next
			}
			ptr.next = nd
		}
		this._length++;
		return this;
	},
	getNodeAt: function (index) {
		var i = 0
		var nd = this.head
		while (i < index && nd && nd.next !== null) {
			nd = nd.next;
			i++;
		}
		return i !== index ? null : nd
	},
	remove: function (index) {
		if (index === 0 && this.head !== null) { 
			this.head = this.head.next
			this._length--;
		}
		var parent = this.getNodeAt(index-1)

		if (parent !== null && parent.next !== null) {
			parent.next = parent.next.next
			this._length--;
		}
		return this;
	},
	toArray: function () {
		var result = [];
		var curr = this.head
		while(curr) {
			result.push(curr.value)
			curr = curr.next
		}
		return result
	}
}