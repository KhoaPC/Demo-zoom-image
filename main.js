const CONST_WRAPPER_WIDTH = 600;
const CONST_SCALE_SEED = 0.3;
const imgNaturalWidth = img.naturalWidth;
const scaleFactorMax = imgNaturalWidth / CONST_WRAPPER_WIDTH;

// #slide
function zoom(overlay, factor) {
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
    e.preventDefault();

    // Xác định vị trí được zoom trong ảnh
    zoom_target.x = (cursor.x - pos.x) / scale;
    zoom_target.y = (cursor.y - pos.y) / scale;

    // scale
    if (e.shiftKey || e.ctrlKey) scale -= factor;
    else {
      if (scale < scaleFactorMax) {
        scale += factor;
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

    target.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
  }
}

zoom(document.querySelector(".overlay"), 0.3);
