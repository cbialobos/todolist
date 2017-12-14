function buildElement(task) {
  return `<li id=task_${task.id}><button type=submit class="remove-elem" value='${task.id}'>✘</button>${task.task}</li>`;
}

function addTask(task) {
  $('#todolist').append(buildElement(task));
}

function removeTask(taskId) {
  $(`#todolist li[id=task_${taskId}]`).remove();
}

const socket = io()

  .on('add', (task) => {
    addTask(task);
  })

  .on('remove', (taskId) => {
    removeTask(taskId);
  });

$(document).ready(() => {
  $('#todolist').on('click', '.remove-elem', (e) => {
    const taskId = e.target.value;
    socket.emit('remove', taskId);
    return false;
  });

  $.getJSON('/task')
    .done((data) => {
      $.each(data, (i, item) => {
        addTask(item);
      });
    });
});

$('#add').submit(() => {
  const newTask = $('#newitem').val();
  socket.emit('add', newTask);
  $('#newitem').val('').focus();
  return false;
});

