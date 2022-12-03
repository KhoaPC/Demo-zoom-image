const CONST_WRAPPER_WIDTH = 600;
const imgNaturalWidth = img.naturalWidth;
const scaleFactorMax = imgNaturalWidth / CONST_WRAPPER_WIDTH;
// zoom(document.querySelector("#slide"), 0.3);
const c = console.log;
zoom2(container, 0.3);

// #slide
function zoom(elm, scaleSeed) {
  let scale = 1;
  const pos = { x: 0, y: 0 };
  const zoom_target = { x: 0, y: 0 };
  const cursor = { x: 0, y: 0 };
  elm.addEventListener("mousedown", mouseDown);

  function mouseDown(e) {
    // Xác định vị trí con trỏ
    cursor.x = e.pageX;
    cursor.y = e.pageY;
    e.preventDefault();

    // Xác định vị trí được zoom trong ảnh
    zoom_target.x = (cursor.x - pos.x) / scale;
    zoom_target.y = (cursor.y - pos.y) / scale;

    // scale
    if (e.shiftKey || e.ctrlKey) scale -= scaleSeed;
    else {
      if (scale < scaleFactorMax) {
        scale += scaleSeed;
      } else {
        alert("Max width");
      }
    }
    scale = Math.max(1, Math.min(scaleFactorMax, scale));

    // Xác định vị trí sau khi zoom
    pos.x = -zoom_target.x * scale + cursor.x;
    pos.y = -zoom_target.y * scale + cursor.y;

    // Cho ảnh vào giữa khi zoom out
    if (scale === 1) {
      pos.x = 0;
      pos.y = 0;
    }

    elm.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
  }
} // zoom

function zoom2(container, factor) {
  let scale = 1;
  const slide = container.querySelector("#slide");
  const pos = { x: 0, y: 0 };
  const zoom_target = { x: 0, y: 0 };
  const cursor = { x: 0, y: 0 };
  const containerComputed = container.getBoundingClientRect();

  slide.addEventListener("mousedown", mouseDown);

  function mouseDown(e) {
    const slideComputed = slide.getBoundingClientRect();
    e.preventDefault();

    // Xác định vị trí con trỏ
    cursor.x = e.pageX - containerComputed.left;
    cursor.y = e.pageY - containerComputed.top;

    // Xác định vị trí được zoom trong ảnh
    zoom_target.x = (cursor.x - pos.x) / scale;
    zoom_target.y = (cursor.y - pos.y) / scale;

    // Giữ Shift/ Ctrl thì zoom out
    const zoomOut = e.shiftKey || e.ctrlKey;

    // Calculate the scale
    scale += zoomOut ? -factor : factor;

    // maxScale = scaleFactorMax; minScale = 1
    scale = Math.max(1, Math.min(scaleFactorMax, scale));

    // Xác định vị trí sau khi zoom
    pos.x = -zoom_target.x * scale + cursor.x;
    pos.y = -zoom_target.y * scale + cursor.y;

    if (scale === 1) {
      pos.x = 0;
      pos.y = 0;
    }

    if (slideComputed.x > 5 && zoomOut) {
      pos.x = 0;
      console.log("hi");
    }

    if (slideComputed.y > 5 && zoomOut) {
      pos.y = 0;
      console.log("hello");
    }

    // Cho ảnh vào giữa khi zoom out

    slide.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
  }
} // zoom2
