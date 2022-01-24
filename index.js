const STORAGE_KEY = "todos-vuejs-demo"
let todoStorage = {
	fetch: function () {
		let todos = JSON.parse(
			localStorage.getItem(STORAGE_KEY) || '[]'
		)
		todos.forEach(function (todo, index) {
			todo.id = index
		})
		todoStorage.uid = todos.length
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

	watch: {
		// オプションを使う場合はオブジェクト形式にする
		todos: {
			handler: function (todos) {
				todoStorage.save(todos)
			},
			// deep オプションでネストしているデータも監視できる
			deep: true
		}
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
				id:  todoStorage.uid++,
				comment: comment.value,
			})
			// フォーム要素を空にする
			comment.value = ""
		},
		doRemove: function (item) {
			let index = this.todos.indexOf(item)
			this.todos.splice(index, 1)
		}
	}
})