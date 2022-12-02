let elm = document.getElementById("container");
let h1 = document.querySelector(".title");
let img = document.getElementById("img");
let zoom = 1;

img.onclick = function (e) {
  if (e.shiftKey || e.ctrlKey) zoom -= 1;
  else zoom += 0.5;

  if (zoom <= 1) {
    zoom = 1;
  }
  let ix = e.offsetX / zoom; //- (e.offsetX * 2) / zoom
  let iy = e.offsetY / zoom; //- (e.offsetY * 2) / zoom

  let nx = ix * zoom;
  let ny = iy * zoom;

  let cx = ix - nx;
  let cy = iy - ny;

  let width = e.target.getBoundingClientRect().width;
  let height = e.target.getBoundingClientRect().height;
  let top = e.target.getBoundingClientRect().top;
  let left = e.target.getBoundingClientRect().left;

  console.log("offsetX", e.offsetX);
  console.log("offsetY", e.offsetY);
  console.log("Width", width);
  console.log("Height", height);
  console.log("zoom", zoom);

  let x1 = width - left - e.offsetY * zoom;
  let y1 = height - top - e.offsetY * zoom;

  let x2 = 0;
  let y2 = 0;
  // console.log('ix', ix)
  // console.log('iy', iy)

  // console.log('cx', cx)
  // console.log('cy', cy)
  //clientX
  //offsetY
  //pageX
  img.style.transform = `translate3d(${cx}px, ${cy}px, 0px) scale(${zoom})`;
  h1.textContent = `X:${x1}.....Y:${y1}`;
};
