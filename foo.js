const CONST_WRAPPER_WIDTH = 600;
const CONST_SCALE_SEED = 0.3;
const imgNaturalWidth = img.naturalWidth;
const scaleFactorMax = imgNaturalWidth / CONST_WRAPPER_WIDTH;
let scaleFactor = 1;
const c = console.log;
slide.addEventListener("mousedown", zoom2);

function zoom2(e) {
  const cursor = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };
  const zoom_target = { x: 0, y: 0 };

  // Xác định vị trí con trỏ
  cursor.x = e.offsetX;
  cursor.y = e.offsetY;

  //   e.preventDefault();

  // Xác định vị trị được zoom trong ảnh
  zoom_target.x = (cursor.x - pos.x) / scaleFactor;
  zoom_target.y = (cursor.y - pos.y) / scaleFactor;
console.log(cursor.x, cursor.y, zoom_target.x, zoom_target.y);
  // If Shift/ Ctrl key held, zoom out
  const zoomOut = e.shiftKey || e.ctrlKey;
  // Calculate the scaleFactor
  scaleFactor += zoomOut ? -CONST_SCALE_SEED : CONST_SCALE_SEED;
  // 1 <= scaleFactor <= scaleFactorMax
  scaleFactor = Math.max(1, Math.min(scaleFactorMax, scaleFactor));
  // Xác định vị trí sau khi zoom
  pos.x = -zoom_target.x  * scaleFactor + cursor.x;
  pos.y = -zoom_target.y * scaleFactor + cursor.y;
  //   console.log(pos)
  // Cho ảnh vào giữa khi zoom out
  if (scaleFactor === 1) {
    pos.x = 0;
    pos.y = 0;
  }

  // Zoom with transformation effect
  img.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scaleFactor})`;
  // img.style.width = `${CONST_WRAPPER_WIDTH * scaleFactor}px`;
} // zoom2

// #slide
function zoom(overlay, max_scale, factor) {
  let scale = 1;
  const target = overlay.children[0].querySelector("#slide");
  const pos = { x: 0, y: 0 };
  const zoom_target = { x: 0, y: 0 };
  const cursor = { x: 0, y: 0 };

  target.addEventListener("mousedown", mouseDown);

  function mouseDown(e) {
    const naturalWidth = target.children[0].naturalWidth;
    const currentWidth = target.children[0].getBoundingClientRect().width;
    // Xác định vị trí con trỏ
    cursor.x = e.offsetX;
    cursor.y = e.offsetY;
    // e.preventDefault();

    // Xác định vị trị được zoom trong ảnh
    zoom_target.x = (cursor.x - pos.x) / scale;
    zoom_target.y = (cursor.y - pos.y) / scale;
    // console.log("currentWidth", currentWidth);

    if (e.shiftKey || e.ctrlKey) scale -= factor;
    else {
      if (currentWidth < naturalWidth) {
        scale += factor;
      } else {
        // alert("Max width");
      }
    }
    scale = Math.max(1, Math.min(max_scale, scale));

    // Xác định vị trí sau khi zoom
    pos.x = -zoom_target.x * scale + cursor.x;
    pos.y = -zoom_target.y * scale + cursor.y;

    // Cho ảnh vào giữa khi zoom out
    if (scale === 1) {
      pos.x = 0;
      pos.y = 0;
    }

    target.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
  }
} // zoom

// zoom(document.querySelector(".overlay"), 8, 0.3);
