function RemoveElem(list, elem) {
  const pos = list.indexOf(elem);
  if (pos < 0) {
    return;
  }

  list.splice(pos, 1);
  RemoveElem(list, elem);
}

exports.RemoveElem = RemoveElem;
