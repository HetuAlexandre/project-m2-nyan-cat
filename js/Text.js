class Text {
  constructor(root, xPos, yPos, size) {
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style.left = xPos;
    this.div.style.top = yPos;
    this.div.style.color = 'rgb(75, 213, 238)';
    this.div.style.font = ` ${size}px Century Gothic`;
    this.div.style.zIndex = 2000;
    root.appendChild(this.div);
    this.domElement =this.div;
  }
  update(txt) { 
    this.domElement.innerText = txt;
  
  }
}
