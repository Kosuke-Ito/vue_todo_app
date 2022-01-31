const STORAGE_KEY = "todos-vuejs-demo"
let todoStorage = {
	fetch: function () {
		let todos = JSON.parse(
			localStorage.getItem(STORAGE_KEY) || '[]'
		)
		return todos
	},
	save: function (todos) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
	}
}

const app = new Vue({
	el: '#app',
	data: {
		todos: [],
	},

	// ライフサイクルメソッド
	created() {
		// インスタンス作勢時に自動的にfetchする
		this.todos = todoStorage.fetch()
	},
	methods: {
		 // ToDo 追加の処理
		doAdd: function (event, value) {
			// ref で名前を付けておいた要素を参照
			let comment = this.$refs.comment
			// 入力がなければ何もしないで return
			if (!comment.value.length) {
				return
			}
			
			this.todos.push({
				id:  this.todos.length > 0 ? this.todos.slice(-1)[0].id + 1 : 1,
				comment: comment.value,
			})
			todoStorage.save(this.todos)

			comment.value = ""
		},
		doRemove: function (item) {
			let index = this.todos.indexOf(item)
			this.todos.splice(index, 1)
			todoStorage.save(this.todos)
		}
	}

})