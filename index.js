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
		current: -1,
		options: [
			{ value: -1, label: "すべて" },
			{ value: 0, label: "作業中" },
			{ value: 1, label: "完了" }
		]
	},

	computed: {
		computedTodos: function () {
			return this.todos.filter(function (el) {
				return this.current < 0 ? true : this.current === el.state
			}, this)
		},
		labels() {
			return this.options.reduce(function(a,b){
				return Object.assign(a, { [b.value]: b.label } )
			}, {})
		}
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
			// { 新しいID, コメント, 作業状態 }
			// というオブジェクトを現在の todos リストへ push
			// 作業状態「state」はデフォルト「作業中=0」で作成
			this.todos.push({
				id:  todoStorage.uid++,
				comment: comment.value,
				state: 0
			})
			// フォーム要素を空にする
			comment.value = ""
		},
		doChangeState: function (item) {
			item.state = item.state ?  0 : 1
		},
		doRemove: function (item) {
			let index = this.todos.indexOf(item)
			this.todos.splice(index, 1)
		}
	}
})