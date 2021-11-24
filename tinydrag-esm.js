let mousedown = false,
  /** @type {number} */
  targetNodeIndex = -1;

/**
 * Make given set of points draggable.
 *
 * @export
 * @param {CanvasRenderingContext2D} context
 * @param {Array<{
 *  x: number,
 *  y: number,
 *  radius?: number,
 *  event?: function
 * }>} points
 * @param {function} [options.onDrag] when a point is being dragged
 * @param {function} [options.onSelectionOut] when user clicks on none of the points
 * @param {function} [options.onSelect] when user clicks on a point
 */
exports.tinyDrag = function (context, points, options = {}) {
  let canvas = context.canvas;
  canvas.addEventListener("mousedown", (e) => {
    let x = e.offsetX,
      y = e.offsetY,
      tr = context.getTransform(),
      translateX = tr.e,
      translateY = tr.f,
      scaleX = tr.a,
      scaleY = tr.d,
      targetIndex = -1,
      dist = Infinity;

    mousedown = true;
    for (let i = 0; i < points.length; i++) {
      let point = points[i],
        radius2 = point.radius ** 2 || 10 ** 2,
        d = ((x - point.x - translateX) / scaleX) ** 2 + ((y - point.y - translateY) / scaleY) ** 2;
      if (d <= radius2 && d < dist) {
        targetIndex = i;
        dist = d;
      }
    }
    targetNodeIndex = targetIndex;
    if (targetIndex == -1 && typeof options.onSelectionOut == "function") options.onSelectionOut();
    else if (typeof options.onSelect == "function") options.onSelect(targetIndex);
  });
  document.addEventListener("mouseup", () => {
    mousedown = false;
    targetNodeIndex = -1;
  });
  canvas.addEventListener("mousemove", (e) => {
    if (mousedown && targetNodeIndex > -1) {
      let node = points[targetNodeIndex],
        tr = context.getTransform(),
        translateX = tr.e,
        translateY = tr.f,
        scaleX = tr.a,
        scaleY = tr.d;
      node.x = e.offsetX - translateX;
      node.y = e.offsetY - translateY;
      // run common events
      if (typeof options.onDrag == "function") {
        options.onDrag(targetNodeIndex);
      }
      // run pointwise event
      if (typeof node.event == "function") {
        node.event(e);
      }
    }
  });
}
