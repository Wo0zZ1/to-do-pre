let items = []

const listElement = document.querySelector('.to-do__list')
const formElement = document.querySelector('.to-do__form')
const inputElement = document.querySelector('.to-do__input')

formElement.addEventListener('submit', e => {
	e.preventDefault()

	const input = inputElement.value
	if (!input.trim()) return

	const item = createItem(input)
	listElement.prepend(item)

	items = getTasksFromDOM()
	saveTasks(items)

	formElement.reset()
})

function loadTasks() {
	const defaultItems = [
		'Сделать проектную работу',
		'Полить цветы',
		'Пройти туториал по Реакту',
		'Сделать фронт для своего проекта',
		'Прогуляться по улице в солнечный день',
		'Помыть посуду',
	]

	const itemsFromStorage = window.localStorage.getItem('tasks')
	if (!itemsFromStorage) return defaultItems

	return JSON.parse(itemsFromStorage)
}

function createItem(item) {
	const template = document.getElementById('to-do__item-template')
	const clone = template.content.querySelector('.to-do__item').cloneNode(true)
	const textElement = clone.querySelector('.to-do__item-text')
	const deleteButton = clone.querySelector('.to-do__item-button_type_delete')
	const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate')
	const editButton = clone.querySelector('.to-do__item-button_type_edit')

	textElement.textContent = item

	deleteButton.addEventListener('click', e => {
		clone.remove()

		const items = getTasksFromDOM()
		saveTasks(items)
	})

	duplicateButton.addEventListener('click', e => {
		const itemName = textElement.textContent

		const newItem = createItem(itemName)
		listElement.prepend(newItem)

		const items = getTasksFromDOM()
		saveTasks(items)
	})

	editButton.addEventListener('click', e => {
		textElement.setAttribute('contenteditable', 'true')
		textElement.focus()
	})

	textElement.addEventListener('blur', e => {
		textElement.setAttribute('contenteditable', 'false')

		const items = getTasksFromDOM()
		saveTasks(items)
	})

	return clone
}

function getTasksFromDOM() {
	const itemsNamesElements = listElement.querySelectorAll('.to-do__item-text')
	const tasks = Array.from(itemsNamesElements).map(
		itemsNamesElement => itemsNamesElement.textContent,
	)
	return tasks
}

function saveTasks(tasks) {
	window.localStorage.setItem('tasks', JSON.stringify(tasks))
}

items = loadTasks()

items.forEach(item => {
	const itemElement = createItem(item)
	listElement.append(itemElement)
})
