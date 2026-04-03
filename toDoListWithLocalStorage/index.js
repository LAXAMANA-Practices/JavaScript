// uses localStorage

document.addEventListener("DOMContentLoaded", () => {
  let to_do_list = JSON.parse(localStorage.getItem("to_do_list")) || [];
  let editId = null;

  function save() {
    localStorage.setItem("to_do_list", JSON.stringify(to_do_list));
  }

  function render() {
    const list = document.getElementById("list");
    const search = document
      .getElementById("searchInput")
      .value.toLowerCase()
      .trim();

    list.innerHTML = "";

    const filtered = to_do_list.filter((item) =>
      item.text.toLowerCase().trim().includes(search),
    );

    if (filtered.length > 0) {
      filtered.forEach((item) => {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = item.text;

        const liButtons = document.createElement("div");
        liButtons.classList.add("list-buttons");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTask(item.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(item.id));

        li.appendChild(textSpan);
        li.appendChild(liButtons);
        liButtons.appendChild(editButton);
        liButtons.appendChild(deleteButton);

        list.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.textContent = "No to-do items found.";
      list.appendChild(li);
    }
  }

  function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) return alert("Enter something");

    if (editId !== null) {
      to_do_list = to_do_list.map((item) =>
        item.id === editId ? { ...item, text } : item,
      );
      editId = null;
    } else {
      to_do_list.push({
        id: Date.now(),
        text,
      });
    }

    input.value = "";
    save();
    render();
  }

  function editTask(id) {
    const todo = to_do_list.find((item) => item.id === id);
    document.getElementById("taskInput").value = todo.text;
    editId = id;
  }

  function deleteTask(id) {
    to_do_list = to_do_list.filter((item) => item.id !== id);
    save();
    render();
  }

  document.getElementById("addButton").addEventListener("click", addTask);
  document.getElementById("searchInput").addEventListener("input", render);

  render();
});